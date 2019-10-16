import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import PizzaFooter from '../components/pizza/PizzaFooter';

import { socialLinks } from '../data.json';

// Disable ssr for Pizza in order to get browser window.
const Pizza = dynamic(() => import('../components/pizza/Pizza'), {
  ssr: false
});

class Home extends Component {
  state = {
    width: 0,
    height: 0
  };

  componentDidMount() {
    // Add resize event listener
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    // Remove resize event listener
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  // Calculate & Update state of new dimensions
  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>Portfolio | Minde Vieras</title>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          />
        </Head>
        <div id="pizza_wrapper">
          <Pizza width={this.state.width} height={this.state.height} />
          <PizzaFooter links={socialLinks} />
        </div>
      </Fragment>
    );
  }
}

export default Home;
