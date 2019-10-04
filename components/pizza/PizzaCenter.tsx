import React, { Component } from 'react';

interface PizzaCenterProps {
  x: number;
  y: number;
  r: number;
  title: string;
}

export default class PizzaCenter extends Component<PizzaCenterProps> {
  render() {
    const { x, y, r, title } = this.props;

    return (
      <g id="piece_skills">
        <title>{title}</title>
        <circle
          id="pizza_center_circle"
          fill="#333333"
          cx={x}
          cy={y}
          r={r}
        ></circle>

        {/* <!-- Center Top text -->
        <defs><path id="pizza_center_top_text" d="M 306.25,361.5
                            A 61.25,61.25
                            0 1 1 428.75,361.5"></path></defs>
        <text x="0" y="0" text-anchor="middle">
          <textPath id="pizza_center_top_text_path" startOffset="50%" xlink:href="#pizza_center_top_text" style="fill: rgba(204, 200, 200, 0.7); letter-spacing: 5px; font-size: 9.1875px;">
            Full Stack Developer
          </textPath>
        </text>
  
        <!-- Center Bottom text -->
        <defs><path id="pizza_center_bottom_text" d="M 299,361.5
                      A 68.5,68.5
                      0 1 0 436,361.5"></path></defs>
        <text x="0" y="0" text-anchor="middle">
          <textPath id="pizza_center_bottom_text_path" startOffset="50%" xlink:href="#pizza_center_bottom_text" style="fill: rgba(204, 200, 200, 0.7); letter-spacing: 5px; font-size: 14.7px;">
            Minde Vieras
          </textPath>
        </text>
  
  
        <image id="pizza_logo" width="124.95" height="124.95" x="305.025" y="299.025" xlink:href="/images/logo.png"></image> */}
      </g>
    );
  }
}
