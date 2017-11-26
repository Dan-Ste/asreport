import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';
import {
  get
} from '@ember/object';

export default Route.extend({
  ajax: service(),

  model() {
    return get(this, 'ajax').request('/statistics', {
      data: {
        from: '2017-10-27',
        to: '2017-11-02',
        interval: '1h'
      }
    }).then(response => {
      return {
        statistics: response.data,
        totalEntities: Math.floor(response.recordsTotal)
      }
    });
  }
});
