class PainelGastos {
  constructor() {
    this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    this.sobrietyStartDate = localStorage.getItem('sobrietyStartDate') || null;
    this.dailyAverageSpending = parseFloat(localStorage.getItem('dailyAverageSpending')) || 50.00;
    this.timerInterval = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateDisplay();
    this.startSobrietyTimer();
    this.setDefaultDates();
  }

  setupEventListeners() {
    // Botões para abrir modais
    document.getElementById('btnAdicionarGasto').addEventListener('click', () => {
      document.getElementById('modalGasto').style.display = 'block';
    });

    document.getElementById('btnAdicionarGanho').addEventListener('click', () => {
      document.getElementById('modalGanho').style.display = 'block';
    });

    document.getElementById('btnDefinirDataInicio').addEventListener('click', () => {
      document.getElementById('modalDataInicio').style.display = 'block';
      if (this.sobrietyStartDate) {
        document.getElementById('dataInicioSobriedade').value = this.sobrietyStartDate;
      }
      document.getElementById('gastoMedioDiario').value = this.dailyAverageSpending.toFixed(2);
    });

    // Botões para fechar modais
    document.getElementById('closeGasto').addEventListener('click', () => {
      document.getElementById('modalGasto').style.display = 'none';
    });

    document.getElementById('closeGanho').addEventListener('click', () => {
      document.getElementById('modalGanho').style.display = 'none';
    });

    document.getElementById('closeDataInicio').addEventListener('click', () => {
      document.getElementById('modalDataInicio').style.display = 'none';
    });

    // Fechar modal clicando fora
    window.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    });

    // Formulários
    document.getElementById('formGasto').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTransaction('expense');
    });

    document.getElementById('formGanho').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTransaction('income');
    });

    document.getElementById('formDataInicio').addEventListener('submit', (e) => {
      e.preventDefault();
      this.setSobrietyStartDate();
    });
  }

  setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dataGasto').value = today;
    document.getElementById('dataGanho').value = today;
    
    if (!this.sobrietyStartDate) {
      document.getElementById('dataInicioSobriedade').value = today;
    }
  }

  addTransaction(type) {
    const valor = parseFloat(document.getElementById(type === 'expense' ? 'valorGasto' : 'valorGanho').value);
    const data = document.getElementById(type === 'expense' ? 'dataGasto' : 'dataGanho').value;
    const descricao = document.getElementById(type === 'expense' ? 'descricaoGasto' : 'descricaoGanho').value || (type === 'expense' ? 'Gasto' : 'Ganho');

    const transaction = {
      id: Date.now(),
      type: type,
      value: valor,
      date: data,
      description: descricao,
      timestamp: new Date().toISOString()
    };

    this.transactions.push(transaction);
    this.saveData();
    this.updateDisplay();
    
    // Fechar modal e limpar formulário
    document.getElementById(type === 'expense' ? 'modalGasto' : 'modalGanho').style.display = 'none';
    document.getElementById(type === 'expense' ? 'formGasto' : 'formGanho').reset();
    this.setDefaultDates();

    // Feedback visual
    this.showNotification(`${type === 'expense' ? 'Gasto' : 'Ganho'} adicionado com sucesso!`, type === 'expense' ? 'error' : 'success');
  }

  setSobrietyStartDate() {
    const date = document.getElementById('dataInicioSobriedade').value;
    const averageSpending = parseFloat(document.getElementById('gastoMedioDiario').value);
    
    this.sobrietyStartDate = date;
    this.dailyAverageSpending = averageSpending;
    
    localStorage.setItem('sobrietyStartDate', date);
    localStorage.setItem('dailyAverageSpending', averageSpending.toString());
    
    document.getElementById('modalDataInicio').style.display = 'none';
    this.updateDisplay();
    this.startSobrietyTimer();
    
    this.showNotification('Data de início definida com sucesso!', 'success');
  }

  startSobrietyTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    if (!this.sobrietyStartDate) {
      return;
    }

    this.timerInterval = setInterval(() => {
      this.updateSobrietyTimer();
    }, 1000);

    this.updateSobrietyTimer();
  }

  updateSobrietyTimer() {
    if (!this.sobrietyStartDate) {
      document.getElementById('startDate').textContent = 'Não definida';
      return;
    }

    const startDate = new Date(this.sobrietyStartDate + 'T00:00:00');
    const now = new Date();
    const diff = now - startDate;

    if (diff < 0) {
      document.getElementById('days').textContent = '0';
      document.getElementById('hours').textContent = '0';
      document.getElementById('minutes').textContent = '0';
      document.getElementById('seconds').textContent = '0';
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

    // Update start date display
    document.getElementById('startDate').textContent = new Date(startDate).toLocaleDateString('pt-BR');

    // Calculate total savings
    const totalSavings = days * this.dailyAverageSpending;
    document.getElementById('totalSavings').textContent = this.formatCurrency(totalSavings);
    document.getElementById('dailyAverage').textContent = this.dailyAverageSpending.toFixed(2);

    // Update achievement
    this.updateAchievement(days);
  }

  updateAchievement(days) {
    let achievementText = 'Início da sua jornada!';
    
    if (days >= 365) {
      achievementText = 'Mais de 1 ano sem apostar! 🎉';
    } else if (days >= 180) {
      achievementText = 'Mais de 6 meses sem apostar! 🎊';
    } else if (days >= 90) {
      achievementText = 'Mais de 3 meses sem apostar! 🏅';
    } else if (days >= 60) {
      achievementText = 'Mais de 2 meses sem apostar! ⭐';
    } else if (days >= 30) {
      achievementText = 'Mais de 1 mês sem apostar! 🌟';
    } else if (days >= 7) {
      achievementText = 'Uma semana sem apostar! 💪';
    } else if (days >= 1) {
      achievementText = `${days} dia${days > 1 ? 's' : ''} sem apostar! 🚀`;
    }

    document.getElementById('achievementText').textContent = achievementText;
  }

  updateDisplay() {
    this.updateFinancialSummary();
    this.updateHistory();
  }

  updateFinancialSummary() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Get current week
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Calculate totals
    let totalBalance = 0;
    let weeklyExpense = 0;
    let weeklyGain = 0;
    let dailyExpense = 0;
    let dailyGain = 0;

    this.transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date + 'T00:00:00');
      const value = transaction.type === 'expense' ? -transaction.value : transaction.value;
      
      totalBalance += value;

      // Weekly calculations
      if (transactionDate >= startOfWeek && transactionDate <= endOfWeek) {
        if (transaction.type === 'expense') {
          weeklyExpense += transaction.value;
        } else {
          weeklyGain += transaction.value;
        }
      }

      // Daily calculations (today)
      if (transaction.date === today) {
        if (transaction.type === 'expense') {
          dailyExpense += transaction.value;
        } else {
          dailyGain += transaction.value;
        }
      }
    });

    // Update display
    document.getElementById('totalBalance').textContent = this.formatCurrency(totalBalance);
    document.getElementById('totalBalance').className = totalBalance >= 0 ? 'font-bold text-green-600' : 'font-bold text-red-600';

    document.getElementById('weeklyExpense').textContent = this.formatCurrency(weeklyExpense);
    document.getElementById('weeklyGain').textContent = this.formatCurrency(weeklyGain);
    document.getElementById('weeklyRevenue').textContent = this.formatCurrency(weeklyGain - weeklyExpense);

    document.getElementById('dailyExpense').textContent = this.formatCurrency(dailyExpense);
    document.getElementById('dailyGain').textContent = this.formatCurrency(dailyGain);
    document.getElementById('dailyBalance').textContent = this.formatCurrency(dailyGain - dailyExpense);

    // Update date displays
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

    // Sort transactions by date (most recent first)
    const sortedTransactions = [...this.transactions].sort((a, b) => {
      return new Date(b.date) - new Date(a.date) || new Date(b.timestamp) - new Date(a.timestamp);
    });

    historyContainer.innerHTML = sortedTransactions.map(transaction => {
      const isExpense = transaction.type === 'expense';
      const iconColor = isExpense ? 'red' : 'green';
      const textColor = isExpense ? 'text-red-600' : 'text-green-600';
      const bgColor = isExpense ? 'bg-red-100' : 'bg-green-100';
      const sign = isExpense ? '-' : '+';
      
      const icon = isExpense 
        ? `<path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />`
        : `<path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />`;

      return `
        <li class="flex justify-between items-center bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow fade-in">
          <div class="flex items-center">
            <div class="${bgColor} p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-${iconColor}-600" viewBox="0 0 20 20" fill="currentColor">
                ${icon}
              </svg>
            </div>
            <div>
              <div class="font-medium">${transaction.description}</div>
              <div class="text-sm text-gray-500">${new Date(transaction.date).toLocaleDateString('pt-BR')}</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="${textColor} font-medium">${sign} ${this.formatCurrency(transaction.value)}</span>
            <button onclick="painelGastos.deleteTransaction(${transaction.id})" class="text-red-400 hover:text-red-600 text-sm">
              ✕
            </button>
          </div>
        </li>
      `;
    }).join('');
  }

  deleteTransaction(id) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      this.transactions = this.transactions.filter(t => t.id !== id);
      this.saveData();
      this.updateDisplay();
      this.showNotification('Registro excluído com sucesso!', 'success');
    }
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(value));
  }

  saveData() {
    try {
      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      this.showNotification('Erro ao salvar dados', 'error');
    }
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transition-all duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Fade out and remove
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Método para exportar dados (funcionalidade extra)
  exportData() {
    const data = {
      transactions: this.transactions,
      sobrietyStartDate: this.sobrietyStartDate,
      dailyAverageSpending: this.dailyAverageSpending,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travajogo_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showNotification('Dados exportados com sucesso!', 'success');
  }

  // Método para importar dados (funcionalidade extra)
  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.transactions && Array.isArray(data.transactions)) {
          this.transactions = data.transactions;
        }
        
        if (data.sobrietyStartDate) {
          this.sobrietyStartDate = data.sobrietyStartDate;
          localStorage.setItem('sobrietyStartDate', data.sobrietyStartDate);
        }
        
        if (data.dailyAverageSpending) {
          this.dailyAverageSpending = data.dailyAverageSpending;
          localStorage.setItem('dailyAverageSpending', data.dailyAverageSpending.toString());
        }
        
        this.saveData();
        this.updateDisplay();
        this.startSobrietyTimer();
        
        this.showNotification('Dados importados com sucesso!', 'success');
      } catch (error) {
        console.error('Erro ao importar dados:', error);
        this.showNotification('Erro ao importar dados', 'error');
      }
    };
    reader.readAsText(file);
  }

  // Método para resetar todos os dados
  resetAllData() {
    if (confirm('ATENÇÃO: Esta ação irá apagar todos os seus dados. Tem certeza que deseja continuar?')) {
      if (confirm('Esta ação não pode ser desfeita. Confirma novamente?')) {
        this.transactions = [];
        this.sobrietyStartDate = null;
        this.dailyAverageSpending = 50.00;
        
        localStorage.removeItem('transactions');
        localStorage.removeItem('sobrietyStartDate');
        localStorage.removeItem('dailyAverageSpending');
        
        this.updateDisplay();
        this.startSobrietyTimer();
        
        this.showNotification('Todos os dados foram resetados', 'success');
      }
    }
  }
}

// Inicializar a aplicação
let painelGastos;

document.addEventListener('DOMContentLoaded', () => {
  painelGastos = new PainelGastos();
  
  // Adicionar botões extras para funcionalidades avançadas
  const extraButtons = document.createElement('div');
  extraButtons.className = 'mt-4 space-y-2 border-t pt-4';
  extraButtons.innerHTML = `
    <div class="flex flex-wrap gap-2">
      <button onclick="painelGastos.exportData()" class="text-blue-600 hover:underline text-sm">
        📥 Exportar dados
      </button>
      <label class="text-blue-600 hover:underline text-sm cursor-pointer">
        📤 Importar dados
        <input type="file" accept=".json" onchange="painelGastos.importData(event)" style="display: none;">
      </label>
      <button onclick="painelGastos.resetAllData()" class="text-red-600 hover:underline text-sm">
        🗑️ Resetar tudo
      </button>
    </div>
  `;
  
  document.querySelector('.mt-4.space-y-2').appendChild(extraButtons);
});

// Adicionar estilos para as notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  .notification {
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(notificationStyles);
