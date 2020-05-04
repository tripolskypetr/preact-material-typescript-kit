
/// <reference path="../components/index.ts"/>

namespace Material {

  const {
    h
  } = preact;

  export const TabBarPage = () => (
    <TabBar selectedIndex={0}>
      <Tab tabindex={0} icon="access_time" label="Recents"/>
      <Tab tabindex={1} icon="favorite" label="Favorites"/>
      <Tab tabindex={2} icon="near_me" label="Nearby"/>
    </TabBar>
  );

}
