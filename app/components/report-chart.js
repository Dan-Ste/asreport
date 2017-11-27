import Component from '@ember/component';
import {
  set,
  get,
  computed
} from '@ember/object';
import moment from 'moment';
import { debug } from '@ember/debug';

export default Component.extend({
  classNames: ['report-chart'],

  // passed in
  data: null,
  settings: null,

  currentLabel: null,

  init() {
    this._super(...arguments);

    // Set initial currentLabel
    set(this, 'currentLabel', get(this, 'settings')[1].label);
  },

  labels: computed.map('settings', settingsObj => settingsObj.label),

  valuePath: computed('currentLabel', 'settings', {
    get() {
      const settings = get(this, 'settings');
      const currentLabel = get(this, 'currentLabel');

      return settings.findBy('label', currentLabel).valuePath;
    }
  }),

  dataByTime: computed('data.[]', 'valuePath', {
    get() {
      const data = get(this, 'data');
      const valuePath = get(this, 'valuePath');

      return data.map(record => {
        return {
          t: moment(record.time),
          y: Number(record[valuePath])
        }
      });
    }
  }),

  chartData: computed('dataByTime.[]', {
    get() {
      return {
        datasets: [{
          label: get(this, 'valuePath'),
          data: get(this, 'dataByTime'),
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
          callback(value, index, values) {
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
        title(tooltipItem) {
          return tooltipItem[0].xLabel.format('lll');
        }
      }
    }
  }
});
