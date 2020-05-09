
/// <reference path="./withType.tsx"/>
/// <reference path="./debug.ts"/>

namespace Material {

  const {
    createElement,
  } = preact;

  const {
    MDCList,
  } = mdc.list;

  const {
    useRef,
    useEffect,
    useLayoutEffect,
  } = preactHooks;

  namespace Internal {

    const cssClasses = {
      LIST_GROUP_SUBHEADER: 'mdc-list-group__subheader',
      SECONDARY_TEXT: 'mdc-list-item__secondary-text',
      LIST_ITEM_ACTIVATED: 'mdc-list-item--activated',
      LIST_ITEM_SELECTED: 'mdc-list-item--selected',
      LIST_ITEM_DISABLED: 'mdc-list-item--disabled',
      NON_INTERACTIVE: 'mdc-list--non-interactive',
      PRIMARY_TEXT: 'mdc-list-item__primary-text',
      AVATAR_LIST: 'mdc-list--avatar-list',
      GRAPHIC: 'mdc-list-item__graphic',
      TWO_LINE: 'mdc-list--two-line',
      LIST_GROUP: 'mdc-list-group',
      TEXT: 'mdc-list-item__text',
      META: 'mdc-list-item__meta',
      DIVIDER: 'mdc-list-divider',
      LIST_ITEM: 'mdc-list-item',
      DENSE: 'mdc-list--dense',
      BASE: 'mdc-list',
    };

    export const List = ({
      className = '',
      nonInteractive = false,
      dense = false,
      avatarList = false,
      twoLine = false,

      singleSelection = false,
      selectedIndex = -1,
      wrapFocus = true,
      vertical = true,

      onItemClick = (e) => debug.log({e}),
      role = 'list',
      tag = 'ul',
      ...otherProps
    }) => {

      const elementRef = useRef(null);
      const mdcListRef = useRef(null);

      useLayoutEffect(() => {
        const mdcList = new MDCList(elementRef.current);
        const handler = ({detail}) => onItemClick(detail.index);
        mdcListRef.current = mdcList;
        mdcList.listen('MDCList:action', handler);
        return () => {
          mdcListRef.current = null;
          mdcList.unlisten('MDCList:action', handler);
          mdcList.destroy();
        }
      }, [nonInteractive, avatarList, twoLine, dense]);

      useEffect(() => {
        const {current} = mdcListRef;
        if (current) {
          current.vertical = vertical;
          current.wrapFocus = wrapFocus;
          current.selectedIndex = selectedIndex;
          current.singleSelection = singleSelection;
        }
      }, [vertical, wrapFocus, selectedIndex, singleSelection]);

      const classes = () => classNames(cssClasses.BASE, className, {
        [cssClasses.NON_INTERACTIVE]: nonInteractive,
        [cssClasses.AVATAR_LIST]: avatarList,
        [cssClasses.TWO_LINE]: twoLine,
        [cssClasses.DENSE]: dense,
      });

      return createElement(tag, {
        className: classes(),
        ref: elementRef,
        role,
        ...otherProps
      });
    };

    export const ListDivider = ({
      tag = 'li',
      className = '',
      role = 'separator',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(cssClasses.DIVIDER, className),
      role,
      ...otherProps
    });

    export const ListGroup = ({
      tag = 'div',
      className = '',
      children = null,
      ...otherProps
    }) => createElement(tag, {
      className: classNames(cssClasses.LIST_GROUP, className),
      ...otherProps
    }, children);

    export const ListGroupSubheader = ({
      tag = 'h3',
      className = '',
      children = null,
      ...otherProps
    }) => createElement(tag, {
      className: classNames(cssClasses.LIST_GROUP_SUBHEADER, className),
      ...otherProps
    }, children);

    export const ListItemGraphic = ({
      className = '',
      children = null,
      tag = 'span',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(cssClasses.GRAPHIC, className),
      ...otherProps,
    }, children);

    export const ListItemMeta = ({
      className = '',
      children = null,
      tag = 'div',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(cssClasses.META, className),
      ...otherProps,
    }, children);

    export const ListItemText = ({
      secondaryText = '',
      primaryText = '',
      children = null,
      className = '',
      tag = 'span',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(cssClasses.TEXT, className),
      ...otherProps,
    }, [
      primaryText && createElement(tag, {
        className: classNames(cssClasses.PRIMARY_TEXT)
      }, primaryText),
      secondaryText && createElement(tag, {
        className: classNames(cssClasses.SECONDARY_TEXT)
      }, secondaryText),
      children,
    ]);

    export const ListItem = ({
      tag = 'li',
      className = '',
      children = null,
      activated = false,
      selected = false,
      disabled = false,
      tabIndex = -1,
      role = 'listitem',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(cssClasses.LIST_ITEM, {
        [cssClasses.LIST_ITEM_ACTIVATED]: activated,
        [cssClasses.LIST_ITEM_SELECTED]: selected,
        [cssClasses.LIST_ITEM_DISABLED]: disabled,
      }, className),
      tabIndex,
      role,
      ...otherProps
    }, children);

    export type ListProps = Parameters<typeof List>[0];
    export type ListItemProps = Parameters<typeof ListItem>[0];

  }

  interface ListProps extends Internal.ListProps {
    role?: 'radiogroup' | 'listbox' | 'list' | 'menu';
  }

  interface ListItemProps extends Internal.ListItemProps {
    role?: 'separator' | 'option' | 'radio' | 'checkbox'
  }

  export const ListItem = Internal.ListItem;
  export const ListGroup = Internal.ListGroup;
  export const ListDivider = Internal.ListDivider;
  export const ListItemMeta = Internal.ListItemMeta;
  export const ListItemText = Internal.ListItemText;
  export const List = withType<ListProps>(Internal.List);
  export const ListItemGraphic = Internal.ListItemGraphic;
  export const ListGroupSubheader = Internal.ListGroupSubheader;

}
