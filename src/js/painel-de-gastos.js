class PainelGastos {
  constructor() {
    // Pega o usuário logado do auth.js
    this.user = getLoggedInUser();
    if (!this.user) {
      // Redireciona se, por algum motivo, o usuário não estiver logado
      window.location.href = 'login.html';
      return;
    }

    // Define uma chave única de armazenamento para o usuário logado
    this.userDataKey = `userData_${this.user.email}`;
    
    // Carrega os dados do usuário a partir da chave única
    const userData = JSON.parse(localStorage.getItem(this.userDataKey)) || {};

    this.transactions = userData.transactions || [];
    this.sobrietyStartDate = userData.sobrietyStartDate || null;
    this.dailyAverageSpending = parseFloat(userData.dailyAverageSpending) || 0.00;
    
    this.timerInterval = null;
    this.currentModalMode = null;

    this.init();
  }

  init() {
    this.displayUserName();
    this.initializeFilters(); // NOVO: Inicia os filtros do histórico
    this.setupEventListeners();
    this.updateDisplay();
    this.startSobrietyTimer();
  }

  // Exibe o nome do usuário no painel
  displayUserName() {
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay && this.user && this.user.name) {
      const firstName = this.user.name.split(' ')[0]; // Pega o primeiro nome
      userNameDisplay.textContent = `Olá, ${firstName}`;
    }
  }

  // Configura os event listeners para os botões e filtros
  setupEventListeners() {
    document.getElementById('btnDefinirDataInicio').addEventListener('click', () => this.openModal('dataInicio'));
     document.getElementById('btnRedefinirJornada').addEventListener('click', () => this.resetSobrietyProgress());

    document.getElementById('btnAdicionarGasto').addEventListener('click', () => this.openModal('gasto'));
    document.getElementById('btnAdicionarGanho').addEventListener('click', () => this.openModal('ganho'));
    document.getElementById('btnExportData').addEventListener('click', () => this.exportDataToXlsx()); // Alterado para chamar diretamente a função XLSX
    document.getElementById('btnImportData').addEventListener('click', () => document.getElementById('importFileInput').click());
    document.getElementById('importFileInput').addEventListener('change', (event) => this.handleImportFile(event));
    
    document.getElementById('filterStartDate').addEventListener('change', () => this.updateHistory());
    document.getElementById('filterEndDate').addEventListener('change', () => this.updateHistory());
    document.getElementById('filterAposta').addEventListener('change', () => this.updateHistory());

    document.getElementById('modal-btn-cancel').addEventListener('click', () => this.closeModal());
    document.getElementById('gasto-modal-overlay').addEventListener('click', (event) => {
      if (event.target.id === 'gasto-modal-overlay') {
        this.closeModal();
      }
    });

    document.getElementById('modal-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
    document.getElementById('modal-value').addEventListener('input', (e) => this.formatInputAsCurrency(e));

    document.getElementById('btnResetarDados').addEventListener('click', () => this.resetUserData());
  }
  
  // Salva os dados do usuário no localStorage usando a chave específica do usuário
  saveData() {
    const userData = {
      transactions: this.transactions,
      sobrietyStartDate: this.sobrietyStartDate,
      dailyAverageSpending: this.dailyAverageSpending,
    };
    localStorage.setItem(this.userDataKey, JSON.stringify(userData));
  }

  // Lida com o envio do formulário do modal
  handleFormSubmit() {
    if (this.currentModalMode === 'gasto' || this.currentModalMode === 'ganho') {
      this.addTransaction(this.currentModalMode);
    } else if (this.currentModalMode === 'dataInicio') {
      this.setSobrietyStartDate();
    }
  }

  // Adiciona uma nova transação (gasto ou ganho)
  addTransaction(type) {
    const valueText = document.getElementById('modal-value').value;
    const value = parseFloat(valueText.replace(/[^\d]/g, '')) / 100;
    const description = document.getElementById('modal-description').value;
    const date = document.getElementById('modal-date').value;
    const isBetRadio = document.querySelector('input[name="is_bet"]:checked');
    const isBet = isBetRadio ? isBetRadio.value : null; // Valor agora é "Sim" ou "Não"

    if (isNaN(value) || value <= 0 || !description || !date || !isBet) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const transaction = {
      id: Date.now(),
      type: type,
      value: value,
      date: date,
      description: description,
      isBet: isBet, // Armazena "Sim" ou "Não"
      timestamp: new Date().toISOString() // Mantido para ordenação interna
    };

    this.transactions.push(transaction);
    this.saveData();
    this.updateDisplay();
    this.closeModal();
  }
  
  deleteTransaction(transactionId) {
    const confirmation = confirm('Tem certeza que deseja excluir esta transação?');
    if (confirmation) {
      this.transactions = this.transactions.filter(t => t.id !== transactionId);
      this.saveData();
      this.updateDisplay();
    }
  }

  setSobrietyStartDate() {
    const date = document.getElementById('modal-date').value;
    const averageSpendingText = document.getElementById('modal-value').value;
    const averageSpending = parseFloat(averageSpendingText.replace(/[^\d]/g, '')) / 100;

    if (!date || isNaN(averageSpending) || averageSpending < 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }
    
    this.sobrietyStartDate = date;
    this.dailyAverageSpending = averageSpending;
    
    this.saveData();
    
    this.updateDisplay();
    this.startSobrietyTimer();
    this.closeModal();
  }
  
  resetUserData() {
    const confirmation = confirm('Você tem certeza que deseja resetar seus dados de progresso e histórico? Esta ação não pode ser desfeita.');
    if (confirmation) {
      localStorage.removeItem(this.userDataKey);
      location.reload();
    }
  }
  
  // Abre o modal em diferentes modos
  openModal(mode) {
    this.currentModalMode = mode;
    const modalOverlay = document.getElementById('gasto-modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('modal-form');
    
    const valueGroup = document.getElementById('valor-group');
    const descriptionGroup = document.getElementById('descricao-group');
    const dateGroup = document.getElementById('data-group');
    const apostaGroup = document.getElementById('aposta-group');
    const submitButton = document.getElementById('modal-btn-add');

    form.reset();
    
    valueGroup.querySelector('label').innerHTML = 'Valor <span class="required-asterisk">*</span>';
    dateGroup.querySelector('label').innerHTML = 'Data <span class="required-asterisk">*</span>';
    
    const localDate = this.getLocalDateAsString(); // CORREÇÃO: Pega a data local correta

    if (mode === 'gasto' || mode === 'ganho') {
      modalTitle.textContent = mode === 'gasto' ? 'Cadastro de Gasto' : 'Cadastro de Ganho';
      valueGroup.style.display = 'block';
      descriptionGroup.style.display = 'block';
      dateGroup.style.display = 'block';
      apostaGroup.style.display = 'block';
      document.getElementById('modal-value').placeholder = 'R$ 0,00';
      submitButton.textContent = 'Adicionar';
      document.getElementById('modal-date').value = localDate; // CORREÇÃO: Usa data local
      document.getElementById('aposta-nao').checked = true;

    } else if (mode === 'dataInicio') {
      modalTitle.textContent = 'Inicie sua Jornada!';
      valueGroup.style.display = 'block'; 
      descriptionGroup.style.display = 'none';
      dateGroup.style.display = 'block';
      apostaGroup.style.display = 'none';

      valueGroup.querySelector('label').textContent = 'Gasto médio diário';
      document.getElementById('modal-value').value = this.dailyAverageSpending > 0 ? this.formatCurrency(this.dailyAverageSpending) : '';
      document.getElementById('modal-value').placeholder = 'R$ 0,00';
      
      dateGroup.querySelector('label').textContent = 'Data de Início';
      document.getElementById('modal-date').value = this.sobrietyStartDate || localDate; // CORREÇÃO: Usa data local
      
      submitButton.textContent = 'Definir';
    }

    modalOverlay.style.display = 'flex';
  }

  closeModal() {
    document.getElementById('gasto-modal-overlay').style.display = 'none';
  }
  
  startSobrietyTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      this.updateSobrietyTimer();
    }, 1000);
    this.updateSobrietyTimer();
  }

  updateSobrietyTimer() {
    const trophyContainer = document.getElementById('trophyContainer');
    const sobrietySubheading = document.getElementById('sobrietySubheading');
    const timeValueElements = document.querySelectorAll('.time-value');
    
    document.getElementById('dailyAverage').textContent = this.dailyAverageSpending.toFixed(2).replace('.',',');

    if (!this.sobrietyStartDate) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      document.getElementById('startDate').textContent = 'Data não definida';
      document.getElementById('totalSavings').textContent = this.formatCurrency(0);
      
      document.getElementById('achievementTitle').textContent = 'Comece sua jornada!';
      trophyContainer.textContent = '🌱';
      trophyContainer.classList.remove('trophy');
      document.getElementById('achievementText').textContent = 'Defina uma data para começar.';

      // MUDANÇA 1: Altera o texto e a cor do contador quando não há data
      sobrietySubheading.innerHTML = 'Inicie sua jornada e veja a mudança acontecer! 💪';
      timeValueElements.forEach(el => el.classList.add('time-value-zero'));
      
      return; 
    }
    
    // MUDANÇA 1: Reverte as alterações quando a data é definida
    sobrietySubheading.innerHTML = 'Continue firme na sua jornada de superação!';
    timeValueElements.forEach(el => el.classList.remove('time-value-zero'));

    document.getElementById('achievementTitle').textContent = 'Parabéns';
    trophyContainer.textContent = '🏆';
    if (!trophyContainer.classList.contains('trophy')) {
        trophyContainer.classList.add('trophy');
    }

    const startDate = new Date(this.sobrietyStartDate + 'T00:00:00');
    const now = new Date();
    const diff = now - startDate;

    if (diff < 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      document.getElementById('achievementText').textContent = 'Sua jornada começa em breve!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    document.getElementById('startDate').textContent = startDate.toLocaleDateString('pt-BR');
    
    const totalSavings = days * this.dailyAverageSpending;
    document.getElementById('totalSavings').textContent = this.formatCurrency(totalSavings);
    
    this.updateAchievement(days);
  }

  updateAchievement(days) {
    let achievementText = 'Parabéns por começar sua jornada! 🌱';
    
    if (days >= 365) achievementText = 'Mais de 1 ano sem apostar! 🎉';
    else if (days >= 180) achievementText = 'Mais de 6 meses sem apostar! 🎊';
    else if (days >= 90) achievementText = 'Mais de 3 meses sem apostar! 🏆';
    else if (days >= 60) achievementText = 'Mais de 2 meses sem apostar! 🎯';
    else if (days >= 30) achievementText = 'Mais de 1 mês sem apostar! 🌟';
    else if (days >= 7) achievementText = 'Mais de 1 semana sem apostar! 💪';
    else if (days >= 1) achievementText = `${days} ${days === 1 ? 'dia' : 'dias'} sem apostar! 🚀`;

    document.getElementById('achievementText').textContent = achievementText;
  }

  resetSobrietyProgress() {
    const ok = confirm(
      'Você tem certeza que deseja redefinir sua jornada? Isso vai apagar seu progresso sem apostas.'
    );
    if (!ok) return;
    this.sobrietyStartDate = null;
    this.dailyAverageSpending = 0;
    this.saveData();
    this.updateDisplay();
  }

  updateDisplay() {
    this.updateFinancialSummary();
    this.updateHistory();
    this.updateSobrietyTimer();

    const btnDef = document.getElementById('btnDefinirDataInicio');
    const btnRedef = document.getElementById('btnRedefinirJornada');

    if (this.sobrietyStartDate) {
      btnDef.style.display = 'none';
      btnRedef.style.display = 'inline-block';
    } else {
      btnDef.style.display = 'inline-block';
      btnRedef.style.display = 'none';
    }
  }

  updateFinancialSummary() {
    const now = new Date();
    // **CORREÇÃO PRINCIPAL AQUI**
    // Usa a função auxiliar para obter a data local no formato YYYY-MM-DD
    // Em vez de now.toISOString().split('T')[0] que retornava a data em UTC.
    const today = this.getLocalDateAsString(now);

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    const endOfMonth = new Date(now);
    endOfMonth.setHours(23, 59, 59, 999);
    const startOfMonth = new Date(now);
    startOfMonth.setDate(now.getDate() - 29);
    startOfMonth.setHours(0, 0, 0, 0);

    let totalBalance = 0, weeklyExpense = 0, weeklyGain = 0, dailyExpense = 0, dailyGain = 0, monthlyExpense = 0, monthlyGain = 0;

    this.transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date + 'T00:00:00');
      const value = transaction.type === 'gasto' ? -transaction.value : transaction.value;
      totalBalance += value;
      if (transactionDate >= startOfMonth && transactionDate <= endOfMonth) {
        if (transaction.type === 'gasto') monthlyExpense += transaction.value;
        else monthlyGain += transaction.value;
      }
      if (transactionDate >= startOfWeek && transactionDate <= endOfWeek) {
        if (transaction.type === 'gasto') weeklyExpense += transaction.value;
        else weeklyGain += transaction.value;
      }
      if (transaction.date === today) {
        if (transaction.type === 'gasto') dailyExpense += transaction.value;
        else dailyGain += transaction.value;
      }
    });

    document.getElementById('totalBalance').textContent = this.formatCurrency(totalBalance);
    document.getElementById('totalBalance').className = totalBalance >= 0 ? 'font-bold text-green-600' : 'font-bold text-red-600';
    document.getElementById('monthlyExpense').textContent = this.formatCurrency(monthlyExpense);
    document.getElementById('monthlyGain').textContent = this.formatCurrency(monthlyGain);
    document.getElementById('monthlyRevenue').textContent = this.formatCurrency(monthlyGain - monthlyExpense);
    const monthPeriod = `${startOfMonth.toLocaleDateString('pt-BR')} - ${endOfMonth.toLocaleDateString('pt-BR')}`;
    document.getElementById('monthlyPeriod').textContent = monthPeriod;
    document.getElementById('monthlyPeriodGain').textContent = monthPeriod;
    document.getElementById('monthlyPeriodRevenue').textContent = monthPeriod;
    document.getElementById('weeklyExpense').textContent = this.formatCurrency(weeklyExpense);
    document.getElementById('weeklyGain').textContent = this.formatCurrency(weeklyGain);
    document.getElementById('weeklyRevenue').textContent = this.formatCurrency(weeklyGain - weeklyExpense);
    const weekPeriod = `${startOfWeek.toLocaleDateString('pt-BR')} - ${endOfWeek.toLocaleDateString('pt-BR')}`;
    document.getElementById('weeklyPeriod').textContent = weekPeriod;
    document.getElementById('weeklyPeriodGain').textContent = weekPeriod;
    document.getElementById('weeklyPeriodRevenue').textContent = weekPeriod;
    document.getElementById('dailyExpense').textContent = this.formatCurrency(dailyExpense);
    document.getElementById('dailyGain').textContent = this.formatCurrency(dailyGain);
    document.getElementById('dailyBalance').textContent = this.formatCurrency(dailyGain - dailyExpense);
    const todayFormatted = now.toLocaleDateString('pt-BR');
    document.getElementById('dailyExpenseDate').textContent = todayFormatted;
    document.getElementById('dailyGainDate').textContent = todayFormatted;
    document.getElementById('dailyBalanceDate').textContent = todayFormatted;
  }

  // NOVO: Define as datas padrão para os filtros do histórico.
  initializeFilters() {
    const endDateInput = document.getElementById('filterEndDate');
    const startDateInput = document.getElementById('filterStartDate');
    
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 29);

    // Usa a função auxiliar para evitar bugs de fuso horário
    endDateInput.value = this.getLocalDateAsString(today);
    startDateInput.value = this.getLocalDateAsString(thirtyDaysAgo);
  }

  // ATUALIZADO: A função de histórico agora filtra os resultados.
  updateHistory() {
    const historyContainer = document.getElementById('historyContainer');
    
    // Pega os valores atuais dos filtros
    const startDateFilter = document.getElementById('filterStartDate').value;
    const endDateFilter = document.getElementById('filterEndDate').value;
    const apostaFilter = document.getElementById('filterAposta').value;
    
    let filteredTransactions = [...this.transactions];

    // 1. Filtra por aposta
    if (apostaFilter === 'somente_apostas') {
      filteredTransactions = filteredTransactions.filter(t => t.isBet === 'Sim');
    } else if (apostaFilter === 'excluir_apostas') {
      filteredTransactions = filteredTransactions.filter(t => t.isBet === 'Não');
    }

    // 2. Filtra por período
    if (startDateFilter && endDateFilter) {
      const start = new Date(startDateFilter + 'T00:00:00');
      const end = new Date(endDateFilter + 'T23:59:59'); // Garante que o dia final seja incluído
      filteredTransactions = filteredTransactions.filter(t => {
        const transactionDate = new Date(t.date + 'T00:00:00');
        return transactionDate >= start && transactionDate <= end;
      });
    }

    if (filteredTransactions.length === 0) {
      historyContainer.innerHTML = '<div class="text-gray-500 text-center py-4">Nenhum registro encontrado para o filtro selecionado</div>';
      return;
    }

    // Ordena as transações filtradas
    const sortedTransactions = filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date) || new Date(b.timestamp) - new Date(a.timestamp));

    historyContainer.innerHTML = sortedTransactions.map(transaction => {
      const isExpense = transaction.type === 'gasto';
      const textColor = isExpense ? 'text-red-600' : 'text-green-600';
      const sign = isExpense ? '-' : '+';
      const dateFormatted = new Date(transaction.date + 'T00:00:00').toLocaleDateString('pt-BR');
      const betTag = transaction.isBet === 'Sim' ? '<span class="bet-tag">(Aposta)</span>' : ''; // Lógica atualizada para "Sim"

      return `
        <div class="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
          <div class="flex-1">
            <div class="font-medium">${transaction.description} ${betTag}</div>
            <div class="text-sm text-gray-500">${dateFormatted}</div>
          </div>
          <div class="flex items-center">
            <div class="${textColor} font-medium mr-4">${sign} ${this.formatCurrency(transaction.value)}</div>
            <button class="btn-delete-transaction" data-id="${transaction.id}" title="Excluir transação">&#x1F5D1;</button>
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.btn-delete-transaction').forEach(button => {
      button.addEventListener('click', (event) => {
        const transactionId = parseFloat(event.currentTarget.getAttribute('data-id'));
        this.deleteTransaction(transactionId);
      });
    });
  }

  getLocalDateAsString(date = new Date()) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatInputAsCurrency(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    if (value === '') { input.value = ''; return; }
    value = (parseInt(value, 10) / 100).toFixed(2);
    input.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  exportDataToXlsx() {
    if (this.transactions.length === 0) {
      alert('Não há dados para exportar.');
      return;
    }

    const data = this.transactions.map(t => ({
      Tipo: t.type,
      Valor: t.value,
      Data: t.date,
      Descrição: t.description,
      'Aposta': t.isBet,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Gastos TravaJogo");
    XLSX.writeFile(wb, "gastos_travajogo.xlsx");
  }

  handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx')) {
        alert('Formato de arquivo não suportado. Por favor, importe um arquivo .xlsx.');
        event.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      this.importDataFromXlsx(fileContent);
      event.target.value = ''; 
    };
    reader.onerror = () => alert('Erro ao ler o arquivo.');
    reader.readAsArrayBuffer(file);
  }
  
  importDataFromXlsx(arrayBuffer) {
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      alert('O arquivo XLSX está vazio ou não contém dados válidos.');
      return;
    }

    const newTransactions = [];
    jsonData.forEach(row => {
      const transaction = {
        id: Date.now() + Math.random(), // ID único para a transação importada
        type: row.Tipo,
        value: row.Valor,
        date: row.Data,
        description: row.Descrição,
        isBet: row['Aposta'] === 'Sim' ? 'Sim' : 'Não', // Garante que o valor seja "Sim" ou "Não"
        timestamp: new Date().toISOString() // Adiciona um timestamp de importação
      };

      if (!transaction.type || typeof transaction.value !== 'number' || !transaction.date) {
        console.warn(`Transação inválida no XLSX ignorada: ${JSON.stringify(row)}`);
        return;
      }
      newTransactions.push(transaction);
    });

    this.transactions = this.transactions.concat(newTransactions);
    this.saveData();
    this.updateDisplay();
    alert(`Dados importados com sucesso: ${newTransactions.length} registros adicionados.`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PainelGastos();
});