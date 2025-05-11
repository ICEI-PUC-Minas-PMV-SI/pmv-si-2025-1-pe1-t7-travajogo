const dateInput = document.getElementById('date');
const calendarToggle = document.getElementById('calendar-toggle');
const calendarDropdown = document.getElementById('calendar');
const monthYearDisplay = document.getElementById('month-year');
const calendarDays = document.getElementById('calendar-days');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const cancelBtn = document.querySelector('.btn-cancel');
const valueInput = document.getElementById('value');

const currentDate = new Date();
let selectedDate = null;
let isCalendarOpen = false;

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

        if (selectedDate && isSelectedDate(year, month, day)) {
            dayCell.classList.add('selected');
        }

        dayCell.addEventListener('click', () => {
            selectedDate = new Date(year, month, day);
            dateInput.value = formatDate(selectedDate);
            toggleCalendar();
            createCalendar(year, month);
        });

        calendarDays.appendChild(dayCell);
    }
}

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
    return selectedDate.getFullYear() === year &&
           selectedDate.getMonth() === month &&
           selectedDate.getDate() === day;
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function toggleCalendar() {
    calendarDropdown.classList.toggle('show');
    isCalendarOpen = !isCalendarOpen;

    if (!isCalendarOpen) {
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
}

calendarToggle.addEventListener('click', toggleCalendar);

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

dateInput.addEventListener('click', () => {
    if (!isCalendarOpen) {
        toggleCalendar();
    }
});

cancelBtn.addEventListener('click', () => {
    calendarDropdown.classList.remove('show');
    isCalendarOpen = false;
});

document.addEventListener('click', (event) => {
    if (isCalendarOpen && !calendarDropdown.contains(event.target) && event.target !== dateInput && event.target !== calendarToggle) {
        toggleCalendar();
    }
});

// Formatação de moeda (Real Brasileiro)
valueInput.addEventListener('input', () => {
    const value = valueInput.value.replace(/\D/g, '');
    const formattedValue = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number.parseInt(value) / 100);
    valueInput.value = formattedValue;
});

//  Adicionando a lógica para formatar a data quando o usuário digita
dateInput.addEventListener('input', () => {
    let input = dateInput.value;
    // Remove qualquer caractere não numérico exceto a barra
    input = input.replace(/[^0-9/]/g, '');

    // Limita o tamanho da string
    if (input.length > 10) {
        input = input.substring(0, 10);
    }

    // Adiciona a barra automaticamente
    if (input.length === 2 && !input.includes("/")) {
        input += "/";
    } else if (input.length === 5 && !input.substring(3).includes("/")) {
        input += "/";
    }

    dateInput.value = input;
});


// Inicialização
createCalendar(currentDate.getFullYear(), currentDate.getMonth());
dateInput.value = formatDate(currentDate); // Preenche com a data atual