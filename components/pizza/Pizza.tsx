import Footer from './PizzaFooter';

export default function Pizza() {
  return (
    <div id="pizza_wrapper">
      <svg
        id="pizza_svg"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* {{> pizza/center}} */}
      </svg>

      <Footer />

      {/* {{#each sections}} */}
      {/* <dialog>{{> pizza/modal}}</dialog> */}
      {/* {{/each}} */}
      <style jsx global>{`
        body {
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
