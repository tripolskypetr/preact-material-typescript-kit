namespace Material {

  const {
    h,
  } = preact;

  const {
    useState,
    useEffect,
  } = preactHooks;

  namespace Internal {

    export const IconButton = ({
      on = false,
      iconOn = 'favorite',
      iconOff = 'favorite_border',
      disabled = false,
      color = 'initial',
      onChange = (e) => console.log({e}),
    }) => {
      const [state, setState] = useState({on});
      const toggle = () => setState(({on}) => ({on: !on}));
      useEffect(() => onChange(state.on), [state.on]);
      useEffect(() => setState({on}), [on]);
      return (
        <button disabled={disabled} style={{color}} class={classNames('mdc-ripple-surface', 'mdc-icon-button')}>
          <i onClick={toggle} class={classNames('material-icons', 'mdc-icon-button__icon', {'mdc-icon-button__icon--on': state.on})}>{iconOn}</i>
          <i onClick={toggle} class={classNames('material-icons', 'mdc-icon-button__icon', {'mdc-icon-button__icon--on': !state.on})}>{iconOff}</i>
        </button>
      );
    };

    export type IconButtonProps = Parameters<typeof IconButton>[0];

  }

  export const IconButton = withRipple<Internal.IconButtonProps>(Internal.IconButton, true);

}
