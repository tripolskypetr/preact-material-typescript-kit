
/// <reference path="./debug.ts"/>

namespace Material {

  const {
    h,
    createElement
  } = preact;

  const {
    useRef,
    useEffect,
    useLayoutEffect
  } = preactHooks;

  const {
    MDCMenu
  } = mdc.menu;

  namespace Internal {

    const DefaultContent = () => (
      <ListItem>
        <ListItemText>Default menu item</ListItemText>
      </ListItem>
    );

    export const MenuAnchor = ({
      className = '',
      tag = 'div',
      children = null,
      ...otherProps
    }) => createElement(tag, {
      className: classNames('mdc-menu-surface--anchor', className),
      ...otherProps
    }, children);

    export const Menu = ({
      className = '',
      open = false,
      children = h(DefaultContent, null),
      onChange = (e) => debug.log({e}),
      ...otherProps
    }) => {

      const elementRef = useRef(null);
      const mdcMenuRef = useRef(null);

      useLayoutEffect(() => {
        const mdcMenu = new MDCMenu(elementRef.current);
        const handler = ({detail}) => onChange(detail.index);
        mdcMenu.listen('MDCMenu:selected', handler);
        mdcMenuRef.current = mdcMenu;
        return () => {
          mdcMenuRef.current = null;
          mdcMenu.unlisten('MDCMenu:selected', handler);
          mdcMenu.destroy();
        };
      }, []);

      useEffect(() => {
        const {current} = mdcMenuRef;
        if (current) {
          current.open = open;
        }
      }, [open]);

      return (
        <div ref={elementRef} class={classNames('mdc-menu', 'mdc-menu-surface', className)} {...otherProps}>
          <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
            {children}
          </ul>
        </div>
      );
    };

  }

  export const MenuAnchor = Internal.MenuAnchor;
  export const Menu = Internal.Menu;

}
