/// <reference path="./components/button/index.tsx"/>
/// <reference path="./components/material-icon/index.tsx"/>
/// <reference path="./components/checkbox/index.tsx"/>

namespace Material {

  const {h, render} = preact;

  const App = () => {
    return (
      <div>
        <Checkbox/>
        <Button icon={<MaterialIcon icon="add"/>}>
          Hello!
        </Button>
      </div>
    );
  };

  render(<App/>, document.body, document.body.lastChild as HTMLElement);

}
