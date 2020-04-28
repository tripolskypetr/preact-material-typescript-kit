namespace Material {

  const {
    h
  } = preact;

  const {
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
  } = preactHooks;

  const {
    MDCSwitch
  } = mdc.switchControl;

  export const Switch = ({
    className = '',
    checked = false,
    disabled = false,
    ...otherProps
  }) => {

    const [state, setState] = useState({checked, disabled});
    const rootElement = useRef(null);
    const mdcSwitch = useRef(null);

    useLayoutEffect(() => {
      mdcSwitch.current = new MDCSwitch(rootElement.current);
      return () => mdcSwitch.current = null;
    }, []);

    useEffect(() => {
      const {checked, disabled} = state;
      if (mdcSwitch.current) {
        mdcSwitch.current.checked = checked;
        mdcSwitch.current.disabled = disabled;
      }
    }, [state.checked, state.disabled]);

    return (
      <div ref={rootElement} className={classNames('mdc-form-field', className)} {...otherProps}>
        <div class="mdc-switch">
          <div class="mdc-switch__track"></div>
          <div class="mdc-switch__thumb-underlay">
            <div class="mdc-switch__thumb"></div>
            <input type="checkbox" disabled={state.disabled} checked={state.checked} class="mdc-switch__native-control" role="switch" aria-checked="false"/>
          </div>
        </div>
        <label>off/on</label>
      </div>
    );
  }

}