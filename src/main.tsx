/// <reference path="./components/Counter.tsx"/>

namespace Material {

  const {h, render} = preact;

  /*class Something extends preact.Component {
    render() {
      return <p>hello</p>
    }
  }*/

  render(<Counter/>, document.body, document.body.lastChild as HTMLElement);

}
