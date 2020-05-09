
/// <reference path="./checkBox.tsx"/>
/// <reference path="./radio.tsx"/>
/// <reference path="./textField.tsx"/>
/// <reference path="./other.tsx"/>
/// <reference path="./select.tsx"/>
/// <reference path="./layout.tsx"/>
/// <reference path="./snackbar.tsx"/>
/// <reference path="./typography.tsx"/>
/// <reference path="./list.tsx"/>
/// <reference path="./menu.tsx"/>
/// <reference path="./dialog.tsx"/>
/// <reference path="./tabBar.tsx"/>

namespace Material {

  const {
    h,
    Fragment,
  } = preact;

  export const ElementsPage = () => (
    <Fragment>
      <Elements.CheckBox />
      <Elements.Radio />
      <Elements.TextField />
      <Elements.Select />
      <Elements.Layout />
      <Elements.Other />
      <Elements.Menu />
      <Elements.Snackbar />
      <Elements.Dialog />
      <Elements.List />
      <Elements.TabBar />
      <Elements.Typography />
    </Fragment>
  );

}
