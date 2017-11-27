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
  sort: null,
  dir: null,

  table: computed('data', 'columns', 'sort', 'dir', {
    get() {

      const columns = get(this, 'columns');
      const data = get(this, 'data');
      const sort = get(this, 'sort');
      const dir = get(this, 'dir');

      const table = new Table(columns, data, {
        enableSync: true
      });

      const sortColumn = table.get('allColumns').findBy('valuePath', sort);

      // Setup initial sort column
      if (sortColumn) {
        dir === 'asc' ? sortColumn.set('ascending', true) : sortColumn.set('ascending', false);
        sortColumn.set('sorted', true);
      }

      return table;
    }
  }),

  onColumnClick() {}

});
