import React, { Component, Fragment } from 'react';
import {
  FaEnvelope,
  FaMobileAlt,
  FaGithub,
  FaLinkedin,
  FaDownload
} from 'react-icons/fa';

import PizzaFooterLink from './PizzaFooterLink';

const footerLinksData = [
  {
    title: 'Email me',
    href: 'mailto:mindevieras@gmail.com',
    icon: <FaEnvelope />
  },
  {
    title: 'Phone me',
    href: 'tel:+447743499249',
    icon: <FaMobileAlt />
  },
  {
    title: 'GitHub',
    href: 'https://www.github.com/MindeVieras',
    icon: <FaGithub />,
    target: '_blank'
  },
  {
    title: 'LinkedIn',
    href: 'https://gb.linkedin.com/in/minde-vieras-3a4637129',
    icon: <FaLinkedin />,
    target: '_blank'
  },
  {
    title: 'Download CV',
    href: '/cv/CV-Minde-Vieras.pdf',
    icon: <FaDownload />,
    target: '_blank'
  }
];

class PizzaFooter extends Component {
  render() {
    const footerLinks = footerLinksData.map((l, i) => (
      <PizzaFooterLink key={i} {...l} />
    ));

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
  }
}

export default PizzaFooter;
