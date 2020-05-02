namespace Material {

  const {
    h,
    Fragment,
    createElement,
  } = preact;

  const {
    useRef,
    useEffect,
    useLayoutEffect,
  } = preactHooks;

  const {
    MDCDrawer
  } = mdc.drawer;

  const cssClasses = {
    BASE: 'mdc-drawer',
    OPEN: 'mdc-drawer--open',
    SCRIM: 'mdc-drawer-scrim',
    MODAL: 'mdc-drawer--modal',
    TITLE: 'mdc-drawer__title',
    HEADER: 'mdc-drawer__header',
    SUBTITLE: 'mdc-drawer__subtitle',
    APP_CONTENT: 'mdc-drawer-app-content',
    DRAWER_CONTENT: 'mdc-drawer__content',
    DISMISSIBLE: 'mdc-drawer--dismissible',
  };

  const DefaultContent = () => (
    <Fragment>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle label='Default title' />
          <DrawerSubtitle label='Default subtitle' />
        </DrawerHeader>
      </DrawerContent>
    </Fragment>
  );

  export const Drawer = ({
    className = '',
    children = h(DefaultContent, null),
    open = false,
    onChange = (e) => console.log({ e }),
    tag = 'aside',
    modal = false,
    ...otherProps
  }) => {

    const mdcDrawerRef = useRef(null);
    const elementRef = useRef(null);

    useLayoutEffect(() => {
      const mdcDrawer = new MDCDrawer(elementRef.current);
      const changeHandler = () => onChange(mdcDrawer.open);
      mdcDrawer.listen('MDCDrawer:opened', changeHandler);
      mdcDrawer.listen('MDCDrawer:closed', changeHandler);
      mdcDrawerRef.current = mdcDrawer;
      return () => {
        mdcDrawerRef.current = null;
        mdcDrawer.unlisten('MDCDrawer:opened', changeHandler);
        mdcDrawer.unlisten('MDCDrawer:closed', changeHandler);
        mdcDrawer.destroy();
      };
    }, [modal]);

    const classes = () => classNames(cssClasses.BASE, className, {
      [cssClasses.DISMISSIBLE]: !modal,
      [cssClasses.MODAL]: modal,
    });

    useEffect(() => {
      const { current } = mdcDrawerRef;
      if (current) {
        current.open = open;
      }
    }, [open]);

    return createElement(Fragment, null, [
      createElement(tag, {
        className: classes(),
        ref: elementRef,
        ...otherProps
      }, children),
      modal && createElement('div', {
        className: cssClasses.SCRIM,
      }),
    ]);

  };

  export const DrawerAppContent = ({
    tag = 'div',
    children = null,
    className = '',
    ...otherProps
  }) => createElement(tag, {
    className: classNames(cssClasses.APP_CONTENT, className),
    ...otherProps
  }, children);

  export const DrawerContent = ({
    tag = 'div',
    children = null,
    className = '',
    ...otherProps
  }) => createElement(tag, {
    className: classNames(cssClasses.DRAWER_CONTENT, className),
    ...otherProps
  }, children);

  export const DrawerHeader = ({
    tag = 'div',
    children = null,
    className = '',
    ...otherProps
  }) => createElement(tag, {
    className: classNames(cssClasses.HEADER, className),
    ...otherProps
  }, children);

  export const DrawerTitle = ({
    tag = 'h3',
    label = 'Title',
    className = '',
    ...otherProps
  }) => createElement(tag, {
    className: classNames(cssClasses.TITLE, className),
    ...otherProps
  }, label);

  export const DrawerSubtitle = ({
    tag = 'h6',
    label,
    className = '',
    ...otherProps
  }) => createElement(tag, {
    className: classNames(cssClasses.SUBTITLE, className),
    ...otherProps
  }, label);

}
