
/// <reference path="./debug.ts"/>

namespace Material {

  const {
    h
  } = preact;

  const {
    style
  } = typestyle;

  const {
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
  } = preactHooks;

  const {
    MDCSwitch,
  } = mdc.switchControl;

  const {
    MDCFormField,
  } = mdc.formField;

  const switchPaddingFix = style({
    padding: '11px',
  });

  export const Switch = ({
    className = '',
    label = '',
    checked = false,
    disabled = false,
    onChange = (e) => debug.log({e}),
    ...otherProps
  }) => {

    const [state, setState] = useState({checked});
    const switchElement = useRef(null);
    const rootElement = useRef(null);
    const mdcSwitch = useRef(null);

    useLayoutEffect(() => {
      const form = new MDCFormField(rootElement.current);
      const sw = new MDCSwitch(switchElement.current);
      form.input = sw;
      mdcSwitch.current = sw;
      return () => {
        mdcSwitch.current = null;
        form.destroy();
        sw.destroy()
      };
    }, []);

    useEffect(() => setState({checked}), [checked]);

    useEffect(() => {
      const {checked} = state;
      if (mdcSwitch.current) {
        mdcSwitch.current.checked = checked;
        mdcSwitch.current.disabled = disabled;
      }
    }, [state.checked, disabled]);

    const handler = () => {
      const checked = !state.checked;
      setState({checked});
      onChange(checked);
    };

    return (
      <div ref={rootElement} className={classNames('mdc-form-field', className)} {...otherProps}>
        <div className={switchPaddingFix}>
          <div ref={switchElement} className="mdc-switch">
            <div class="mdc-switch__track"></div>
            <div class="mdc-switch__thumb-underlay">
              <div class="mdc-switch__thumb"></div>
              <input type="checkbox" onChange={handler} disabled={disabled} checked={state.checked} class="mdc-switch__native-control" role="switch" aria-checked="false"/>
            </div>
          </div>
        </div>
        {label ? <label class={switchPaddingFix}>{label}</label> : null}
      </div>
    );
  }

}