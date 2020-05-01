
/// <reference path="./pages/checkBoxPage.tsx"/>
/// <reference path="./pages/radioPage.tsx"/>
/// <reference path="./pages/textFieldPage.tsx"/>
/// <reference path="./pages/otherPage.tsx"/>
/// <reference path="./pages/selectPage.tsx"/>

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
      <SelectPage/>
      <OtherPage/>
    </Fragment>
  );

  render(<App/>, document.body, document.body.lastChild as HTMLElement);

}
