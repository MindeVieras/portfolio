import React, { Component } from 'react';

import { PizzaPoint } from './Pizza';

export interface PizzaCenterDimensions extends PizzaPoint {
  r: number;
}

interface PizzaCenterProps extends PizzaCenterDimensions {
  title: string;
  mainTitle: string;
  slogan: string;
  logo: string;
  logoSizeRatio?: number;
  fill?: string;
}

export default class PizzaCenter extends Component<PizzaCenterProps> {
  render() {
    const {
      x,
      y,
      r,
      title,
      mainTitle,
      slogan,
      logo,
      logoSizeRatio,
      fill
    } = this.props;

    const logoSize = r * (logoSizeRatio || 1.7);

    return (
      <g id="piece_skills">
        <title>{title}</title>
        <circle
          id="pizza_center_circle"
          fill={fill || '#333333'}
          cx={x}
          cy={y}
          r={r}
        ></circle>
        <defs>
          <path
            id="pizza_center_top_text"
            d={`M ${x - r + r / 6},${y} A ${r - r / 6},${r - r / 6} 0 1 1 ${x +
              r -
              r / 6},${y}`}
          ></path>
        </defs>
        <text x="0" y="0" textAnchor="middle">
          <textPath
            id="pizza_center_top_text_path"
            href="#pizza_center_top_text"
            startOffset="50%"
            style={{
              fill: 'rgba(204, 200, 200, 0.7)',
              letterSpacing: '5px',
              fontSize: r / 8
            }}
          >
            {slogan}
          </textPath>
        </text>
        <defs>
          <path
            id="pizza_center_bottom_text"
            d={`M ${x - r + 5},${y} A ${r - 5},${r - 5} 0 1 0 ${x +
              r -
              5},${y}`}
          ></path>
        </defs>
        <text x="0" y="0" textAnchor="middle">
          <textPath
            id="pizza_center_bottom_text_path"
            startOffset="50%"
            href="#pizza_center_bottom_text"
            style={{
              fill: 'rgba(204, 200, 200, 0.7)',
              letterSpacing: '5px',
              fontSize: r / 5
            }}
          >
            {mainTitle}
          </textPath>
        </text>

        <image
          id="pizza_logo"
          width={logoSize}
          height={logoSize}
          x={x - logoSize / 2}
          y={y - logoSize / 2}
          href={logo}
        ></image>
      </g>
    );
  }
}
