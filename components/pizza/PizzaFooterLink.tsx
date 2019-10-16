import React, { Component, Fragment } from 'react';

import Icon from '../Icon';

export interface PizzaFooterLinkProps {
  target?: string;
  title: string;
  href: string;
  icon: string;
  weight: number;
}

class PizzaFooterIcon extends Component<PizzaFooterLinkProps> {
  render() {
    const { title, href, icon, target } = this.props;

    return (
      <Fragment>
        <a href={href} target={target} title={title} className="footer-link">
          <div className="icon">
            <Icon icon={icon} />
          </div>
        </a>

        <style jsx>{`
          a {
            margin: 0 10px;
          }
          a:focus {
            outline: 0;
          }
          a:hover .icon,
          a:focus .icon {
              color: rgba(200,200,200,.9);
            }
          }
          .icon {
            font-size: 48px;
            color: rgba(204,204,204,.5);
            line-height: 1;
            cursor: pointer;
            transition: all 0.25s ease;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default PizzaFooterIcon;
