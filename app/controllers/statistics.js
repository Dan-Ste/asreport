import Controller from '@ember/controller';
import {
  readOnly
} from '@ember/object/computed';
import {
  get,
  set,
  computed
} from '@ember/object';

const AVAILABLE_ENTITIES_PER_PAGE = [10, 20, 30, 40, 50];

function accumulateStatisticsTotal(statistics, title) {
  return statistics.reduce((acc, curValue) => {
    return {
      title: title,
      searches: acc.searches + curValue.searches,
      clicks: acc.clicks + curValue.clicks,
      unique_clicks: acc.unique_clicks + curValue.unique_clicks,
      ctr: +acc.ctr + +curValue.ctr,
      bookings: acc.bookings + curValue.bookings,
      sales: acc.sales + curValue.sales,
      btr: +acc.btr + +curValue.btr,
      str: +acc.str + +curValue.str,
      success: +acc.success + +curValue.success,
      errors: +acc.errors + +curValue.errors,
      zeros: +acc.zeros + +curValue.zeros,
      timeouts: +acc.timeouts + +curValue.timeouts,
      duration: +acc.duration + +curValue.duration
    }
  });
}

export default Controller.extend({
  statistics: readOnly('model.statistics'),
  totalEntities: readOnly('model.totalEntities'),

  entitiesOnPage: 10,
  page: 1,

  AVAILABLE_ENTITIES_PER_PAGE,

  totalPages: computed('statistics', 'entitiesOnPage', {
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

  showedEntities: computed('statistics.[]', 'offset', 'limit', {
    get() {
      const statistics = get(this, 'statistics');
      const offset = get(this, 'offset');
      const limit = get(this, 'limit');

      return statistics.slice(offset, limit);
    }
  }),

  summaryStats: computed('statistics.[]', {
    get() {
      return accumulateStatisticsTotal(get(this,'statistics'), 'TOTAL');
    }
  }),

  summaryOnPageStats: computed('showedEntities.[]', {
    get() {
      return accumulateStatisticsTotal(get(this,'showedEntities'), 'TOTAL');
    }
  }),

  columns: computed('showedEntities.[]', 'entitiesOnPage', 'summaryOnPageStats', {
    get() {
      const totalEntities = get(this, 'totalEntities');
      const summaryStats = get(this, 'summaryStats');

      const entitiesOnPage = get(this, 'entitiesOnPage');
      const summaryOnPageStats = get(this, 'summaryOnPageStats');

        return [{
          label: 'Date',
          valuePath: 'time',
          width: '150px',
          total: 'TOTAL',
          totalOnPage: 'TOTAL ON PAGE'
        }, {
          label: 'Searches',
          valuePath: 'searches',
          width: '110px',
          total: summaryStats.searches,
          totalOnPage: summaryOnPageStats.searches,
        }, {
          label: 'Clicks',
          valuePath: 'clicks',
          width: '80px',
          total: summaryStats.clicks,
          totalOnPage: summaryOnPageStats.clicks,
        }, {
          label: 'Unq. clicks',
          valuePath: 'unique_clicks',
          width: '120px',
          total: summaryStats.unique_clicks,
          totalOnPage: summaryOnPageStats.unique_clicks,
        }, {
          label: 'CTR',
          valuePath: 'ctr',
          width: '80px',
          total: (summaryStats.ctr / totalEntities).toFixed(2),
          totalOnPage: (summaryOnPageStats.ctr / entitiesOnPage).toFixed(2),
        }, {
          label: 'Booking',
          valuePath: 'bookings',
          width: '100px',
          total: summaryStats.bookings,
          totalOnPage: summaryOnPageStats.bookings
        }, {
          label: 'Sales',
          valuePath: 'sales',
          width: '80px',
          total: Math.floor((summaryStats.sales / totalEntities)),
          totalOnPage: Math.floor((summaryOnPageStats.sales / entitiesOnPage))
        }, {
          label: 'BTR',
          valuePath: 'btr',
          width: '70px',
          total: (summaryStats.btr / totalEntities).toFixed(2),
          totalOnPage: (summaryOnPageStats.btr / entitiesOnPage).toFixed(2),
        }, {
          label: 'STR',
          valuePath: 'str',
          width: '70px',
          total: (summaryStats.str / totalEntities).toFixed(2),
          totalOnPage: (summaryOnPageStats.str / entitiesOnPage).toFixed(2),
        }, {
          label: 'Success %',
          valuePath: 'success',
          width: '120px',
          total: (summaryStats.success / totalEntities).toFixed(2),
          totalOnPage: (summaryOnPageStats.success / entitiesOnPage).toFixed(2)
        }, {
          label: 'Errors %',
          valuePath: 'errors',
          width: '100px',
          total: (summaryStats.errors / totalEntities).toFixed(2),
          totalOnPage: (summaryOnPageStats.errors / entitiesOnPage).toFixed(2)
        }, {
          label: 'Zeros %',
          valuePath: 'zeros',
          width: '100px',
          total: (summaryStats.zeros / totalEntities).toFixed(2),
          totalOnPage: (summaryStats.zeros / entitiesOnPage).toFixed(2)
        }, {
          label: 'T/O %',
          valuePath: 'timeouts',
          width: '80px',
          total: (summaryStats.timeouts / totalEntities).toFixed(2),
          totalOnPage: (summaryOnPageStats.timeouts / entitiesOnPage).toFixed(2)
        }, {
          label: 'Avg Resp',
          valuePath: 'duration',
          total: (summaryStats.duration / totalEntities).toFixed(2),
          totalOnPage: (summaryOnPageStats.duration / entitiesOnPage).toFixed(2)
        }]
    }
  }),

  setPage(page) {
    let totalPages = get(this, 'totalPages');
    let currPage = get(this, 'page');

    if (page < 1 || page > totalPages || page === currPage) {
      return;
    }

    set(this, 'page', page);
  },

  changeEntitiesOnPage(entitiesOnPage) {
    set(this, 'entitiesOnPage', entitiesOnPage);
    set(this, 'page', 1);
  }
});
