import React, { Component, Fragment } from 'react';

import { PizzaPoint } from './Pizza';
import { PizzaCenterDimensions } from './PizzaCenter';

interface PizzaPiecesProps {
  pieces: PieceDataProps[];
  svgWidth: number;
  svgHeight: number;
  centerDimensions: PizzaCenterDimensions;
}

interface PieceDataProps {
  id: string;
  title: string;
  fill: string;
  size: number;
}

interface PieceProps extends PieceDataProps {
  index: number;
  dots: PizzaPoint[];
  pizzaRadius: number;
  centerRadius: number;
  oversized: boolean;
}

export default class PizzaPieces extends Component<PizzaPiecesProps> {
  private getCoordinatesForPercent = (
    percent: number,
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    const x = centerX - Math.cos(2 * Math.PI * percent) * radius;
    const y = centerY - Math.sin(2 * Math.PI * percent) * radius;

    return [x, y];
  };

  private getPizzaRadius() {
    const { svgWidth, svgHeight } = this.props;
    const minRes = Math.min(svgWidth, svgHeight);
    const maxRes = Math.max(svgWidth, svgHeight);

    let radius = 0;

    radius = Math.sqrt(Math.pow(minRes / 2, 2) + Math.pow(maxRes / 2, 2));

    return radius;
  }

  render() {
    const { centerDimensions, pieces } = this.props;
    const pizzaRadius = this.getPizzaRadius();

    const sizes = pieces.map(p => p.size);
    const sizesTotal = sizes.reduce((a, b) => a + b);

    let cumulativeSize = 0;

    const renderPieces = pieces.map((p, i) => {
      // If the slice is more than 50%, take the large arc (the long way around).
      const oversized = p.size / sizesTotal > 0.5;

      const [startX, startY] = this.getCoordinatesForPercent(
        cumulativeSize / sizesTotal,
        centerDimensions.x,
        centerDimensions.y,
        pizzaRadius
      );
      const [centerStartX, centerStartY] = this.getCoordinatesForPercent(
        cumulativeSize / sizesTotal,
        centerDimensions.x,
        centerDimensions.y,
        centerDimensions.r
      );

      cumulativeSize += sizes[i];
      const [endX, endY] = this.getCoordinatesForPercent(
        cumulativeSize / sizesTotal,
        centerDimensions.x,
        centerDimensions.y,
        pizzaRadius
      );
      const [centerEndX, centerEndY] = this.getCoordinatesForPercent(
        cumulativeSize / sizesTotal,
        centerDimensions.x,
        centerDimensions.y,
        centerDimensions.r
      );

      const [textX, textY] = this.getCoordinatesForPercent(
        (cumulativeSize - sizes[i] / 2) / sizesTotal,
        centerDimensions.x,
        centerDimensions.y,
        centerDimensions.r + pizzaRadius / 4
      );

      // Create an array and join it just for code readability.
      const dotsData = [
        { x: textX, y: textY }, // First item in array is for text coordinates.
        { x: startX, y: startY },
        { x: endX, y: endY },
        { x: centerEndX, y: centerEndY },
        { x: centerStartX, y: centerStartY }
      ];

      return (
        <Piece
          key={p.id}
          {...p}
          index={i}
          pizzaRadius={pizzaRadius}
          centerRadius={centerDimensions.r}
          dots={dotsData}
          oversized={oversized}
        />
      );
    });

    return (
      <Fragment>
        {renderPieces}
        <circle
          r={pizzaRadius}
          cx={centerDimensions.x}
          cy={centerDimensions.y}
          stroke="black"
          strokeWidth={1}
          fill="none"
        />
      </Fragment>
    );
  }
}

class Piece extends Component<PieceProps> {
  render() {
    const {
      fill,
      title,
      index,
      pizzaRadius,
      centerRadius,
      dots,
      oversized
    } = this.props;

    // Text points.
    const textX = dots[0].x;
    const textY = dots[0].y;

    // Create an array and join it just for code readability.
    const pathData = [
      `M ${dots[1].x},${dots[1].y}`,
      `A ${pizzaRadius},${pizzaRadius} 0 ${oversized ? 1 : 0} 1 ${dots[2].x} ${
        dots[2].y
      }`,
      `L ${dots[3].x},${dots[3].y}`,
      `A ${centerRadius},${centerRadius} 0 ${oversized ? 1 : 0} 0 ${
        dots[4].x
      } ${dots[4].y}`,
      `Z`
    ].join(' ');

    return (
      <Fragment>
        <g tabIndex={index}>
          <text x={textX} y={textY} textAnchor="middle">
            {title}
          </text>
          <circle cx={textX} cy={textY} r={5} stroke="red" />
          <path fill={fill} d={pathData} />
        </g>
        <style jsx>{`
          g {
            cursor: pointer;
            font-size: ${centerRadius / 2.5}px;
          }
          g:focus {
            outline: 0;
          }
          g:hover path,
          g:focus path {
            opacity: 0.1;
          }
          text {
            font-weight: lighter;
            font-family: 'Play', sans-serif;
            fill: rgba(204, 200, 200, 0.5);
          }
          path {
            opacity: 0.4;
            transition: opacity 0.3s ease;
          }
        `}</style>
      </Fragment>
    );
  }
}
