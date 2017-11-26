import Component from '@ember/component';
import {
  get,
  computed
} from '@ember/object';
import Table from 'ember-light-table';

export default Component.extend({
  tagName: '',

  data: null,
  columns: null,

  table: computed('data', 'columns', {
    get() {

      const columns = get(this, 'columns');
      const data = get(this, 'data');

      const table = new Table(columns, data, {
        enableSync: true
      });
      const sortColumn = table.get('allColumns').findBy('valuePath', 'date');

      // Setup initial sort column
      if (sortColumn) {
        sortColumn.set('sorted', true);
      }

      return table;
    }
  })
});
