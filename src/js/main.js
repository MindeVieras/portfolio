
// Import styles
import 'bootstrap/dist/css/bootstrap.css'
import '../sass/main.scss'

// Import Portfolio Class
import Portfolio from './portfolio'
const P = new Portfolio()

// main window events
window.onload = P.init()
window.addEventListener('resize', () => P.onResize())