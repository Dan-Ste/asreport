import Controller from '@ember/controller';
import {
  readOnly
} from '@ember/object/computed';
import {
  get,
  computed
} from '@ember/object';


export default Controller.extend({
  data: readOnly('model'),

  perPage: 10,

  pages: computed('data', 'perPage', {
    get() {
      const data = get(this, 'data');
      const perPage = get(this, 'perPage');

      return Math.round(data.length / perPage);
    }
  })
});
