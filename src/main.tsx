
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

  const {
    useState
  } = preactHooks;

  const App = () => {
    const [drawerOpened, setDrawerOpened] = useState(false);
    return (
      <Fragment>
        <Drawer open={drawerOpened} onChange={setDrawerOpened}>
        </Drawer>
        <DrawerAppContent>
          <TopAppBar>
            <TopBarRow>
              <TopBarSection align='start'>
                <TopBarIcon>
                  <IconButton
                    iconOn="menu"
                    iconOff="arrow_back"
                    on={drawerOpened}
                    onChange={setDrawerOpened}
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
        </DrawerAppContent>
      </Fragment>
    );
  }

  render(<App/>, document.body, document.body.lastChild as HTMLElement);

}
