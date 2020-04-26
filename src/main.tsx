/// <reference path="./components/button/index.tsx"/>
/// <reference path="./components/material-icon/index.tsx"/>

namespace Material {

  const {h, render} = preact;

  const App = () => {
    return (
      <Button icon={<MaterialIcon hasRipple={true} icon="add"/>} onClick={(e) => console.log(e)}>
        Hello!
      </Button>
    );
  };

  render(<App/>, document.body, document.body.lastChild as HTMLElement);

}
