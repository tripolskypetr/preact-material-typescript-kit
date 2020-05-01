
/// <reference path="./pages/checkBoxPage.tsx"/>
/// <reference path="./pages/radioPage.tsx"/>
/// <reference path="./pages/textFieldPage.tsx"/>

namespace Material {

  const {
    h,
    render,
    Fragment,
  } = preact;

  const App = () => (
    <Fragment>
      <CheckBoxPage/>
      <RadioPage/>
      <TextFieldPage/>
    </Fragment>
  );

  render(<App/>, document.body, document.body.lastChild as HTMLElement);

}
