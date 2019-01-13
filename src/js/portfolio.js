

import WebFont from 'webfontloader'

export default class Portfolio {

  constructor() {

    // Set initial variables
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.mainWrapper = document.getElementById('main_wrapper')
    this.pizzaSVG = document.getElementById('pizza_svg')
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

  // window resize event handler
  onResize() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.drawPizza()
  }

  drawPizza() {
    
    const pieceClassName = 'pizza-piece'

    // Firstly remove old pieces
    const oldPieces = document.getElementsByClassName(pieceClassName)
    while(oldPieces.length > 0){
      oldPieces[0].parentNode.removeChild(oldPieces[0])
    }

    let pizzaWidth  = this.windowWidth,
        pizzaHeight = this.windowHeight,
        centerX     = pizzaWidth / 2,
        centerY     = pizzaHeight / 2,
        circleR     = pizzaHeight / 5,
        middleAlign = 1.5

    if ((pizzaHeight * 2) >= pizzaWidth) {
      circleR = pizzaWidth / 10
      middleAlign = 1.3
    }

    let circleHalfR = circleR / 2
    let triangleH = (Math.sqrt(3) * circleR) / 2;
    
    // Set pizza SVG dimentions
    this.pizzaSVG.setAttribute('width', pizzaWidth)
    this.pizzaSVG.setAttribute('height', pizzaHeight)

    const pieces = [
      {
        name: 'Summary',
        fill: '#545454',
        points: {
          text: {
            x: centerX, y: (centerY - circleR) / 1.5
          },
          path: {
            mx: centerX - circleHalfR, my: centerY - triangleH,
            ar: circleR, ax: centerX + circleHalfR, ay: centerY - triangleH,
            l1x: pizzaWidth, l1y: 0,
            l2x: 0, l2y: 0
          }
        }
      },
      {
        name: 'Projects',
        fill: '#444444',
        points: {
          text: {
            x: centerX + ((centerX + circleR) / 2), y: centerY / middleAlign
          },
          path: {
            mx: centerX + circleHalfR, my: centerY - triangleH,
            ar: circleR, ax: centerX + circleR, ay: centerY,
            l1x: pizzaWidth, l1y: centerY,
            l2x: pizzaWidth, l2y: 0
          }
        }
      },
      {
        name: 'Experience',
        fill: '#7a7a7a',
        points: {
          text: {
            x: centerX + ((centerX + circleR) / 2), y: centerY + (centerY / (middleAlign + 1.5))
          },
          path: {
            mx: centerX + circleR, my: centerY,
            ar: circleR, ax: centerX + circleHalfR, ay: centerY + triangleH,
            l1x: pizzaWidth, l1y: pizzaHeight,
            l2x: pizzaWidth, l2y: centerY
          }
        }
      },
      {
        name: 'Expertise',
        fill: '#545454',
        points: {
          text: {
            x: centerX, y: centerY + circleR + ((centerY - circleR) / 2)
          },
          path: {
            mx: centerX + circleHalfR, my: centerY + triangleH,
            ar: circleR, ax: centerX - circleHalfR, ay: centerY + triangleH,
            l1x: 0, l1y: pizzaHeight,
            l2x: pizzaWidth, l2y: pizzaHeight
          }
        }
      },
      {
        name: 'Education',
        fill: '#444444',
        points: {
          text: {
            x: (centerX - circleR) / 2, y: centerY + (centerY / (middleAlign + 1.5))
          },
          path: {
            mx: centerX - circleHalfR, my: centerY + triangleH,
            ar: circleR, ax: centerX - circleR, ay: centerY,
            l1x: 0, l1y: centerY,
            l2x: 0, l2y: pizzaHeight
          }
        }
      },
      {
        name: 'Interests',
        fill: '#7a7a7a',
        points: {
          text: {
            x: (centerX - circleR) / 2, y: centerY / middleAlign
          },
          path: {
            mx: centerX - circleR, my: centerY,
            ar: circleR, ax: centerX - circleHalfR, ay: centerY - triangleH,
            l1x: 0, l1y: 0,
            l2x: 0, l2y: centerY
          }
        }
      }
    ]

    pieces.map(piece => {

      const { name, points } = piece

      // Piece elements
      const svgNamespaceURI = 'http://www.w3.org/2000/svg',
            pieceGroup = document.createElementNS(svgNamespaceURI, 'g'),
            pieceText  = document.createElementNS(svgNamespaceURI, 'text'),
            piecePath  = document.createElementNS(svgNamespaceURI, 'path')
      
      const text = document.createTextNode(name)

      // Add group class name
      pieceGroup.classList.add(pieceClassName);

      // Set text points
      pieceText.setAttribute('x', points.text.x)
      pieceText.setAttribute('y', points.text.y)
      pieceText.setAttribute('text-anchor', 'middle')

      // Set path points
      const pathD = 
        `M ${points.path.mx} ${points.path.my}
         A ${points.path.ar} ${points.path.ar}, 0, 0, 1, ${points.path.ax} ${points.path.ay}
         L ${points.path.l1x} ${points.path.l1y}
         L ${points.path.l2x} ${points.path.l2y}
         Z`
      piecePath.setAttribute('d', pathD)

      // Set piece fill color
      piecePath.setAttribute('fill', piece.fill)

      // Append piece elements
      pieceText.appendChild(text)
      pieceGroup.appendChild(pieceText)
      pieceGroup.appendChild(piecePath)

      // Append all pieces to SVG
      this.pizzaSVG.appendChild(pieceGroup)
    })

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
