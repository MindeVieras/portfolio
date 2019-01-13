

import WebFont from 'webfontloader'

export default class Portfolio {

  constructor() {

    // Set initial variables
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.mainWrapper = document.getElementById('main_wrapper')
    this.sidebarWrapper = document.getElementById('main_sidebar')
    this.sidebarWidth = this.sidebarWrapper.offsetWidth
    this.menuList = document.getElementById('main_navigation')
    this.menuItems = document.querySelectorAll('.menu-link')
    this.sections = document.querySelectorAll('#main_content .main-section')
    this.scrollOffset = window.innerHeight / 2
    
    // Munu clicks
    this.menuItems.forEach(link => {
      link.addEventListener('click', this.menuClick)
    })

    // this.menuClick = this.menuClick.bind(this)
  }

  init() {
    this.loadFonts()
  }

  // Load fonts
  loadFonts() {
    WebFont.load({
      google: {
        families: ['Roboto:100,300,400,500,700,900']
      },
      active: () => {
        // Do the rest once fonts are loaded
        this.setInitialOpacity()
        this.onResize()
        this.onScroll()
      }
    })
  }

  // Set #main_wrapper opacity to 1 when js loaded
  setInitialOpacity() {
    this.mainWrapper.style.opacity = 1
  }
  
  makeHeroImage() {
    // Change this value to adjust the amount of blur
    const BLUR_RADIUS = 10
    const canvasWidth = this.windowWidth - this.sidebarWidth
    const canvasHeight = this.windowHeight

    let canvas = document.getElementById('hero_canvas')
    let ctx = canvas.getContext('2d')

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    let image = new Image()
    image.src = document.getElementById('hero_image').src


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
    this.makeHeroImage()
  }

  // window scroll event handler
  onScroll() {
    this.sections.forEach(section => {
      const currentPosition = document.documentElement.scrollTop || document.body.scrollTop
      const isInView = section.offsetTop <= currentPosition + this.scrollOffset
      if (isInView) {
        const menuItemID = section.getAttribute('id')
        const activeItem = this.menuList.querySelector(`[href="#${menuItemID}"]`)
        if (!activeItem) {
          return
        }

        this.removeCurrentActive()
        this.setActive(activeItem)
      }
    })
  }

  // set menu active menu item
  setActive(activeItem) {
    activeItem.classList.add('active')
  }

  // remove active menu class
  removeCurrentActive() {
    this.menuItems.forEach(item => {
      item.classList.remove('active')
    })
  }
}
