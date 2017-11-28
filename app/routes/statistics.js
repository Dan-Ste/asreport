import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';
import {
  get
} from '@ember/object';

export default Route.extend({
  queryParams: {
    dateFrom: {
      refreshModel: true
    },
    dateTo: {
      refreshModel: true
    },
    interval: {
      refreshModel: true
    }
  },

  ajax: service(),

  model({
    dateFrom,
    dateTo,
    interval
  }) {
    return get(this, 'ajax').request('/statistics', {
      data: {
        from: dateFrom,
        to: dateTo,
        interval
      }
    }).then(response => {
      return {
        statistics: response.data,
        totalEntities: Math.floor(response.recordsTotal)
      }
    });
  }
});
