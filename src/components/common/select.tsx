namespace Material {

  const {
    h,
  } = preact;

  const {
    useRef,
    useEffect,
    useCallback,
    useLayoutEffect,
  } = preactHooks;

  const {
    MDCSelect
  } = mdc.select;

  const {
    style
  } = typestyle;

  const CSS_CLASSES = {
    OUTLINED: 'mdc-select--outlined',
    DISABLED: 'mdc-select--disabled',
    REQUIRED: 'mdc-select--required',
  };

  const mdcSelectPaddingFix = style({
    padding: '11px',
  });

  export const Select = ({
    selectedIndex = 0,
    required = false,
    disabled = false,
    outlined = false,
    valid = true,
    className = '',
    label = 'hello world',
    items = [],
    onChange = (e) => console.log({e}),
    ...otherProps
  }) => {

    const selectElement = useRef(null);
    const mdSelectRef = useRef(null);

    const changeHandler = useCallback(
      (index) => onChange(index),
      [selectedIndex]
    );

    useEffect(() => {
      const {current} = mdSelectRef;
      if (current) {
        current.selectedIndex = selectedIndex + 1;
        current.required = required;
        current.disabled = disabled;
        current.outlined = outlined;
        current.valid = valid;
      }
    }, [selectedIndex, required, disabled, outlined, valid]);

    useLayoutEffect(() => {
      const mdSelect = new MDCSelect(selectElement.current);
      mdSelect.selectedIndex = selectedIndex;
      const handler = () => {
        const {selectedIndex} = mdSelect;
        changeHandler(selectedIndex);
      };
      mdSelectRef.current = mdSelect;
      mdSelect.listen('MDCSelect:change', handler);
      return () => {
        mdSelect.unlisten('MDCSelect:change', handler);
        mdSelectRef.current = null;
        mdSelect.destroy();
      };
    }, [required, disabled, outlined]);

    const classes = () => classNames('mdc-select', {
      [CSS_CLASSES.OUTLINED]: outlined,
      [CSS_CLASSES.DISABLED]: disabled,
      [CSS_CLASSES.REQUIRED]: required,
    });

    return (
      <div className={classNames('select-container', mdcSelectPaddingFix, className)} {...otherProps}>
        <div ref={selectElement} class={classes()}>
          <div class="mdc-select__anchor">
            <i class="mdc-select__dropdown-icon"></i>
            <div class="mdc-select__selected-text"></div>
            {
              outlined ? (
                <div class="mdc-notched-outline">
                  <div class="mdc-notched-outline__leading"></div>
                  <div class="mdc-notched-outline__notch">
                    <span class="mdc-floating-label">
                      {label}
                    </span>
                  </div>
                  <div class="mdc-notched-outline__trailing"></div>
                </div>
              ) : (
                <span class="mdc-floating-label mdc-floating-label--float-above">
                  {label}
                </span>
              )
            }
            <div class="mdc-line-ripple"></div>
          </div>
          <div class="mdc-select__menu demo-width-class mdc-menu mdc-menu-surface">
            <ul class="mdc-list">
              <li class="mdc-list-item"></li>
              {items.map((item) => <li class="mdc-list-item" data-value={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  };

}
