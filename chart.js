let chart;
function drawChart(data, element) {
  const fields = data.fields.reduce((acc, f) => {
    acc[f.id] = f;
    return acc;
  }, {});
  const labels = data.rows.map(row => row[fields.dimension.id]);
  const dataset1 = data.rows.map(row => row[fields.metric1.id]);
  const dataset2 = data.rows.map(row => row[fields.metric2.id]);
  const dataset3 = data.rows.map(row => row[fields.metric3.id]);
  element.innerHTML = '<canvas id="myChart"></canvas>';
  const ctx = document.getElementById('myChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: fields.metric1.name,
          data: dataset1,
          backgroundColor: '#3366CC',
          stack: undefined // regular
        },
        {
          label: fields.metric2.name,
          data: dataset2,
          backgroundColor: '#DC3912',
          stack: 'stack1'
        },
        {
          label: fields.metric3.name,
          data: dataset3,
          backgroundColor: '#FF9900',
          stack: 'stack1'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        x: {
          stacked: false
        },
        y: {
          stacked: true
        }
      }
    }
  });
}
looker.plugins.visualizations.add({
  create: function (element) {
    element.innerHTML = "<div style='width: 100%; height: 100%'><canvas id='myChart'></canvas></div>";
  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    drawChart(data, element);
    done();
  }
});
