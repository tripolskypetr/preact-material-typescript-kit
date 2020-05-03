namespace Material {

  const {
    h,
    Fragment
  } = preact;

  export const ListPage = () => (
    <Fragment>
      <ListGroup>
        <ListGroupSubheader>Single line list</ListGroupSubheader>
        <List>
          {[...new Array(3)].map(() => (
            <ListItem>
              <ListItemText>Hello</ListItemText>
            </ListItem>
          ))}
          <ListDivider/>
        </List>
      </ListGroup>
      <ListGroup>
        <ListGroupSubheader>Two line list</ListGroupSubheader>
        <List twoLine={true}>
          {[...new Array(3)].map(() => (
            <ListItem>
              <ListItemText primaryText="Hello" secondaryText="world"/>
            </ListItem>
          ))}
          <ListDivider/>
        </List>
      </ListGroup>
      <ListGroup>
        <ListGroupSubheader>List with graphic</ListGroupSubheader>
        <List>
          {[...new Array(3)].map(() => (
            <ListItem>
              <ListItemGraphic>
                <Radio name="list-radio"/>
              </ListItemGraphic>
              <ListItemText>
                Hello
              </ListItemText>
            </ListItem>
          ))}
          <ListDivider/>
        </List>
      </ListGroup>
      <ListGroup>
        <ListGroupSubheader>List with Meta (Selectable)</ListGroupSubheader>
        <List singleSelection={true} selectedIndex={-1}>
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
        </List>
      </ListGroup>
    </Fragment>
  );

}