

import WebFont from 'webfontloader'

export default class Portfolio {

  constructor() {

    // Set initial variables
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.mainWrapper = document.getElementById('main_wrapper')
    // this.sidebarWrapper = document.getElementById('main_sidebar')
    // this.sidebarWidth = this.sidebarWrapper.offsetWidth
    // this.menuList = document.getElementById('main_navigation')
    // this.menuItems = document.querySelectorAll('.menu-link')
    // this.sections = document.querySelectorAll('#main_content .main-section')
    // this.scrollOffset = window.innerHeight / 2
    
    // Munu clicks
    // this.menuItems.forEach(link => {
    //   link.addEventListener('click', this.menuClick)
    // })

    // this.menuClick = this.menuClick.bind(this)
  }

  init() {

    // Load fonts
    WebFont.load({
      google: {
        families: ['Play:400,700']
      },
      active: () => {
        // Do the rest once fonts are loaded
        this.setInitialOpacity()
        this.onResize()
      }
    })
  }

  // Set #main_wrapper opacity to 1 when js loaded
  setInitialOpacity() {
    this.mainWrapper.style.opacity = 1
  }

  // on menu click scroll to section
  menuClick(e) {

    e.preventDefault()
    
    const href = this.getAttribute('href')
    if (href) {
      // scrollToElement(href, {
      //   offset: 0,
      //   duration: 750
      // })
    }
  }

  // window resize event handler
  onResize() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    // this.makeHeroImage()
  }

  // set menu active menu item
  setActive(activeItem) {
    // activeItem.classList.add('active')
  }

  // remove active menu class
  removeCurrentActive() {
    // this.menuItems.forEach(item => {
    //   item.classList.remove('active')
    // })
  }
}
