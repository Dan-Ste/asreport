import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';
import {
  get
} from '@ember/object';
import {
  set
} from '@ember/object';
import Table from 'ember-light-table';

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
      return response.data;
    });
  },

  columns: [{
    label: 'Date',
    valuePath: 'time',
    width: '130px'
  }, {
    label: 'Searches',
    valuePath: 'searches',
    width: '80px'
  }, {
    label: 'Clicks',
    valuePath: 'clicks',
    width: '60px'
  }, {
    label: 'Unq. clicks',
    valuePath: 'unique_clicks',
    width: '100px'
  }, {
    label: 'CTR',
    valuePath: 'ctr',
    width: '60px'
  }, {
    label: 'Booking',
    valuePath: 'bookings',
    width: '80px'
  }, {
    label: 'Sales',
    valuePath: 'sales',
    width: '60px'
  }, {
    label: 'BTR',
    valuePath: 'btr',
    width: '60px'
  }, {
    label: 'STR',
    valuePath: 'str',
    width: '60px'
  }, {
    label: 'Success %',
    valuePath: 'success',
    width: '90px'
  }, {
    label: 'Errors %',
    valuePath: 'errors',
    width: '80px'
  }, {
    label: 'Zeros %',
    valuePath: 'zeros',
    width: '80px'
  }, {
    label: 'T/O %',
    valuePath: 'timeouts',
    width: '70px'
  }, {
    label: 'Avg Resp',
    valuePath: 'duration'
  }],

  setupController(controller, data) {
    const columns = get(this, 'columns');

    const table = new Table(columns, data, {
      enableSync: true
    });
    const sortColumn = table.get('allColumns').findBy('valuePath', 'date');

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    set(controller, 'table', table);
  }
});
