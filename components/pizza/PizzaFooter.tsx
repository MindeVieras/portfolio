import React, { Component, Fragment } from 'react';

import PizzaFooterLink, { PizzaFooterLinkProps } from './PizzaFooterLink';

interface FooterProps {
  links: PizzaFooterLinkProps[];
}

const PizzaFooter = (props: FooterProps): JSX.Element => {
  const { links } = props;

  const footerLinks = links
    // Sort array by link weight.
    .sort((a, b) => a.weight - b.weight)
    // Then return all links as PizzaFooterLink component.
    .map((l, i) => <PizzaFooterLink key={i} {...l} />);

  return (
    <Fragment>
      <footer>{footerLinks}</footer>

      <style jsx>{`
        footer {
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 8px;
          left: 0;
          width: 100%;
        }
      `}</style>
    </Fragment>
  );
};

export default PizzaFooter;
