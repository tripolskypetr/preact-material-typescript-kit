
/// <reference path="./drawer.tsx"/>
/// <reference path="./topAppBar.tsx"/>
/// <reference path="./iconButton.tsx"/>
/// <reference path="./debug.ts"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  export const Scaffold = ({
    children = null,
    menu = null,
    opened = false,
    title = 'TheOneKit',
    description = 'RAD for CRUD',
    onChange = (e) => debug.log({ e }),
  }) => (
      <Fragment>
        <Drawer modal={true} open={opened} onChange={onChange}>
          <DrawerContent fixed={true}>
            <DrawerHeader>
              <DrawerTitle label={title} />
              <DrawerSubtitle label={description} />
            </DrawerHeader>
            {menu}
          </DrawerContent>
        </Drawer>
        <DrawerAppContent>
          <DialogProvider>
            <TopAppBar>
              <TopBarRow>
                <TopBarSection align='start'>
                  <TopBarIcon>
                    <IconButton
                      iconOn="menu"
                      iconOff="arrow_back"
                      on={opened}
                      onChange={onChange}
                      color="white" />
                  </TopBarIcon>
                  <TopAppBarTitle label={title} />
                </TopBarSection>
              </TopBarRow>
            </TopAppBar>
            <FixedAdjust>
              {children}
            </FixedAdjust>
          </DialogProvider>
        </DrawerAppContent>
      </Fragment>
    );

}
