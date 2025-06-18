document.getElementById('form1').addEventListener('submit', function(event) {
  event.preventDefault(); // Перешкоджаємо стандартній поведінці форми

  const emailOrPhone = document.getElementById('emailOrPhone').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageDiv = document.getElementById('message');

  // Перевірка на пусті поля
  if (!emailOrPhone || !password) {
    messageDiv.textContent = 'Please fill in all fields.';
    messageDiv.style.color = 'red';
    return;
  }

  // Перевірка логіна і пароля
  if (emailOrPhone === 'admin' && password === '12345') {
    messageDiv.style.color = 'green';
    messageDiv.textContent = 'Login successful! Redirecting...';

    // Редирект на страницу about.html
    setTimeout(() => {
      window.location.href = 'about.html'; // Вкажіть правильний шлях до вашої сторінки
    }, 2000);
  } else {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Invalid login or password.';
  }
});





function toggleTask() {
  const createTaskBlock = document.querySelector(".create_task");

  createTaskBlock.style.display = "block"; // Показываем блок

}

function toggClose() {
  const createTaskBlock = document.querySelector(".create_task");

  createTaskBlock.style.display = "none"; // Показываем блок
}




const form = document.getElementById('glucose-form');
const tableBody = document.querySelector('#history-table tbody');
const chartCtx = document.getElementById('glucose-chart').getContext('2d');

let entries = JSON.parse(localStorage.getItem('glucoseEntries')) || [];

const chart = new Chart(chartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Глюкоза (ммоль/л)',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false,
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 3,
        suggestedMax: 15
      }
    }
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const glucose = parseFloat(document.getElementById('glucose').value);
  const date = document.getElementById('date').value;

  if (!glucose || !date) return;

  entries.push({ glucose, date });
  entries.sort((a, b) => new Date(a.date) - new Date(b.date));
  localStorage.setItem('glucoseEntries', JSON.stringify(entries));

  updateTable();
  updateChart();
  form.reset();
});

function getColorClass(glucose) {
  if (glucose < 4) return 'low';
  if (glucose > 7.8) return 'high';
  return 'normal';
}

function updateTable() {
  tableBody.innerHTML = '';
  entries.forEach(entry => {
    const row = document.createElement('tr');
    const className = getColorClass(entry.glucose);
    row.classList.add(className);
    row.innerHTML = `<td>${entry.date}</td><td>${entry.glucose.toFixed(1)}</td>`;
    tableBody.appendChild(row);
  });
}

function updateChart() {
  chart.data.labels = entries.map(e => e.date);
  chart.data.datasets[0].data = entries.map(e => e.glucose);
  chart.update();
}

document.getElementById('download-chart').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'glucose-chart.png';
  link.href = chart.toBase64Image();
  link.click();
});

updateTable();
updateChart();
