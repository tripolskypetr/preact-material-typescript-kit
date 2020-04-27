namespace Material {

  const {
    h
  } = preact;

  const {
    useRef,
    useEffect
  } = preactHooks;

  const {
    MDCRipple
  } = mdc.ripple;

  export namespace Common {

    export const withRipple = (Component: preact.ComponentType<any>) => (props) => {

      const componentRef = useRef(null);

      useEffect(() => {
        const {base} = componentRef.current;
        const ripple = new MDCRipple(base);
      }, []);

      return (
        <Component {...props} ref={componentRef}/>
      );
    };

  }

}
