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

  export const withRipple = (Component: preact.ComponentType<any>) => (props) => {

    const componentRef = useRef(null);
    const mdcRipple = useRef(null);

    useEffect(() => {
      const {base} = componentRef.current;
      mdcRipple.current = new MDCRipple(base);
      return () => mdcRipple.current = null;
    }, []);

    return (
      <Component {...props} ref={componentRef}/>
    );
  };

}
