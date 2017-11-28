import Controller from '@ember/controller';
import {
  get,
  computed
} from '@ember/object';
import {
  readOnly
} from '@ember/object/computed';
import {
  STATISTICS_REPORT_SETTINGS
} from '../utils/statistics-report';
import moment from 'moment';

export default Controller.extend({
  queryParams: ['dateFrom', 'dateTo', 'interval'],

  statistics: readOnly('model.statistics'),
  totalEntities: readOnly('model.totalEntities'),

  dateFrom: '2017-10-27',
  dateTo: '2017-11-02',
  interval: '1h',

  STATISTICS_REPORT_SETTINGS,

  title: computed('dateFrom', 'dateTo', 'interval', {
    get() {
      const dateFrom = moment(get(this, 'dateFrom')).format('ll');
      const dateTo = moment(get(this, 'dateTo')).format('ll');
      const interval = get(this, 'interval');

      return `Statistics from "${dateFrom}" to "${dateTo}" with ${interval} interval`
    }
  })
});
