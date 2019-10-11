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
  d: string;
}

export default class PizzaPieces extends Component<PizzaPiecesProps> {
  getCoordinatesForPercent = (percent: number) => {
    const { centerDimensions } = this.props;
    const pizzaRadius = this.getPizzaRadius();
    const x =
      centerDimensions.x - Math.cos(2 * Math.PI * percent) * pizzaRadius;
    const y =
      centerDimensions.y - Math.sin(2 * Math.PI * percent) * pizzaRadius;
    return [x, y];
  };

  getPizzaRadius() {
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

      const [startX, startY] = this.getCoordinatesForPercent(i / totalPieces);
      const [endX, endY] = this.getCoordinatesForPercent((i + 1) / totalPieces);

      // Create an array and join it just for code readability.
      const pathData = [
        `M ${centerDimensions.x},${centerDimensions.y}`,
        `L ${startX},${startY}`,
        `A ${pizzaRadius},${pizzaRadius} 0 0 1 ${endX} ${endY}`,
        `Z`
      ].join(' ');

      return <Piece key={p.id} {...p} d={pathData} />;
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
    const { fill, d } = this.props;

    return (
      <g>
        <path fill={fill} d={d} />
      </g>
    );
  }
}
