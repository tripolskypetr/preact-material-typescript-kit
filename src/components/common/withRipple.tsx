namespace Material {

  const {
    h
  } = preact;

  const {
    useRef,
    useLayoutEffect,
  } = preactHooks;

  const {
    MDCRipple
  } = mdc.ripple;

  export function withRipple<T = any>(Component: preact.ComponentType<any>, unbounded = false) {
      return (props: T) => {

      const componentRef = useRef(null);
      const mdcRipple = useRef(null);

      useLayoutEffect(() => {
        const {base} = componentRef.current;
        const ripple = new MDCRipple(base);
        ripple.unbounded = unbounded;
        mdcRipple.current = ripple;
        return () => {
          mdcRipple.current = null;
          ripple.destroy();
        };
      }, []);

      return (
        <Component {...props} ref={componentRef}/>
      );
    };
  }

}
