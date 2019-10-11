import React, { Component, Fragment } from 'react';

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

class Pizza extends Component<PizzaProps> {
  getPizzaRadius() {
    const { width, height } = this.props;
    const minRes = Math.min(width, height);
    const maxRes = Math.max(width, height);
    let radius = minRes / 2;

    console.log(maxRes);

    return radius;
  }

  render() {
    const { width, height } = this.props;

    // Calculate & set state of pizza dimensions
    let centerRadius = height / 5;
    if (height * 2 >= width) {
      centerRadius = width / 10;
    }

    const centerDimensions = {
      x: width / 2,
      y: height / 2,
      r: centerRadius
    };

    const pizzaRadius = this.getPizzaRadius();

    const { center, pieces } = data;
    const pizzaPieces = pieces.map((s, i) => {
      return (
        <PizzaPiece
          key={s.id}
          index={i}
          total={pieces.length}
          svgWidth={width}
          svgHeight={height}
          svgCenter={centerDimensions}
          pizzaRadius={pizzaRadius}
          title={s.title}
          fill={s.fill}
        />
      );
    });

    // const x = Math.cos(2 * Math.PI * (1 / 3));
    // const y = Math.sin(2 * Math.PI * (1 / 3));

    // console.log(x);
    // console.log(y);

    return (
      <Fragment>
        <svg
          id="pizza_svg"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <PizzaCenter {...centerDimensions} {...center} /> */}

          <circle
            r={pizzaRadius}
            cx={centerDimensions.x}
            cy={centerDimensions.y}
            stroke="grey"
            fill="none"
          />

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
      </Fragment>
    );
  }
}

export default Pizza;
