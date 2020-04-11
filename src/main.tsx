/// <reference path="./components/TopAppBar.tsx"/>

namespace Material {

  const {h, render} = preact;

  const {TopBar, TopBarTitle, TopBarSection, TopBarSectionAlign} = TopAppBar;

  const App = () => (
    <TopBar>
      <TopBarSection align={TopBarSectionAlign.Start}>
        <TopBarTitle label="Material"/>
      </TopBarSection>
    </TopBar>
  );

  render(<App/>, document.body, document.body.lastChild as HTMLElement);

}
