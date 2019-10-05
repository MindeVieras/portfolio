import React, { Component } from 'react';

import { PizzaPoint } from './Pizza';

interface PizzaPieceProps {
  index: number;
  total: number;
  width: number;
  height: number;
  center: {
    x: number;
    y: number;
    r: number;
  };
  title?: string;
  fill?: string;
}

interface PizzaPieceState {
  startPoint: PizzaPoint;
  perimeter: number;
  perimeterPart: number;
}

class PizzaPiece extends Component<PizzaPieceProps, PizzaPieceState> {
  constructor(props: PizzaPieceProps) {
    super(props);

    // Set pizza perimeter.
    const perimeter = (props.width + props.height) * 2;

    this.state = {
      // Set starting point on the middle of the left edge of the pizza wrapper.
      startPoint: {
        x: 0,
        y: props.height / 2
      },
      // Set the lenght of piece edge on perimeter.
      perimeterPart: perimeter / props.total,
      perimeter
    };
  }

  getPointOnPerimeter = (index: number): PizzaPoint => {
    // const { perimeter } = this.state;
    return {
      x: 10,
      y: 20
    };
  };

  render() {
    const { index, fill, center } = this.props;
    const { perimeterPart } = this.state;

    const partPlus = perimeterPart * index;

    console.log(this.getPointOnPerimeter(index));

    return (
      <g id={`piece_${index}`}>
        <path
          fill={fill}
          d={`
            M ${center.x} ${center.y}
            L 756 361
            L 756 0
            Z
          `}
        />
      </g>
    );
  }
}

export default PizzaPiece;
