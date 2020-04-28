namespace Material {

  const {
    h
  } = preact;

  const {
    useRef,
    useState,
    useEffect,
    useCallback,
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
    onChange = (e) => console.log({e}),
    ...otherProps
  }) => {

    const radioElement = useRef(null);
    const rootElement = useRef(null);
    const mdcRadio = useRef(null);

    useLayoutEffect(() => {
      const checkBox = new MDCRadio(radioElement.current);
      const formField = new MDCFormField(rootElement.current);
      formField.input = checkBox;
      mdcRadio.current = checkBox;
      return () => mdcRadio.current = null;
    }, []);

    return (
      <div ref={rootElement} className={classNames('mdc-form-field', className)} {...otherProps}>
        <div className='mdc-radio' ref={radioElement}>
          <input type='radio'
            value={value}
            checked={checked}
            disabled={disabled}
            name={name}
            onChange={onChange}
            className='mdc-radio__native-control'/>
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
