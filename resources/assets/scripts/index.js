// 
require('../styles/global.sass');
// Polyfill for native runtime generator (async/await)
require('regenerator-runtime/runtime');
// Polyfill promises for non-supported env
require('core-js/fn/promise');
// Polyfill object-assign for non-supported env
require('core-js/fn/object/assign');
// Require client-side components
require('../../views/pages/main');
require('../../views/pages/vote');
require('../../views/pages/login');
require('../../views/pages/dashboard');
// Initialize components
require('marko/components').init();
