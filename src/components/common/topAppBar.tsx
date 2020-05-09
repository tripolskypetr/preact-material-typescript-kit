
/// <reference path="./withType.tsx"/>
/// <reference path="./debug.ts"/>

namespace Material {

  const {
    cloneElement,
    createElement,
  } = preact;

  const {
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
  } = preactHooks;

  const {
    MDCTopAppBar,
  } = mdc.topAppBar;

  const {
    style
  } = typestyle;

  namespace Internal {

    const cssClasses = {
      BASE: 'mdc-top-app-bar',
      ROW: `mdc-top-app-bar__row`,
      SECTION: 'mdc-top-app-bar__section',
      SECTION_START: `mdc-top-app-bar__section--align-start`,
      SECTION_CENTER: `mdc-top-app-bar__section--align-center`,
      SECTION_END: `mdc-top-app-bar__section--align-end`,
      FIXED: `mdc-top-app-bar--fixed`,
      SHORT: `mdc-top-app-bar--short`,
      SHORT_COLLAPSED: `mdc-top-app-bar--short-collapsed`,
      PROMINENT: `$mdc-top-app-bar--prominent`,
      DENSE: `mdc-top-app-bar--dense`,
      DENSE_PROMINENT: `mdc-top-app-bar-dense-prominent`,
      TITLE: `mdc-top-app-bar__title`,
      ACTION_ITEM: `mdc-top-app-bar__action-item`,
      NAV_ICON: `mdc-top-app-bar__navigation-icon`,
    };

    export const TopAppBar = ({
      className = '',
      dense = false,
      fixed = false,
      prominent = false,
      short = false,
      shortCollapsed = false,
      tag = 'header',
      children = null,
      scrollTarget = null,
      onNavIconClicked = (e) => debug.log({e}),
      ...otherProps
    }) => {

      const elementRef = useRef(null);
      const mdcTopAppBarRef = useRef(null);

      useLayoutEffect(() => {
        const mdcTopAppBar = new MDCTopAppBar(elementRef.current);
        mdcTopAppBarRef.current = mdcTopAppBar;
        if (scrollTarget) {
          mdcTopAppBar.setScrollTarget(scrollTarget);
        }
        return () => {
          mdcTopAppBarRef.current = null;
          mdcTopAppBar.destroy();
        };
      });

      const classes = () => classNames(cssClasses.BASE, className, {
        [cssClasses.FIXED]: fixed,
        [cssClasses.SHORT]: shortCollapsed || short,
        [cssClasses.SHORT_COLLAPSED]: shortCollapsed,
        [cssClasses.PROMINENT]: prominent,
        [cssClasses.DENSE]: dense,
      });

      return createElement(tag, {
        ref: elementRef,
        className: classes(),
        children,
        ...otherProps
      });
    };

    export const TopBarIcon = ({
      className = '',
      children = null,
      actionItem = false,
      navIcon = false,
      ripple = false,
      ...otherProps
    }) => cloneElement(children, {
      ...otherProps,
      className: classNames(className, children?.props?.className, {
        [cssClasses.ACTION_ITEM]: actionItem,
        [cssClasses.NAV_ICON]: navIcon,
        'mdc-ripple-surface': ripple,
      })
    });

    export const TopBarRow = ({
      children = null,
      className = '',
      tag = 'div',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(className, cssClasses.ROW),
      ...otherProps
    }, children);

    export const TopBarSection = ({
      align = 'start',
      className = '',
      children = null,
      tag = 'section',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(className, cssClasses.SECTION, {
        [cssClasses.SECTION_START]: align === 'start',
        [cssClasses.SECTION_CENTER]: align === 'center',
        [cssClasses.SECTION_END]: align === 'end',
      }),
      ...otherProps
    }, children);

    export const TopAppBarTitle = ({
      label = '',
      className = '',
      tag = 'span',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(className, cssClasses.TITLE),
      ...otherProps
    }, label);

    export const FixedAdjust = ({
      tag = 'main',
      children = null,
      className = '',
      dense = false,
      prominent = false,
      short = false,
      ...otherProps
    }) => {
      const suffix = '-fixed-adjust';
      const classes = () => classNames(className, {
        [cssClasses.SHORT + suffix]: short,
        [cssClasses.DENSE + suffix]: dense && !prominent,
        [cssClasses.DENSE_PROMINENT + suffix]: dense && prominent,
        [cssClasses.PROMINENT + suffix]: !dense && prominent,
        ['mdc-top-app-bar-' + suffix]: !short && !dense && !prominent,
      });
      return createElement(tag, {
        className: classes(),
        ...otherProps
      }, children);
    };

    export type TopAppBarProps = Parameters<typeof TopAppBar>[0];
    export type TopBarIconProps = Parameters<typeof TopBarIcon>[0];
    export type TopBarSectionProps = Parameters<typeof TopBarSection>[0];
  };

  interface TopAppBarProps extends Internal.TopAppBarProps {
    scrollTarget?: HTMLElement;
  }

  interface TopBarSectionProps extends Internal.TopBarSectionProps {
    align?: 'start' | 'end' | 'center';
  }

  export const TopBarIcon = withRipple<Internal.TopBarIconProps>(Internal.TopBarIcon);
  export const TopBarSection = withType<TopBarSectionProps>(Internal.TopBarSection);
  export const TopAppBar = withType<TopAppBarProps>(Internal.TopAppBar);
  export const TopAppBarTitle = Internal.TopAppBarTitle;
  export const FixedAdjust = Internal.FixedAdjust;
  export const TopBarRow = Internal.TopBarRow;

}
