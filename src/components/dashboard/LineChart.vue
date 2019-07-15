<template>
  <div class="card py-2 px-3">
    <div class="text-left title unselectable">
      {{ title }}
    </div>
    <canvas :id="generatedId"></canvas>
  </div>
</template>

<script>

import { Chart } from 'chart.js';

export default {

  props: {
    title: String,
    labels: Array,
    data: Array,
    legend: {
      default: true,
      type: Boolean
    }
  },

  data: () => ({
    chart: null,
    generatedId: null,
    pieColors: [
      '#00bdb4', '#00accc', '#0095d9', '#4f79cf',
      '#8c56ac', '#a62d74', '#bd006e', '#bd0009'
    ],
    hoverBackgroundColor: '#00bcd4',
  }),

  created() {
    this.generateId();
  },

  mounted() {
    this.mountChart();
  },

  computed: {
    total() {
      let result = 0;

      this.data.forEach(item => {
        result += item;
      });

      return result;
    }
  },

  watch: {
    data() {
      this.mountChart();
    }
  },

  methods: {
    generateId() {
      this.generatedId = '_' + Math.random().toString(36).substr(2, 9);
    },
    mountChart() {
      try {
        this.chart.destroy();
      } catch (e) {}

      let avgArray = [];
      let sum = 0;

      this.data.forEach(item => {
        sum += item;
      });

      let avg = (sum / this.data.length).toFixed(2);

      this.data.forEach(() => {
        avgArray.push(avg);
      });

      this.chart = new Chart(document.getElementById(this.generatedId), {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Torns',
              data: this.data,
              borderColor: 'rgb(0, 123, 255)',
              backgroundColor: 'rgb(0, 123, 255, 0.15)'
            }, 
            {
              label: 'Mitjana',
              data: avgArray,
              backgroundColor: 'rgb(255, 0, 0, 0)',
              borderColor: 'rgb(255, 0, 0)',
              radius: 0
            }
          ]
        },
        options: {
          legend: {
            display: this.legend,
          },
          tooltips: {
            callbacks: {
              title(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              },
              label(tooltipItem, data) {
                return '';
              },
              afterLabel(tooltipItem, data) {
                return data.datasets[0].data[tooltipItem.index] + ' torns.';
              }
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFontSize: 15,
            titleFontColor: '#FFF',
            bodyFontColor: '#FFF',
            bodyFontSize: 14,
            displayColors: false
          },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          },
          aspectRatio: 1.8
        },
      });
    }
  }
}
</script>

<style scoped>

.title {
  margin-left: 15px;
  font-size: 20px;
  font-weight: 500;
  display: inline;
}

</style>
