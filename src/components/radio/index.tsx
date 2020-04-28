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
    MDCRadio
  } = mdc.radio;

  const {
    MDCFormField
  } = mdc.formField;

  export const Radio = ({
    className = '',
    checked = false,
    disabled = false,
    value = '',
    name = '',
    label = '',
    ...otherProps
  }) => {

    const radioElement = useRef(null);
    const rootElement = useRef(null);
    const mdcRadio = useRef(null);

    const [state, setState] = useState({
      checked, disabled, value
    });

    useLayoutEffect(() => {
      const checkBox = new MDCRadio(radioElement.current);
      const formField = new MDCFormField(rootElement.current);
      formField.input = checkBox;
      mdcRadio.current = checkBox;
      return () => mdcRadio.current = null;
    }, []);

    useEffect(() => {
      setState({checked, value, disabled});
    }, [checked, value, disabled]);

    useEffect(() => {
      const {checked, value, disabled} = state;
      if (mdcRadio.current) {
        mdcRadio.current.disabled = disabled;
        mdcRadio.current.checked = checked;
        mdcRadio.current.value = value;
      }
    }, [state.checked, state.value, state.disabled]);

    return (
      <div ref={rootElement} className={classNames('mdc-form-field', className)} {...otherProps}>
        <div className='mdc-radio' ref={radioElement}>
          <input type='radio' name={name} className='mdc-radio__native-control'/>
          <div className='mdc-radio__background'>
            <div className='mdc-radio__outer-circle' />
            <div className='mdc-radio__inner-circle' />
          </div>
          <div class="mdc-radio__ripple"></div>
        </div>
        {label ? <label>{label}</label> : null}
      </div>
    );
  }

} // namespace Material
