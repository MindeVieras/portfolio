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
  dots: PizzaPoint[];
  pizzaRadius: number;
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
    let radius = minRes / 2;

    return radius;
  }

  render() {
    const { centerDimensions, pieces } = this.props;

    const totalPieces = pieces.length;
    const pizzaRadius = this.getPizzaRadius();

    const renderPieces = pieces.map((p, i) => {
      // If the slice is more than 50%, take the large arc (the long way around).
      // const largeArcFlag = slice.percent > .5 ? 1 : 0;

      const [startX, startY] = this.getCoordinatesForPercent(
        i / totalPieces,
        centerDimensions.x,
        centerDimensions.y,
        pizzaRadius
      );

      const [endX, endY] = this.getCoordinatesForPercent(
        (i + 1) / totalPieces,
        centerDimensions.x,
        centerDimensions.y,
        pizzaRadius
      );

      // Create an array and join it just for code readability.
      const dotsData = [
        { x: centerDimensions.x, y: centerDimensions.y },
        { x: startX, y: startY },
        { x: endX, y: endY }
      ];

      return (
        <Piece key={p.id} {...p} pizzaRadius={pizzaRadius} dots={dotsData} />
      );
    });

    return (
      <Fragment>
        <circle
          r={pizzaRadius}
          cx={centerDimensions.x}
          cy={centerDimensions.y}
          stroke="grey"
          fill="none"
        />
        {renderPieces}
      </Fragment>
    );
  }
}

class Piece extends Component<PieceProps> {
  render() {
    const { fill, pizzaRadius, dots } = this.props;

    // Create an array and join it just for code readability.
    const pathData = [
      `M ${dots[0].x},${dots[0].y}`,
      `L ${dots[1].x},${dots[1].y}`,
      `A ${pizzaRadius},${pizzaRadius} 0 0 1 ${dots[2].x} ${dots[2].y}`,
      `Z`
    ].join(' ');

    return (
      <g>
        <path fill={fill} d={pathData} />
      </g>
    );
  }
}
