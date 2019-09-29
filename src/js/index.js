import 'bootstrap';

// Import styles
import '../sass/main.scss';

// Import Portfolio Class
import Portfolio from './portfolio';
const P = new Portfolio();

// main window events
window.addEventListener('load', () => P.init());
window.addEventListener('resize', () => P.onResize());
window.addEventListener('hashchange', () => P.onHashChange());
