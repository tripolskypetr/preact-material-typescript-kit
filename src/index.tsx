
/// <reference path="./pages/app/elements/index.tsx"/>
/// <reference path="./components/index.ts"/>

namespace Material {

  const {
    h,
    render
  } = preact;

  const {
    Router
  } = preactRouter;

  const {
    useState,
  } = preactHooks;

  const Menu = ({
    onChange = (e) => debug.log({ e }),
    selectedIndex = -1,
    items = [],
  }) => (
      <List onItemClick={onChange} tabIndex={0} singleSelection={true} selectedIndex={-1}>
        {items.map((item, index) => (
          <ListItem selected={index === selectedIndex}>
            <ListItemText>
              {item}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    )

  export const App = () => {
    const [opened, setOpened] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const itemClick = (index) => {
      setSelectedIndex(index);
      setOpened(false);
      console.log(index);
    };
    return (
      <Scaffold
        opened={opened}
        onChange={setOpened}
        menu={<Menu
          items={[
            'Брифинг'
          ]}
          selectedIndex={selectedIndex}
          onChange={itemClick} />
        }>
        <Router>
          <ElementsPage default />
        </Router>
      </Scaffold>
    );
  };

  // <p default>Hello!</p>

  render(<App />, document.body, document.body.lastChild as HTMLElement);

}
