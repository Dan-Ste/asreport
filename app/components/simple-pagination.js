import Component from '@ember/component';
import {
  get,
  computed
} from '@ember/object';


function buildPagination(currentPage, totalPages, delta = 4) {
  let range = [];
  let rangeWithDots = [];
  let l;

  range.push(1)
  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < totalPages && i > 1) {
      range.push(i);
    }
  }
  range.push(totalPages);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

export default Component.extend({
  tagName: 'ul',
  classNames: ['simple-pagination'],

  page: null,
  totalPages: null,

  rangeWithDots: computed('page', 'totalPages', {
    get() {
      return buildPagination(get(this, 'page'), get(this, 'totalPages'));
    }
  }),

  onPageChange() {}
});
