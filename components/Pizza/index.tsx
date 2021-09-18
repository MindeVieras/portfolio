
import { FunctionComponent, useState, useEffect } from 'react'

import { PizzaCenterPiece, PizzaCenterPieceProps, PizzaPiece, PizzaPieceProps } from '.'
import { Pizza as PizzaClass, PizzaPoint, PizzaSize } from './Pizza.class'

export interface PizzaProps {
  size?: PizzaSize;
  center?: PizzaPoint;
  centerPiece?: PizzaCenterPieceProps;
  pieces: PizzaPieceProps[]
}

export const Pizza: FunctionComponent<PizzaProps> = ({ size, center, centerPiece, pieces }) => {
  const [svgWidth, setSvgWidth] = useState(window.innerWidth)
  const [svgHeight, setSvgHeight] = useState(window.innerHeight)

  const pizzaSize = {
    width: size?.width || svgWidth,
    height: size?.height || svgHeight
  }

  const P = new PizzaClass({ size: pizzaSize, center })

  useEffect(() => {
    function handleWindowResize() {
      setSvgWidth(window.innerWidth)
      setSvgHeight(window.innerHeight)

    }

    window.addEventListener('resize', handleWindowResize)
  })

  return (
    <>
      <svg id="pizza_svg" width={P.size.width} height={P.size.height} xmlns="http://www.w3.org/2000/svg">
        {/* <PizzaCenterPiece pizzaSize={pizzaSize} center={pizzaCenter} {...centerPiece} /> */}

        {pieces.map((piece, i) => {
          return <PizzaPiece key={i} pizza={P} index={i} totalPieces={pieces.length} {...piece} />
        })}
      </svg>

      {/* Apply body styles if fullscreen pizza size. */}
      {!size &&
        <style global jsx>{`
          body {
            overflow: hidden;
          }
        `}</style>
      }
    </>
  )
}

export default Pizza

export * from './PizzaCenterPiece'
export * from './PizzaPiece'
