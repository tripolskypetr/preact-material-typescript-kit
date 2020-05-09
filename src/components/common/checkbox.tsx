
/// <reference path="./debug.ts"/>

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
    MDCCheckbox,
  } = mdc.checkbox;

  const {
    MDCFormField,
  } = mdc.formField;

  export const Checkbox = ({
    checked = false,
    disabled = false,
    indeterminate = false,
    className = '',
    label = '',
    onChange = (e) => debug.log({ e }),
    ...otherProps
  }) => {

    const checkBoxElement = useRef(null);
    const inputElement = useRef(null);
    const rootElement = useRef(null);

    const mdcCheckbox = useRef(null);

    const [state, setState] = useState({checked});

    useLayoutEffect(() => {
      const checkBox = new MDCCheckbox(checkBoxElement.current);
      const formField = new MDCFormField(rootElement.current);
      formField.input = checkBox;
      mdcCheckbox.current = checkBox;
      return () => {
        mdcCheckbox.current = null;
        formField.destroy();
        checkBox.destroy();
      }
    }, []);

    useEffect(() => {
      setState({ checked });
    }, [checked]);

    useEffect(() => {
      const { checked } = state;
      if (mdcCheckbox.current) {
        mdcCheckbox.current.checked = checked;
        mdcCheckbox.current.disabled = disabled;
        mdcCheckbox.current.indeterminate = indeterminate;
      }
    }, [state.checked, disabled, indeterminate]);

    const handleChange = (e) => {
      const { checked } = e.target;
      setState({ checked });
      onChange(checked);
    };

    return (
      <div ref={rootElement} className={classNames('mdc-form-field', className)} {...otherProps}>
        <div className={'mdc-checkbox'} ref={checkBoxElement}>
          <input type="checkbox"
            class="mdc-checkbox__native-control"
            ref={inputElement}
            value={state.checked}
            onChange={handleChange}
            disabled={disabled} />
          <div className='mdc-checkbox__background'>
            <svg
              className='mdc-checkbox__checkmark'
              viewBox='0 0 24 24'
              focusable='false'>
              <path
                className='mdc-checkbox__checkmark-path'
                fill='none'
                d='M1.73,12.91 8.1,19.28 22.79,4.59' />
            </svg>
            <div className='mdc-checkbox__mixedmark' />
          </div>
          <div class="mdc-checkbox__ripple"></div>
        </div>
        {label ? <label>{label}</label> : null}
      </div>
    );
  };

} // namespace Material
