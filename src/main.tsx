
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
      <TopAppBar>
        <TopBarRow>
          <TopBarSection align='start'>
            <TopBarIcon>
              <IconButton
                iconOn="menu"
                iconOff="arrow_back"
                color="white"/>
            </TopBarIcon>
            <TopAppBarTitle label='Hello!'/>
          </TopBarSection>
        </TopBarRow>
      </TopAppBar>
      <FixedAdjust>
        <CheckBoxPage/>
        <RadioPage/>
        <TextFieldPage/>
        <SelectPage/>
        <OtherPage/>
      </FixedAdjust>
    </Fragment>
  );

  render(<App/>, document.body, document.body.lastChild as HTMLElement);

}
