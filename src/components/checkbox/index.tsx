
/// <reference path="../_common/withRipple.tsx"/>

namespace Material {

  const {
    h
  } = preact;

  const {
    useRef,
    useState,
    useEffect,
  } = preactHooks;

  const {
    MDCCheckboxFoundation,
  } = mdc.checkbox;

  const {
    withRipple
  } = Common;

  namespace Internal {

    export const CheckBox = ({
      checked = false,
      disabled = false,
      indeterminate = true,
      className = '',
      onChange = (e) => console.log({e}),
      ...otherProps
    }) => {

      const [classList, setClassList] = useState(new Set());

      const checkBoxElement = useRef(null);
      const inputElement = useRef(null);
      const rootElement = useRef(null);
      let foundation = null;

      const [state, setState] = useState({
        checked, indeterminate, disabled
      });

      const updateState = (key: 'checked' | 'indeterminate' | 'disabled', value) => {
        if (['checked', 'indeterminate', 'disabled'].includes(key)) {
          setState((prevState) => ({
            ...prevState,
            [key]: value,
          }));
        }
      };

      useEffect(() => {
        foundation = new MDCCheckboxFoundation({
          addClass: (className: string) => {
            classList.add(className);
            setClassList(classList);
          },
          removeClass: (className: string) => {
            classList.delete(className);
            setClassList(classList);
          },
          hasNativeControl: () => true,
          isAttachedToDOM: () => true,
          isChecked: () => state.checked,
          isIndeterminate: () => state.indeterminate,
          setNativeControlDisabled: (disabled) => updateState('disabled', disabled),
          removeNativeControlAttr: (key) => updateState(key, false),
          setNativeControlAttr: updateState,
          forceLayout: () => null,
        });
        foundation.init();
        foundation.setDisabled(state.disabled);
      }, []);

      useEffect(() => {
        if (foundation) {
          foundation.handleChange();
        }
      }, [state]);

      const handleChange = (e) => {
        const {checked, indeterminate} = e.target;
        setState({checked, indeterminate, disabled});
        inputElement.current.indeterminate = indeterminate;
        onChange(e);
      };

      return (
        <div ref={rootElement} className={classNames('mdc-form-field', className)} {...otherProps}>
          <div className={classNames('mdc-checkbox', Array.from(classList))} ref={checkBoxElement}>
            <input type="checkbox"
              class="mdc-checkbox__native-control"
              ref={inputElement}
              value={checked}
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
                  d='M1.73,12.91 8.1,19.28 22.79,4.59'/>
              </svg>
              <div className='mdc-checkbox__mixedmark' />
            </div>
            <div class="mdc-checkbox__ripple"></div>
          </div>
        </div>
      );
    };

  } // namespace Internal

  export const Checkbox = withRipple(Internal.CheckBox);

} // namespace Material
