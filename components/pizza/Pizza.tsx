import React, { Component, Fragment } from 'react';

import PizzaFooter from './PizzaFooter';
import PizzaCenter from './PizzaCenter';
import PizzaPieces from './PizzaPieces';

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

    const { center, pieces } = data;

    pieces.map(p => {
      const { id, title, fill, size } = p;
      return { id, title, fill, size };
    });

    return (
      <Fragment>
        <svg
          id="pizza_svg"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
        >
          <PizzaPieces
            pieces={pieces}
            svgWidth={width}
            svgHeight={height}
            centerDimensions={centerDimensions}
          />

          <PizzaCenter {...centerDimensions} {...center} />
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
            background-color: #000;
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
        `}</style>
      </Fragment>
    );
  }
}

export default Pizza;
