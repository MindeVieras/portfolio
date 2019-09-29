import WebFont from 'webfontloader';

import PizzaClass from './pizza';

export default class Portfolio {
  constructor() {
    // Set initial variables
    this.svgNamespaceURI = 'http://www.w3.org/2000/svg';
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.mainWrapper = document.getElementById('pizza_wrapper');
    this.pizzaSVG = document.getElementById('pizza_svg');

    // Initialize Pizza Class
    this.Pizza = new PizzaClass(
      this.windowWidth,
      this.windowHeight,
      'pizza_svg'
    );
  }

  init() {
    // Open initial modal if hash route
    if (window.location.hash) $(window.location.hash).modal();

    // Also clear hash route on modal close
    $('.modal').on('hidden.bs.modal', function(e) {
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    });

    // Load fonts
    WebFont.load({
      google: {
        families: ['Play:400,700']
      },
      active: () => {
        // Do the rest once fonts are loaded
        this.setInitialOpacity();
        this.onResize();
      }
    });
  }

  // Set #pizza_wrapper opacity to 1 when js loaded
  setInitialOpacity() {
    this.mainWrapper.style.opacity = 1;
  }

  // window resize event handler
  onResize() {
    // Set global width and height
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    // Draw pizza
    this.Pizza.draw();
  }

  onHashChange() {
    // Open initial modal if hash route
    if (window.location.hash) $(window.location.hash).modal();
    else $('.modal').modal('hide');
  }
}
