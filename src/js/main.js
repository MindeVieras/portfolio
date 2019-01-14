
import 'bootstrap'

// Import styles
import '@fortawesome/fontawesome-free/css/all.css'
import '../sass/main.scss'

// Import Portfolio Class
import Portfolio from './portfolio'
const P = new Portfolio()

// main window events
window.onload = P.init()
window.addEventListener('resize', () => P.onResize())
