import React, { Component } from 'react';
import dynamic from 'next/dynamic';

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
      <div id="pizza_wrapper">
        <Pizza width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}

export default Home;
