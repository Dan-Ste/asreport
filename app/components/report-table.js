import Component from '@ember/component';
import {
  set,
  setProperties,
  get,
  computed
} from '@ember/object';
import {
  typeOf
} from '@ember/utils';
import Table from 'ember-light-table';
import accumulateDataTotal from '../utils/accumulate-data-total';

const AVAILABLE_ENTITIES_PER_PAGE = [10, 20, 30, 40, 50];

export default Component.extend({
  classNames: ['report-table'],

  // passed in
  data: null,
  settings: null,
  totalEntities: null,

  entitiesOnPage: 10,
  page: 1,
  dir: 'asc',
  sort: 'time',

  AVAILABLE_ENTITIES_PER_PAGE,

  table: computed('showedEntities', 'columns', 'sort', 'dir', {
    get() {

      const columns = get(this, 'columns');
      const showedEntities = get(this, 'showedEntities');
      const sort = get(this, 'sort');
      const dir = get(this, 'dir');

      const table = new Table(columns, showedEntities, {
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

  columns: computed('showedEntities.[]', 'entitiesOnPage', 'summaryOnPage', {
    get() {
      const settings = get(this, 'settings');

      const totalEntities = get(this, 'totalEntities');
      const summary = get(this, 'summary');

      const entitiesOnPage = get(this, 'entitiesOnPage');
      const summaryOnPage = get(this, 'summaryOnPage');

      return settings.map(({
        label,
        valuePath,
        columnWidth,
        date,
        average
      }) => {
        return {
          label,
          valuePath,
          width: columnWidth,
          summary: date ? 'TOTAL' : average ?
            (summary[valuePath] / totalEntities).toFixed(2) : summary[valuePath],
          summaryOnPage: date ? 'TOTAL ON PAGE' : average ?
            (summaryOnPage[valuePath] / entitiesOnPage).toFixed(2) : summaryOnPage[valuePath]
        }
      })
    }
  }),

  sortedData: computed.sort('data', 'sortBy').readOnly(),
  sortBy: computed('dir', 'sort', {
    get() {
      return [`${get(this, 'sort')}:${get(this, 'dir')}`];
    }
  }).readOnly(),

  totalPages: computed('totalEntities', 'entitiesOnPage', {
    get() {
      const totalEntities = get(this, 'totalEntities');
      const entitiesOnPage = get(this, 'entitiesOnPage');

      return Math.round(totalEntities / entitiesOnPage);
    }
  }),

  offset: computed('entitiesOnPage', 'page', {
    get() {
      return (get(this, 'page') - 1) * get(this, 'entitiesOnPage');
    }
  }),

  limit: computed('entitiesOnPage', 'page', {
    get() {
      return get(this, 'entitiesOnPage') * get(this, 'page');
    }
  }),

  valuePaths: computed.map('settings', settingsObj => settingsObj.valuePath),

  showedEntities: computed('sortedData.[]', 'offset', 'limit', {
    get() {
      const sortedData = get(this, 'sortedData');
      const offset = get(this, 'offset');
      const limit = get(this, 'limit');

      return sortedData.slice(offset, limit);
    }
  }),

  summary: computed('data.[]', {
    get() {
      return accumulateDataTotal(get(this, 'data'), get(this, 'valuePaths'));
    }
  }),

  summaryOnPage: computed('showedEntities.[]', {
    get() {
      return accumulateDataTotal(get(this, 'showedEntities'), get(this, 'valuePaths'));
    }
  }),

  goToPage(e) {
    if (e.key === 'Enter') {
      const page = Number(e.target.value);

      this.setPage(page);
    }
  },

  setPage(page) {
    let totalPages = get(this, 'totalPages');
    let currPage = get(this, 'page');

    if(page === currPage) {
      return;
    }

    if (isNaN(page) || typeOf(page) !== 'number' || page < 1 || page > totalPages) {
      alert('Invalid page input')
      return;
    }

    set(this, 'page', page);
  },

  onColumnClick(column) {
    if (column.sorted) {
      setProperties(this, {
        dir: column.ascending ? 'asc' : 'desc',
        sort: column.get('valuePath')
      });
    }
  },

  changeEntitiesOnPage(entitiesOnPage) {
    set(this, 'entitiesOnPage', entitiesOnPage);
    set(this, 'page', 1);
  }
});
