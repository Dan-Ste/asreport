import Component from '@ember/component';
import {
  get,
  computed
} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  data: null,
  valuePath: null,

  dataset: computed('data.[]', 'valuePath', {
    get() {
      const data = get(this, 'data');
      const valuePath = get(this, 'valuePath');

      return data.map(d => {
        return {
          t: moment(d.time),
          y: d[valuePath]
        }
      });
    }
  }),

  chartData: computed('dataset.[]', {
    get() {
      return {
        datasets: [{
          label: get(this, 'valuePath'),
          data: get(this, 'dataset'),
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgb(54, 162, 235)",
          pointHoverRadius: 5,
          fill: false,
          lineTension: 0
        }]
      }
    }
  }),

  chartOptions: {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'hour'
        },
        ticks: {
          major: {
            fontStyle: 'bold'
          },
          callback: function (value, index, values) {
            if (value === '12AM') {
              return moment(values[index].value).format('DD MMM');
            } else {
              return value;
            }
          }
        }
      }]
    },
    tooltips: {
      position: 'average',
      mode: 'index',
      intersect: false,
      callbacks: {
        title: function (tooltipItem) {
          return tooltipItem[0].xLabel.format('lll');
        }
      }
    }
  }
});
