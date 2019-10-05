import React, { Component } from 'react';

import PizzaFooter from './PizzaFooter';
import PizzaCenter from './PizzaCenter';
import PizzaPiece from './PizzaPiece';

import data from '../../data.json';

export interface PizzaPoint {
  x: number;
  y: number;
}

interface PizzaProps {
  width: number;
  height: number;
}

interface PizzaState {
  width: number;
  height: number;
  centerDimensions: {
    x: number;
    y: number;
    r: number;
  };
}

class Pizza extends Component<PizzaProps, PizzaState> {
  constructor(props: PizzaProps) {
    super(props);

    // Calculate & set state of pizza dimensions
    let centerRadius = props.height / 5;
    if (props.height * 2 >= props.width) {
      centerRadius = props.width / 10;
    }

    this.state = {
      width: props.width,
      height: props.height,
      centerDimensions: {
        x: props.width / 2,
        y: props.height / 2,
        r: centerRadius
      }
    };
  }

  render() {
    const { width, height, centerDimensions } = this.state;

    const { center, pieces } = data;
    const pizzaPieces = pieces.map((s, i) => {
      return (
        <PizzaPiece
          key={s.id}
          index={i}
          total={pieces.length - 1}
          width={width}
          height={height}
          center={centerDimensions}
          title={s.title}
          fill={s.fill}
        />
      );
    });

    return (
      <div id="pizza_wrapper">
        <svg
          id="pizza_svg"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
        >
          <PizzaCenter {...centerDimensions} {...center} />

          {pizzaPieces}
        </svg>

        <PizzaFooter />

        {/* {{#each sections}} */}
        {/* <dialog>{{> pizza/modal}}</dialog> */}
        {/* {{/each}} */}
        <style jsx global>{`
          *, *::before, *::after {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            text-align: left;
            background-color: #F5F5F5;
            overflow: hidden;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
          a:hover {
              text-decoration: none;
              color: inherit;
            }
          }
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default Pizza;
