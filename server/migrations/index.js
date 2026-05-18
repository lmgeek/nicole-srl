import migration001 from './001-initial-seed.js';
import migration002 from './002-category-images.js';
import migration003 from './003-migrate-legacy-products.js';

const migrations = [
  migration001,
  migration002,
  migration003,
];

export default migrations;
