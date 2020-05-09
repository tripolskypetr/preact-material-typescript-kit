
/// <reference path="../../../components/index.ts"/>

namespace Material {

  const {
    h
  } = preact;

  const {
    useState,
  } = preactHooks;

  export namespace Elements {

    export const Menu = () => {
      const [opened, setOpened] = useState(false);
      return (
        <MenuAnchor>
          <Button onClick={() => setOpened(!opened)} label={`Menu (opened: ${opened ? 'true' : 'false'})`}/>
          <Material.Menu open={opened} style={{marginTop: '36px'}}>
            <ListItem>
              <ListItemGraphic>
                <Icon icon="cloud"/>
              </ListItemGraphic>
              <ListItemText>
                Just like list
              </ListItemText>
            </ListItem>
          </Material.Menu>
        </MenuAnchor>
      )
    };

  }

}
