const form = document.getElementById('glucose-form');
const tableBody = document.querySelector('#history-table tbody');
const chartCtx = document.getElementById('glucose-chart').getContext('2d');

let entries = [];

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

  updateTable();
  updateChart();

  form.reset();
});

function updateTable() {
  tableBody.innerHTML = '';
  entries.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${entry.date}</td><td>${entry.glucose.toFixed(1)}</td>`;
    tableBody.appendChild(row);
  });
}

function updateChart() {
  chart.data.labels = entries.map(e => e.date);
  chart.data.datasets[0].data = entries.map(e => e.glucose);
  chart.update();
}
