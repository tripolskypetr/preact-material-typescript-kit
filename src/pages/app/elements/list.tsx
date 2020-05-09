
/// <reference path="../../../components/index.ts"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  export namespace Elements {

    export const List = () => (
      <Fragment>
        <ListGroup>
          <ListGroupSubheader>Single line list</ListGroupSubheader>
          <Material.List>
            {[...new Array(3)].map(() => (
              <ListItem>
                <ListItemText>Hello</ListItemText>
              </ListItem>
            ))}
            <ListDivider/>
          </Material.List>
        </ListGroup>
        <ListGroup>
          <ListGroupSubheader>Two line list</ListGroupSubheader>
          <Material.List twoLine={true}>
            {[...new Array(3)].map(() => (
              <ListItem>
                <ListItemText primaryText="Hello" secondaryText="world"/>
              </ListItem>
            ))}
            <ListDivider/>
          </Material.List>
        </ListGroup>
        <ListGroup>
          <ListGroupSubheader>List with Meta (Selectable)</ListGroupSubheader>
          <Material.List singleSelection={true} selectedIndex={-1}>
            {[...new Array(3)].map((index) => (
              <ListItem tabIndex={index}>
                <ListItemText>
                  Hello
                </ListItemText>
                <ListItemMeta>
                  <Icon icon="cloud"/>
                </ListItemMeta>
              </ListItem>
            ))}
            <ListDivider/>
          </Material.List>
        </ListGroup>
        <ListGroup>
          <ListGroupSubheader>List with graphic</ListGroupSubheader>
          <Material.List>
            {[...new Array(3)].map(() => (
              <ListItem>
                <ListItemGraphic>
                  <Material.Radio name="list-radio"/>
                </ListItemGraphic>
                <ListItemText>
                  Hello
                </ListItemText>
              </ListItem>
            ))}
            <ListDivider/>
          </Material.List>
        </ListGroup>
      </Fragment>
    );

  }

}
