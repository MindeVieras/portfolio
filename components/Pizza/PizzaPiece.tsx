import { FunctionComponent } from 'react'

import { Pizza, PizzaPoint, PizzaSize } from './Pizza.class'

export interface PizzaPieceProps {
  title?: string;
  fill?: string;
  text?: string;
}

interface Props extends PizzaPieceProps {
  pizza: Pizza;
  index: number;
  totalPieces: number;
}

export const PizzaPiece: FunctionComponent<Props> = ({ pizza, index, totalPieces, fill }) => {
  const textSize = pizza.circle.r / 2.5

  const angle = 360 / totalPieces
  const pieceAngle = angle * index

  const startPoint = Pizza.polarToCartesian(pizza.center.x, pizza.center.y, pizza.circle.r, pieceAngle)

  const pathD = Pizza.describePiece(pizza.center.x, pizza.center.y, pizza.circle.r, pieceAngle, pieceAngle + angle)
  // let pathD = `M ${startPoint.x} ${startPoint.y}`
  // pathD += `A 128.5 128.5, 0, 0, 1, 706.75 616.7157356136996`
  // // pathD += `L 1285 0`
  // // pathD += `L 0 0`
  // // pathD += `Z`



  return (
    <g className="pizza-piece" style={{ fontSize: textSize }}>
      <path
        d={pathD}
        fill={'none'}
        stroke={fill}
        strokeWidth={5}
      ></path>
      <circle id="pizza_center_circle" fill='transparent' cx={startPoint.x} cy={startPoint.y} r={5} stroke={'black'}></circle>
    </g>
  )
}
