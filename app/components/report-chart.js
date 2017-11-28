import Component from '@ember/component';
import {
  set,
  setProperties,
  get,
  computed
} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  classNames: ['report-chart'],

  // passed in
  data: null,
  settings: null,

  label: null,
  valuePath: null,
  color: null,

  init() {
    this._super(...arguments);

    const {
      label,
      valuePath,
      color
    } = get(this, 'settings')[1]

    // Set initials
    setProperties(this, {
      label,
      valuePath,
      color
    });
  },

  availableRecords: computed.filter('settings', settingsObj => !settingsObj.withoutChart),
  labels: computed.map('availableRecords', settingsObj => settingsObj.label),
  chartDates: computed.map('data', record => moment(record.time)),

  chartData: computed('data.[]', 'valuePath', {
    get() {
      const data = get(this, 'data');
      const valuePath = get(this, 'valuePath');
      const label = get(this, 'label');
      const color = get(this, 'color');
      const chartDates = get(this, 'chartDates');

      return {
        labels: chartDates,
        datasets: [{
          label,
          data: data.map(record => Number(record[valuePath])),
          borderColor: color,
          backgroundColor: color,
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
          unit: 'hour',
          stepSize: 6
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
  },

  updateChart(label) {
    const availableRecords = get(this, 'availableRecords');
    const {
      valuePath,
      color
    } = availableRecords.findBy('label', label);

    // Set initials
    setProperties(this, {
      label,
      valuePath,
      color
    });
  }
});
