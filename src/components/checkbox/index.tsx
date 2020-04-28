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

  const {
    withRipple
  } = Common;

  namespace Internal {

    export const CheckBox = ({
      checked = false,
      disabled = false,
      indeterminate = false,
      className = '',
      label = '',
      onChange = (e) => console.log({e}),
      ...otherProps
    }) => {

      const checkBoxElement = useRef(null);
      const inputElement = useRef(null);
      const rootElement = useRef(null);

      const mdcCheckbox = useRef(null);

      const [state, setState] = useState({
        checked, indeterminate, disabled
      });

      useLayoutEffect(() => {
        const checkBox = new MDCCheckbox(checkBoxElement.current);
        const formField = new MDCFormField(rootElement.current);
        formField.input = checkBox;
        mdcCheckbox.current = checkBox;
        return () => mdcCheckbox.current = null;
      }, []);

      useEffect(() => {
        setState({checked, disabled, indeterminate});
        inputElement.current.indeterminate = indeterminate;
      }, [checked, disabled, indeterminate]);

      useEffect(() => {
        const {checked, disabled, indeterminate} = state;
        if (mdcCheckbox.current) {
          mdcCheckbox.current.checked = checked;
          mdcCheckbox.current.disabled = disabled;
          mdcCheckbox.current.indeterminate = indeterminate;
        }
      }, [state.checked, state.disabled, state.indeterminate]);

      const handleChange = (e) => {
        const {checked, indeterminate} = e.target;
        setState({checked, indeterminate, disabled});
        inputElement.current.indeterminate = indeterminate;
        onChange(e);
      };

      return (
        <div ref={rootElement} className={classNames('mdc-form-field', className)} {...otherProps}>
          <div className={'mdc-checkbox'} ref={checkBoxElement}>
            <input type="checkbox"
              class="mdc-checkbox__native-control"
              ref={inputElement}
              value={state.checked}
              onChange={handleChange}
              disabled={state.disabled} />
            <div className='mdc-checkbox__background'>
              <svg
                className='mdc-checkbox__checkmark'
                viewBox='0 0 24 24'
                focusable='false'>
                <path
                  className='mdc-checkbox__checkmark-path'
                  fill='none'
                  d='M1.73,12.91 8.1,19.28 22.79,4.59'/>
              </svg>
              <div className='mdc-checkbox__mixedmark' />
            </div>
            <div class="mdc-checkbox__ripple"></div>
          </div>
          {label ? <label>{label}</label> : null}
        </div>
      );
    };

  } // namespace Internal

  export const Checkbox = Internal.CheckBox;

} // namespace Material
