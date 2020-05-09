
/// <reference path="./debug.ts"/>

namespace Material {

  const {
    h
  } = preact;

  const {
    useRef,
    useEffect,
    useLayoutEffect
  } = preactHooks;

  const {
    MDCTabBar
  } = mdc.tabBar;

  export const Tab = ({
    className = '',
    minWidth = false,
    stacked = false,
    active = false,
    label = '',
    icon = '',
    tabindex = 0,
    ...otherProps
  }) => (
    <button className={classNames('mdc-tab', className, {
      'mdc-tab--min-width': minWidth,
      'mdc-tab--stacked': stacked,
      'mdc-tab--active': active,
    })} role="tab" aria-selected="true" tabindex={tabindex} {...otherProps}>
      <span class="mdc-tab__content">
        {icon && <span class="mdc-tab__icon material-icons" aria-hidden="true">{icon}</span>}
        <span class="mdc-tab__text-label">{label}</span>
      </span>
      <span className={classNames('mdc-tab-indicator', {
        'mdc-tab-indicator--active': active
      })}>
        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
      </span>
      <span class="mdc-tab__ripple"></span>
    </button>
  );

  export const TabBar = ({
    className = '',
    children = null,
    selectedIndex = 0,
    onChange = (e) => debug.log({e}),
    ...otherProps
  }) => {

    const elementRef = useRef(null);
    const mdcTabBarRef = useRef(null);

    useLayoutEffect(() => {
      const mdcTabBar = new MDCTabBar(elementRef.current);
      const handler = ({detail}) => onChange(detail.index);
      mdcTabBar.listen('MDCTabBar:activated', handler);
      mdcTabBarRef.current = mdcTabBar;
      return () => {
        mdcTabBarRef.current = null;
        mdcTabBar.unlisten('MDCTabBar:activated', handler);
        mdcTabBar.destroy();
      }
    }, []);

    useEffect(() => {
      const {current} = mdcTabBarRef;
      if (current) {
        current.activateTab(selectedIndex);
      }
    }, [selectedIndex]);

    return (
      <div ref={elementRef} class={classNames('mdc-tab-bar', className)} {...otherProps} role="tablist">
        <div class="mdc-tab-scroller">
          <div class="mdc-tab-scroller__scroll-area">
            <div class="mdc-tab-scroller__scroll-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

}
