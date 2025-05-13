document.addEventListener('DOMContentLoaded', function() {
    const btnAdicionarGasto = document.getElementById('btnAdicionarGasto');
    const btnAdicionarGanho = document.getElementById('btnAdicionarGanho');
    const modalContainer = document.createElement('div');
    
    // Variáveis para o modal
    let selectedDate = new Date();
    
    modalContainer.id = 'modal-container';
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalContainer.style.display = 'flex';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.zIndex = '1000';
    modalContainer.style.display = 'none';
    
    document.body.appendChild(modalContainer);
    
    // Função para carregar o modal
    async function loadModal(tipo) {
        try {
            const response = await fetch('./cadastroGasto-modal.html');
            const html = await response.text();
            
            modalContainer.innerHTML = html;
            
            // Alterar o título do modal dependendo do botão clicado
            const modalTitle = modalContainer.querySelector('.modal-title');
            if (modalTitle) {
                modalTitle.textContent = tipo === 'gasto' ? 'Cadastro de Gasto' : 'Cadastro de Ganho';
            }
            
            // Carregar o CSS do modal
            if (!document.querySelector('link[href="./css/cadastroGasto-modal.css"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = './css/cadastroGasto-modal.css';
                document.head.appendChild(link);
            }
            
            // Configurar o calendário e campos manualmente
            setupModalFunctionality(tipo);
            
            // Exibir o modal após configuração completa
            modalContainer.style.display = 'flex';
            
        } catch (error) {
            console.error('Erro ao carregar o modal:', error);
        }
    }
    
    // Configura a funcionalidade do modal manualmente
    function setupModalFunctionality(tipo) {
        const dateInput = modalContainer.querySelector('#date');
        const calendarToggle = modalContainer.querySelector('#calendar-toggle');
        const calendarDropdown = modalContainer.querySelector('#calendar');
        const monthYearDisplay = modalContainer.querySelector('#month-year');
        const calendarDays = modalContainer.querySelector('#calendar-days');
        const prevMonthBtn = modalContainer.querySelector('#prev-month');
        const nextMonthBtn = modalContainer.querySelector('#next-month');
        const cancelBtn = modalContainer.querySelector('.btn-cancel');
        const valueInput = modalContainer.querySelector('#value');
        const addBtn = modalContainer.querySelector('.btn-add');
        
        if (!dateInput || !calendarToggle || !calendarDropdown) {
            console.error('Elementos necessários não encontrados');
            return;
        }

        const currentDate = new Date();
        let isCalendarOpen = false;

        // Inicializar a data
        dateInput.value = formatDate(currentDate);
        
        // Configurar botão de cancelar para fechar o modal
        cancelBtn.addEventListener('click', closeModal);
        
        // Configurar botão de adicionar (apenas para fechar o modal neste exemplo)
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                console.log(`${tipo} adicionado!`);
                closeModal();
            });
        }
        
        // Configurar calendário
        calendarToggle.addEventListener('click', function() {
            calendarDropdown.classList.toggle('show');
            isCalendarOpen = !isCalendarOpen;
            
            if (isCalendarOpen) {
                createCalendar(currentDate.getFullYear(), currentDate.getMonth());
            }
        });
        
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            createCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            createCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
        
        // Formatação de moeda
        if (valueInput) {
            valueInput.addEventListener('input', function() {
                const value = valueInput.value.replace(/\D/g, '');
                const formattedValue = new Intl.NumberFormat('pt-BR', { 
                    minimumFractionDigits: 2 
                }).format(Number.parseInt(value || '0') / 100);
                valueInput.value = formattedValue;
            });
        }
        
        // Formatação de data
        dateInput.addEventListener('input', function() {
            let input = dateInput.value;
            input = input.replace(/[^0-9/]/g, '');
            
            if (input.length > 10) {
                input = input.substring(0, 10);
            }
            
            if (input.length === 2 && !input.includes("/")) {
                input += "/";
            } else if (input.length === 5 && !input.substring(3).includes("/")) {
                input += "/";
            }
            
            dateInput.value = input;
        });
        
        // Fechar o modal ao clicar fora dele
        modalContainer.addEventListener('click', function(event) {
            if (event.target === modalContainer) {
                closeModal();
            }
        });
        
        // Inicializar calendário
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
        
        // Funções auxiliares
        function createCalendar(year, month) {
            calendarDays.innerHTML = '';
            monthYearDisplay.textContent = `${getMonthName(month)} ${year}`;

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = getDaysInMonth(year, month);

            for (let i = 0; i < firstDay; i++) {
                const emptyCell = document.createElement('div');
                calendarDays.appendChild(emptyCell);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.classList.add('day');
                dayCell.textContent = day;

                if (isToday(year, month, day)) {
                    dayCell.classList.add('today');
                }

                if (isSelectedDate(year, month, day)) {
                    dayCell.classList.add('selected');
                }

                dayCell.addEventListener('click', function() {
                    selectedDate = new Date(year, month, day);
                    dateInput.value = formatDate(selectedDate);
                    calendarDropdown.classList.remove('show');
                    isCalendarOpen = false;
                });

                calendarDays.appendChild(dayCell);
            }
        }
    }
    
    // Função para fechar o modal
    function closeModal() {
        modalContainer.style.display = 'none';
        modalContainer.innerHTML = '';
    }
    
    // Funções auxiliares
    function getMonthName(month) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[month];
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function isToday(year, month, day) {
        const today = new Date();
        return today.getFullYear() === year &&
               today.getMonth() === month &&
               today.getDate() === day;
    }

    function isSelectedDate(year, month, day) {
        return selectedDate &&
               selectedDate.getFullYear() === year &&
               selectedDate.getMonth() === month &&
               selectedDate.getDate() === day;
    }

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    // Adicionar eventos aos botões
    btnAdicionarGasto.addEventListener('click', function() {
        loadModal('gasto');
    });
    
    btnAdicionarGanho.addEventListener('click', function() {
        loadModal('ganho');
    });
});