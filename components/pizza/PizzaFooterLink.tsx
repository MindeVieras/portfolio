import React, { Component, Fragment } from 'react';

interface PizzaFooterIconProps {
  title: string;
  href: string;
  icon: JSX.Element;
  target?: string;
}

class PizzaFooterIcon extends Component<PizzaFooterIconProps> {
  render() {
    const { title, href, icon, target } = this.props;

    return (
      <Fragment>
        <a href={href} target={target} title={title} className="footer-link">
          <div className="icon">{icon}</div>
        </a>

        <style jsx>{`
          a {
            margin: 0 10px;
          }
          a:hover .icon {
              color: rgba(200,200,200,.9);
            }
          }
          .icon {
            height: 48px;
            font-size: 48px;
            color: rgba(204,204,204,.5);
            cursor: pointer;
            transition: all 0.25s ease;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default PizzaFooterIcon;
