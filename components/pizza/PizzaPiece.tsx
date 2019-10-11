import React, { Component } from 'react';

import { PizzaPoint } from './Pizza';

interface PizzaPieceProps {
  title?: string;
  fill?: string;
  index: number;
  total: number;
  svgWidth: number;
  svgHeight: number;
  svgCenter: {
    x: number;
    y: number;
    r: number;
  };
  pizzaRadius: number;
}

interface PizzaPieceState {
  // startDeg: number;
  // pieceDeg: number;
  // startPoint: PizzaPoint;
  // perimeter: number;
  // perimeterPart: number;
}

class PizzaPiece extends Component<PizzaPieceProps, PizzaPieceState> {
  constructor(props: PizzaPieceProps) {
    super(props);
  }

  getCoordinatesForPercent = (percent: number) => {
    const { pizzaRadius, svgCenter } = this.props;
    const x = svgCenter.x - Math.cos(2 * Math.PI * percent) * pizzaRadius;
    const y = svgCenter.y - Math.sin(2 * Math.PI * percent) * pizzaRadius;
    return [x, y];
  };

  render() {
    const { index, total, fill, svgCenter, pizzaRadius } = this.props;

    // If the slice is more than 50%, take the large arc (the long way around).
    // const largeArcFlag = slice.percent > .5 ? 1 : 0;

    const [startX, startY] = this.getCoordinatesForPercent(index / total);
    const [endX, endY] = this.getCoordinatesForPercent((index + 1) / total);

    // Create an array and join it just for code readability.
    const pathData = [
      `M ${svgCenter.x},${svgCenter.y}`,
      `L ${startX},${startY}`,
      `A ${pizzaRadius},${pizzaRadius} 0 0 1 ${endX} ${endY}`,
      `Z`
    ].join(' ');

    return (
      <g>
        <path fill={fill} d={pathData} />
      </g>
    );
  }
}

export default PizzaPiece;
