import { FunctionComponent } from 'react'

import { PizzaPoint, PizzaSize } from './Pizza.class'

export interface PizzaCenterPieceProps {
  title?: string;
  fill?: string;
  image?: string;
  imageSizeRatio?: number;
  textTop?: string;
  textBottom?: string;
}

interface Props extends PizzaCenterPieceProps {
  pizzaSize: PizzaSize;
  center: PizzaPoint & {
    r: number;
  };
}

export const PizzaCenterPiece: FunctionComponent<Props> = ({ center, title, fill, image, imageSizeRatio, textTop, textBottom }) => {
  const imageSize = center.r * 1.7 * (imageSizeRatio || 1)
  const topTextD = `M ${center.x - center.r + (center.r / 6)},${center.y}
                    A ${center.r - (center.r / 6)},${center.r - (center.r / 6)}
                    0 1 1 ${center.x + center.r - (center.r / 6)},${center.y}`
  const bottomTextD = `M ${center.x - center.r + 5},${center.y}
                      A ${center.r - 5},${center.r - 5}
                      0 1 0 ${center.x + center.r - 5},${center.y}`

  return (
    <g>
      <g data-piece id="pizza_center_piece">

        {title &&
          <title>{title}</title>
        }
        <circle id="pizza_center_circle" fill={fill || '#333333'} cx={center.x} cy={center.y} r={center.r}></circle>

        {/* Center Top text */}
        {textTop &&
          <>
            <defs>
              <path id="pizza_center_top_text" d={topTextD}></path>
            </defs>
            <text x="0" y="0" textAnchor="middle">
              <textPath
                id="pizza_center_top_text_path"
                startOffset="50%"
                xlinkHref="#pizza_center_top_text"
                style={{
                  fill: 'rgba(204, 200, 200, 0.7)',
                  letterSpacing: '5px',
                  fontSize: center.r / 8,
                }}
              >
                {textTop}
              </textPath>
            </text>
          </>
        }

        {/* Center Bottom text */}
        {textBottom &&
          <>
            <defs>
              <path id="pizza_center_bottom_text" d={bottomTextD}></path>
            </defs>
            <text x="0" y="0" textAnchor="middle">
              <textPath
                id="pizza_center_bottom_text_path"
                startOffset="50%"
                xlinkHref="#pizza_center_bottom_text"
                style={{
                  fill: 'rgba(204, 200, 200, 0.7)',
                  letterSpacing: '5px',
                  fontSize: center.r / 5
                }}
              >
                {textBottom}
              </textPath>
            </text>
          </>
        }

        {image &&
          <image
            id="pizza_logo"
            width={imageSize}
            height={imageSize}
            x={center.x - (imageSize / 2)}
            y={center.y - (imageSize / 2)}
            xlinkHref={image}
          ></image>
        }

      </g>
    </g>
  )
}
