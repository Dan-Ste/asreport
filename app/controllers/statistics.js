import Controller from '@ember/controller';
import {
  readOnly
} from '@ember/object/computed';
import {
  META
} from '../utils/statistics-report';

export default Controller.extend({
  statistics: readOnly('model.statistics'),
  totalEntities: readOnly('model.totalEntities'),

  META
});
