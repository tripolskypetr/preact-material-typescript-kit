namespace Material {

  const {
    h
  } = preact;

  const {
    useRef,
    useEffect,
    useLayoutEffect,
  } = preactHooks;

  const {
    MDCSlider
  } = mdc.slider;

  const cssClasses = {
    BASE: 'mdc-slider',
    MARKS: 'mdc-slider--display-markers',
    TRACK_CONTAINER: 'mdc-slider__track-container',
    TRACK: 'mdc-slider__track',
    TRACK_MARKER: 'mdc-slider__track-marker-container',
    THUMB_CONTAINER: 'mdc-slider__thumb-container',
    DISCRETE: 'mdc-slider--discrete',
    PIN: 'mdc-slider__pin',
    PIN_MARKER: 'mdc-slider__pin-value-marker',
    THUMB: 'mdc-slider__thumb',
    FOCUS_RING: 'mdc-slider__focus-ring',
  }

  export const Slider = ({
    className = '',
    discrete = false,
    marks = false,
    pin = false,
    value = 10,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    onChange = (e) => console.log({e}),
    ...otherProps
  }) => {

    const elementRef = useRef(null);
    const mdcSliderRef = useRef(null);

    useLayoutEffect(() => {
      const mdcSlider = new MDCSlider(elementRef.current);
      const handler = () => onChange(mdcSlider.value);
      mdcSlider.listen('MDCSlider:change', handler);
      mdcSliderRef.current = mdcSlider;
      return () => {
        mdcSliderRef.current = null;
        mdcSlider.unlisten('MDCSlider:change', handler);
        mdcSlider.destroy();
      }
    }, [discrete, marks]);

    const classes = () => classNames(cssClasses.BASE, className, {
      [cssClasses.DISCRETE]: discrete,
      [cssClasses.MARKS]: marks,
    });

    useEffect(() => {
      const {current} = mdcSliderRef;
      if (current) {
        current.value = value;
        current.min = min;
        current.max = max;
        current.step = step;
        current.disabled = disabled;
      }
    }, [value, min, max, step, disabled]);

    return (
      <div ref={elementRef} class={classes()} {...otherProps} role="slider">
        <div class={cssClasses.TRACK_CONTAINER}>
          <div class={cssClasses.TRACK}/>
          {discrete && marks && <div class={cssClasses.TRACK_MARKER}/>}
        </div>
        <div class={cssClasses.THUMB_CONTAINER}>
          {discrete && pin && <div class={cssClasses.PIN}>
            <span class={cssClasses.PIN_MARKER}/>
          </div>}
          <svg class={cssClasses.THUMB} width="21" height="21">
            <circle cx="10.5" cy="10.5" r="7.875"/>
          </svg>
          <div class={cssClasses.FOCUS_RING}/>
        </div>
      </div>
    );
  };

}
