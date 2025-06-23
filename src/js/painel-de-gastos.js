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

  // Configura os event listeners para os botões
  setupEventListeners() {
    document.getElementById('btnAdicionarGasto').addEventListener('click', () => this.openModal('gasto'));
    document.getElementById('btnAdicionarGanho').addEventListener('click', () => this.openModal('ganho'));
    document.getElementById('btnDefinirDataInicio').addEventListener('click', () => this.openModal('dataInicio'));
    document.getElementById('btnResetarDados').addEventListener('click', () => this.resetUserData());

    document.getElementById('btnExportData').addEventListener('click', () => this.showExportOptions());
    document.getElementById('btnImportData').addEventListener('click', () => document.getElementById('importFileInput').click());
    document.getElementById('importFileInput').addEventListener('change', (event) => this.handleImportFile(event));

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

    if (isNaN(value) || value <= 0 || !description || !date) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const transaction = {
      id: Date.now(),
      type: type,
      value: value,
      date: date,
      description: description,
      timestamp: new Date().toISOString()
    };

    this.transactions.push(transaction);
    this.saveData(); // Salva os dados após a nova transação
    this.updateDisplay();
    this.closeModal();
  }

  // Define ou atualiza a data de início da sobriedade e a média de gastos
  setSobrietyStartDate() {
    const date = document.getElementById('modal-date').value;
    const averageSpendingText = document.getElementById('modal-value').value;
    const averageSpending = parseFloat(averageSpendingText.replace(/[^\d]/g, '')) / 100;

    if (!date || isNaN(averageSpending) || averageSpending < 0) {
      alert('Por favor, preencha os campos corretamente.');
      return;
    }
    
    this.sobrietyStartDate = date;
    this.dailyAverageSpending = averageSpending;
    
    this.saveData(); // Salva os dados após a alteração
    
    this.updateDisplay();
    this.startSobrietyTimer();
    this.closeModal();
  }
  
  // Reseta os dados apenas do usuário logado
  resetUserData() {
    const confirmation = confirm('Você tem certeza que deseja resetar seus dados de progresso e transações? Esta ação não pode ser desfeita.');
    if (confirmation) {
      // Remove os dados específicos do usuário
      localStorage.removeItem(this.userDataKey);
      
      // Recarrega a página para refletir o estado inicial
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
    const submitButton = document.getElementById('modal-btn-add');

    form.reset();
    
    // Reseta os labels para o padrão
    valueGroup.querySelector('label').textContent = 'Valor';
    dateGroup.querySelector('label').textContent = 'Data';

    if (mode === 'gasto' || mode === 'ganho') {
      modalTitle.textContent = mode === 'gasto' ? 'Cadastro de Gasto' : 'Cadastro de Ganho';
      valueGroup.style.display = 'block';
      descriptionGroup.style.display = 'block';
      dateGroup.style.display = 'block';
      document.getElementById('modal-value').placeholder = 'R$ 0,00';
      submitButton.textContent = 'Adicionar';
      document.getElementById('modal-date').value = new Date().toISOString().split('T')[0];

    } else if (mode === 'dataInicio') {
      modalTitle.textContent = 'Definir data de início e média de gastos';
      valueGroup.style.display = 'block'; 
      descriptionGroup.style.display = 'none';
      dateGroup.style.display = 'block';

      valueGroup.querySelector('label').textContent = 'Gasto médio diário que você tinha';
      document.getElementById('modal-value').value = this.dailyAverageSpending > 0 ? this.formatCurrency(this.dailyAverageSpending) : '';
      document.getElementById('modal-value').placeholder = 'R$ 0,00';
      
      dateGroup.querySelector('label').textContent = 'Data de Início';
      document.getElementById('modal-date').value = this.sobrietyStartDate || new Date().toISOString().split('T')[0];
      
      submitButton.textContent = 'Definir';
    }

    modalOverlay.style.display = 'flex';
  }

  // Fecha o modal
  closeModal() {
    document.getElementById('gasto-modal-overlay').style.display = 'none';
  }
  
  // Inicia o contador de sobriedade
  startSobrietyTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      this.updateSobrietyTimer();
    }, 1000);

    this.updateSobrietyTimer();
  }

  // Atualiza o contador de sobriedade, a economia e a média de gasto diário
  updateSobrietyTimer() {
    const trophyContainer = document.getElementById('trophyContainer');

    // Exibe a média de gastos diários recuperada do cadastro
    document.getElementById('dailyAverage').textContent = this.dailyAverageSpending.toFixed(2).replace('.',',');

    if (!this.sobrietyStartDate) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      document.getElementById('startDate').textContent = 'Não definida';
      document.getElementById('totalSavings').textContent = this.formatCurrency(0);
      
      document.getElementById('achievementTitle').textContent = 'Comece sua jornada!';
      trophyContainer.textContent = '🌱';
      trophyContainer.classList.remove('trophy');
      document.getElementById('achievementText').textContent = 'Defina uma data para começar.';
      return; 
    }
    
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
    
    if (days >= 365) {
      achievementText = 'Mais de 1 ano sem apostar! 🎉';
    } else if (days >= 180) {
      achievementText = 'Mais de 6 meses sem apostar! 🎊';
    } else if (days >= 90) {
      achievementText = 'Mais de 3 meses sem apostar! 🏆';
    } else if (days >= 60) {
      achievementText = 'Mais de 2 meses sem apostar! 🎯';
    } else if (days >= 30) {
      achievementText = 'Mais de 1 mês sem apostar! 🌟';
    } else if (days >= 7) {
      achievementText = 'Mais de 1 semana sem apostar! 💪';
    } else if (days >= 1) {
      achievementText = `${days} ${days === 1 ? 'dia' : 'dias'} sem apostar! 🚀`;
    }

    document.getElementById('achievementText').textContent = achievementText;
  }

  updateDisplay() {
    this.updateFinancialSummary();
    this.updateHistory();
    this.updateSobrietyTimer();
    
    // Controla a visibilidade do botão de definir data de início
    const btnDefinirData = document.getElementById('btnDefinirDataInicio');
    if (this.sobrietyStartDate) {
      btnDefinirData.style.display = 'none';
    } else {
      btnDefinirData.style.display = 'inline-block';
    }
  }

  updateFinancialSummary() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    let totalBalance = 0;
    let weeklyExpense = 0;
    let weeklyGain = 0;
    let dailyExpense = 0;
    let dailyGain = 0;

    this.transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date + 'T00:00:00');
      const value = transaction.type === 'gasto' ? -transaction.value : transaction.value;
      
      totalBalance += value;

      if (transactionDate >= startOfWeek && transactionDate <= endOfWeek) {
        if (transaction.type === 'gasto') {
          weeklyExpense += transaction.value;
        } else {
          weeklyGain += transaction.value;
        }
      }

      if (transaction.date === today) {
        if (transaction.type === 'gasto') {
          dailyExpense += transaction.value;
        } else {
          dailyGain += transaction.value;
        }
      }
    });

    document.getElementById('totalBalance').textContent = this.formatCurrency(totalBalance);
    document.getElementById('totalBalance').className = totalBalance >= 0 ? 'font-bold text-green-600' : 'font-bold text-red-600';

    document.getElementById('weeklyExpense').textContent = this.formatCurrency(weeklyExpense);
    document.getElementById('weeklyGain').textContent = this.formatCurrency(weeklyGain);
    document.getElementById('weeklyRevenue').textContent = this.formatCurrency(weeklyGain - weeklyExpense);

    document.getElementById('dailyExpense').textContent = this.formatCurrency(dailyExpense);
    document.getElementById('dailyGain').textContent = this.formatCurrency(dailyGain);
    document.getElementById('dailyBalance').textContent = this.formatCurrency(dailyGain - dailyExpense);

    const weekPeriod = `${startOfWeek.toLocaleDateString('pt-BR')} - ${endOfWeek.toLocaleDateString('pt-BR')}`;
    document.getElementById('weeklyPeriod').textContent = weekPeriod;
    document.getElementById('weeklyPeriodGain').textContent = weekPeriod;
    document.getElementById('weeklyPeriodRevenue').textContent = weekPeriod;

    const todayFormatted = now.toLocaleDateString('pt-BR');
    document.getElementById('dailyExpenseDate').textContent = todayFormatted;
    document.getElementById('dailyGainDate').textContent = todayFormatted;
    document.getElementById('dailyBalanceDate').textContent = todayFormatted;
  }

  updateHistory() {
    const historyContainer = document.getElementById('historyContainer');
    
    if (this.transactions.length === 0) {
      historyContainer.innerHTML = '<div class="text-gray-500 text-center py-4">Nenhum registro encontrado</div>';
      return;
    }

    const sortedTransactions = [...this.transactions].sort((a, b) => new Date(b.date) - new Date(a.date) || new Date(b.timestamp) - new Date(a.timestamp));

    historyContainer.innerHTML = sortedTransactions.map(transaction => {
      const isExpense = transaction.type === 'gasto';
      const textColor = isExpense ? 'text-red-600' : 'text-green-600';
      const sign = isExpense ? '-' : '+';
      const dateFormatted = new Date(transaction.date + 'T00:00:00').toLocaleDateString('pt-BR');

      return `
        <div class="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
          <div>
            <div class="font-medium">${transaction.description}</div>
            <div class="text-sm text-gray-500">${dateFormatted}</div>
          </div>
          <div class="${textColor} font-medium">${sign} ${this.formatCurrency(transaction.value)}</div>
        </div>
      `;
    }).join('');
  }

  formatInputAsCurrency(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    
    if (value === '') {
        input.value = '';
        return;
    }
    
    value = (parseInt(value, 10) / 100).toFixed(2);
    
    input.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  showExportOptions() {
    const format = prompt('Qual formato você deseja exportar? Digite "csv" ou "xlsx".');
    if (format && format.toLowerCase() === 'csv') {
      this.exportDataToCsv();
    } else if (format && format.toLowerCase() === 'xlsx') {
      this.exportDataToXlsx();
    } else if (format) {
      alert('Formato inválido. Por favor, digite "csv" ou "xlsx".');
    }
  }

  exportDataToCsv() {
    if (this.transactions.length === 0) {
      alert('Não há dados para exportar.');
      return;
    }

    const header = ["Tipo", "Valor", "Data", "Descrição", "Timestamp"];
    const rows = this.transactions.map(t => [
      t.type,
      t.value.toFixed(2).replace('.', ','),
      t.date,
      t.description.replace(/"/g, '""'),
      t.timestamp
    ]);

    let csvContent = header.join(";") + "\n";
    rows.forEach(row => {
      csvContent += row.map(field => `"${field}"`).join(";") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'gastos_travajogo.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      Timestamp: t.timestamp
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Gastos TravaJogo");
    XLSX.writeFile(wb, "gastos_travajogo.xlsx");
  }

  handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      if (file.name.endsWith('.csv')) {
        this.importDataFromCsv(fileContent);
      } else if (file.name.endsWith('.xlsx')) {
        this.importDataFromXlsx(fileContent);
      } else {
        alert('Formato de arquivo não suportado. Por favor, importe .csv ou .xlsx.');
      }
      event.target.value = ''; 
    };

    reader.onerror = () => {
      alert('Erro ao ler o arquivo.');
    };

    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else if (file.name.endsWith('.xlsx')) {
      reader.readAsArrayBuffer(file);
    }
  }

  importDataFromCsv(csvContent) {
    const lines = csvContent.split('\n').filter(line => line.trim() !== '');
    if (lines.length <= 1) {
      alert('O arquivo CSV está vazio ou não contém dados válidos.');
      return;
    }

    const header = lines[0].split(';').map(h => h.trim().replace(/"/g, ''));
    const newTransactions = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(';').map(v => v.trim().replace(/"/g, ''));
      if (values.length !== header.length) {
        console.warn(`Linha mal formatada ignorada: ${lines[i]}`);
        continue;
      }

      const transaction = {};
      header.forEach((key, index) => {
        let value = values[index];
        if (key === 'Valor') {
          transaction[key.toLowerCase()] = parseFloat(value.replace(',', '.'));
        }else {
          transaction[key.toLowerCase()] = value;
        }
      });
      if (!transaction.type || !transaction.value || !transaction.date) {
        console.warn(`Transação inválida ignorada: ${JSON.stringify(transaction)}`);
        continue;
      }
      newTransactions.push(transaction);
    }

    this.transactions = this.transactions.concat(newTransactions);
    this.saveData();
    this.updateDisplay();
    alert(`Dados importados com sucesso: ${newTransactions.length} registros adicionados.`);
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
        type: row.Tipo,
        value: row.Valor,
        date: row.Data,
        description: row.Descrição,
        timestamp: row.Timestamp || new Date().toISOString()
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