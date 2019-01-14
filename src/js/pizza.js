
import slugify from 'slugify'

class Pizza {

  constructor(svgWidth, svgHeight, svgId) {
    
    // this.svgWidth = svgWidth
    // this.svgHeight = svgHeight
    this.logo = '/images/logo.png'
    this.svgNamespaceURI = 'http://www.w3.org/2000/svg'
    this.svgLinkNamespaceURI = 'http://www.w3.org/1999/xlink'
    this.pieceClassName = 'pizza-piece'
    this.pizzaSVG = document.getElementById(svgId)
    this.currentPieces = document.getElementsByClassName(this.pieceClassName)
  }

  draw() {

    // Firstly remove current pieces
    while(this.currentPieces.length > 0){
      this.currentPieces[0].parentNode.removeChild(this.currentPieces[0])
    }

    // Now set global pizza variables
    this.svgWidth = window.innerWidth
    this.svgHeight = window.innerHeight
    this.svgCenterX = this.svgWidth / 2
    this.svgCenterY = this.svgHeight / 2
    this.circleR = this.svgHeight / 5
    this.middleAlign = 1.5

    if ((this.svgHeight * 2) >= this.svgWidth) {
      this.circleR = this.svgWidth / 10
      this.middleAlign = 1.3
    }

    this.logoSize = this.circleR * 1.7
    this.circleHalfR = this.circleR / 2
    this.triangleH = (Math.sqrt(3) * this.circleR) / 2;
    this.pieceTextSize = this.circleR / 2.5


    // Set pizza SVG dimentions
    this.pizzaSVG.setAttribute('width', this.svgWidth)
    this.pizzaSVG.setAttribute('height', this.svgHeight)

    this.drawCenterPiece()
    this.drawPieces()
  }

  drawCenterPiece() {

    // Create center piece elements
    const centerGroup  = document.createElementNS(this.svgNamespaceURI, 'g'),
          centerTitle  = document.createElementNS(this.svgNamespaceURI, 'title'),
          centerImage  = document.createElementNS(this.svgNamespaceURI, 'image'),
          centerCircle = document.createElementNS(this.svgNamespaceURI, 'circle')

    // Add group click
    // centerGroup.addEventListener('click', () => this.onPieceClick('skills'))

    // Add group class name
    centerGroup.classList.add(this.pieceClassName)

    // Set image attributes
    centerImage.setAttribute('width', this.logoSize)
    centerImage.setAttribute('height', this.logoSize)
    centerImage.setAttribute('x', this.svgCenterX - (this.logoSize / 2))
    centerImage.setAttribute('y', this.svgCenterY - (this.logoSize / 2))
    centerImage.setAttributeNS(this.svgLinkNamespaceURI, 'xlink:href', this.logo)

    // Set circle attributes
    centerCircle.setAttribute('fill', '#333333')
    centerCircle.setAttribute('cx', this.svgCenterX)
    centerCircle.setAttribute('cy', this.svgCenterY)
    centerCircle.setAttribute('r', this.circleR)

    // Append center piece elements
    centerTitle.textContent = 'Skills'
    centerGroup.appendChild(centerTitle)
    centerGroup.appendChild(centerImage)
    centerGroup.appendChild(centerCircle)

    // Append center piece to SVG
    this.pizzaSVG.appendChild(centerGroup)
  }

  drawPieces() {

    const pieces = [
      {
        name: 'Summary',
        fill: '#545454',
        points: {
          text: {
            x: this.svgCenterX, y: (this.svgCenterY - this.circleR) / 1.5
          },
          path: {
            mx: this.svgCenterX - this.circleHalfR, my: this.svgCenterY - this.triangleH,
            ar: this.circleR, ax: this.svgCenterX + this.circleHalfR, ay: this.svgCenterY - this.triangleH,
            l1x: this.svgWidth, l1y: 0,
            l2x: 0, l2y: 0
          }
        }
      },
      {
        name: 'Projects',
        fill: '#444444',
        points: {
          text: {
            x: this.svgCenterX + ((this.svgCenterX + this.circleR) / 2), y: this.svgCenterY / this.middleAlign
          },
          path: {
            mx: this.svgCenterX + this.circleHalfR, my: this.svgCenterY - this.triangleH,
            ar: this.circleR, ax: this.svgCenterX + this.circleR, ay: this.svgCenterY,
            l1x: this.svgWidth, l1y: this.svgCenterY,
            l2x: this.svgWidth, l2y: 0
          }
        }
      },
      {
        name: 'Experience',
        fill: '#7a7a7a',
        points: {
          text: {
            x: this.svgCenterX + ((this.svgCenterX + this.circleR) / 2), y: this.svgCenterY + (this.svgCenterY / (this.middleAlign + 1.5))
          },
          path: {
            mx: this.svgCenterX + this.circleR, my: this.svgCenterY,
            ar: this.circleR, ax: this.svgCenterX + this.circleHalfR, ay: this.svgCenterY + this.triangleH,
            l1x: this.svgWidth, l1y: this.svgHeight,
            l2x: this.svgWidth, l2y: this.svgCenterY
          }
        }
      },
      {
        name: 'Expertise',
        fill: '#545454',
        points: {
          text: {
            x: this.svgCenterX, y: this.svgCenterY + this.circleR + ((this.svgCenterY - this.circleR) / 2)
          },
          path: {
            mx: this.svgCenterX + this.circleHalfR, my: this.svgCenterY + this.triangleH,
            ar: this.circleR, ax: this.svgCenterX - this.circleHalfR, ay: this.svgCenterY + this.triangleH,
            l1x: 0, l1y: this.svgHeight,
            l2x: this.svgWidth, l2y: this.svgHeight
          }
        }
      },
      {
        name: 'Education',
        fill: '#444444',
        points: {
          text: {
            x: (this.svgCenterX - this.circleR) / 2, y: this.svgCenterY + (this.svgCenterY / (this.middleAlign + 1.5))
          },
          path: {
            mx: this.svgCenterX - this.circleHalfR, my: this.svgCenterY + this.triangleH,
            ar: this.circleR, ax: this.svgCenterX - this.circleR, ay: this.svgCenterY,
            l1x: 0, l1y: this.svgCenterY,
            l2x: 0, l2y: this.svgHeight
          }
        }
      },
      {
        name: 'Interests',
        fill: '#7a7a7a',
        points: {
          text: {
            x: (this.svgCenterX - this.circleR) / 2, y: this.svgCenterY / this.middleAlign
          },
          path: {
            mx: this.svgCenterX - this.circleR, my: this.svgCenterY,
            ar: this.circleR, ax: this.svgCenterX - this.circleHalfR, ay: this.svgCenterY - this.triangleH,
            l1x: 0, l1y: 0,
            l2x: 0, l2y: this.svgCenterY
          }
        }
      }
    ]

    // Draw all pieces
    pieces.map(piece => {

      const { name, points } = piece

      // Piece elements
      const pieceGroup = document.createElementNS(this.svgNamespaceURI, 'g'),
            pieceTitle = document.createElementNS(this.svgNamespaceURI, 'title'),
            pieceText  = document.createElementNS(this.svgNamespaceURI, 'text'),
            piecePath  = document.createElementNS(this.svgNamespaceURI, 'path')

      // Add group click
      pieceGroup.addEventListener('click', () => this.onPieceClick(slugify(name.toLowerCase(), '_')))

      const text = document.createTextNode(name)

      // Add group class name and text size
      pieceGroup.classList.add(this.pieceClassName)
      pieceGroup.style.fontSize = this.pieceTextSize

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
      pieceTitle.textContent = name
      pieceText.appendChild(text)
      pieceGroup.appendChild(pieceTitle)
      pieceGroup.appendChild(pieceText)
      pieceGroup.appendChild(piecePath)

      // Append all pieces to SVG
      this.pizzaSVG.appendChild(pieceGroup)
    })

  }

  onPieceClick(id) {

    if (typeof id === 'string' || id instanceof String) {
      $(`#modal_${id}`).modal()
    }
    return
  }

}

export default Pizza
