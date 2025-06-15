// Script para o contador de tempo sem apostas
document.addEventListener('DOMContentLoaded', function() {
    // Data de início (quando o usuário parou de apostar)
    // Para fins de demonstração, definimos como 08/03/2025
    const sobrietyDate = new Date('2025-03-08T00:00:00');
    const dailyExpense = 50; // Valor médio diário que o usuário gastava com apostas
    
    // Elementos do cronômetro
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const sobrietyDateElement = document.getElementById('sobriety-date');
    
    // Verificar se os elementos existem antes de continuar
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.warn('Elementos do cronômetro não encontrados');
        return;
    }
    
    // Atualizar a data de sobriedade exibida
    if (sobrietyDateElement) {
        sobrietyDateElement.textContent = `Desde: ${formatDateForDisplay(sobrietyDate)}`;
    }
    
    // Função para atualizar o cronômetro
    function updateTimer() {
        const now = new Date();
        const difference = now - sobrietyDate;
        
        // Verificar se a data de sobriedade é válida (não pode ser no futuro)
        if (difference < 0) {
            console.warn('Data de sobriedade está no futuro');
            return;
        }
        
        // Converter a diferença em dias, horas, minutos e segundos
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Atualizar os elementos no DOM
        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
        
        // Calcular o valor economizado
        const savedAmount = days * dailyExpense;
        updateSavings(savedAmount);
        
        // Verificar e atualizar conquistas
        updateAchievements(days);
    }
    
    // Função para atualizar os valores economizados
    function updateSavings(amount) {
        const savingsAmountElement = document.querySelector('.savings-amount');
        if (savingsAmountElement) {
            savingsAmountElement.textContent = formatCurrency(amount);
        }
    }
    
    // Função para atualizar conquistas com base nos dias sem apostar
    function updateAchievements(days) {
        const achievementElement = document.querySelector('.achievement');
        
        if (achievementElement) {
            let achievementText = '';
            
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
            } else {
                achievementText = 'Parabéns por começar sua jornada! 🌱';
            }
            
            achievementElement.textContent = achievementText;
        }
    }
    
    // Função auxiliar para formatar moeda
    function formatCurrency(amount) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(amount);
    }
    
    // Função auxiliar para formatar data para exibição
    function formatDateForDisplay(date) {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    }
    
    // Função para permitir configuração personalizada da data de sobriedade
    // Esta função pode ser chamada externamente para alterar a data
    window.setSobrietyDate = function(newDate) {
        if (newDate instanceof Date && newDate <= new Date()) {
            sobrietyDate.setTime(newDate.getTime());
            if (sobrietyDateElement) {
                sobrietyDateElement.textContent = `Desde: ${formatDateForDisplay(sobrietyDate)}`;
            }
            updateTimer(); // Atualizar imediatamente
        } else {
            console.error('Data inválida fornecida para setSobrietyDate');
        }
    };
    
    // Função para permitir configuração do gasto diário
    window.setDailyExpense = function(newExpense) {
        if (typeof newExpense === 'number' && newExpense >= 0) {
            dailyExpense = newExpense;
            // Atualizar a descrição do gasto diário
            const savingsDetailsElement = document.querySelector('.savings-details');
            if (savingsDetailsElement) {
                savingsDetailsElement.textContent = `Você gastava em média ${formatCurrency(dailyExpense)} por dia em apostas`;
            }
            updateTimer(); // Atualizar valores
        } else {
            console.error('Valor inválido fornecido para setDailyExpense');
        }
    };
    
    // Atualizar o cronômetro imediatamente e depois a cada segundo
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    
    // Limpar o intervalo quando a página for descarregada (boa prática)
    window.addEventListener('beforeunload', function() {
        clearInterval(timerInterval);
    });
    
    // Log para debug
    console.log('Cronômetro de sobriedade inicializado');
    console.log('Data de sobriedade:', sobrietyDate);
    console.log('Gasto diário configurado:', formatCurrency(dailyExpense));
});