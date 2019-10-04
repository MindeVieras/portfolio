import React, { Component } from 'react';

import PizzaFooter from './PizzaFooter';
import PizzaCenter from './PizzaCenter';

interface PizzaProps {}

interface PizzaState {
  width: number;
  height: number;
  center: {
    x: number;
    y: number;
    r: number;
  };
}

class Pizza extends Component<PizzaProps, PizzaState> {
  constructor(props: PizzaProps) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      center: {
        x: 0,
        y: 0,
        r: 0
      }
    };
  }

  componentDidMount(): void {
    this.updateDimensions();
    // Add resize event listener
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount(): void {
    // Remove resize event listener
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  // Calculate & Update state of new dimensions
  updateDimensions(): void {
    let centerRadius = window.innerHeight / 5;

    if (window.innerHeight * 2 >= window.innerWidth) {
      centerRadius = window.innerWidth / 10;
      // this.middleAlign = 1.3;
    }

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      center: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        r: centerRadius
      }
    });
  }

  render() {
    const { width, height } = this.state;

    return (
      <div id="pizza_wrapper">
        <svg
          id="pizza_svg"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
        >
          <PizzaCenter {...this.state.center} title="Skills" />
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
            background-color: black;
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
