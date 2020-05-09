
/// <reference path="./debug.ts"/>

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
      icon = null,
      iconOn = 'favorite',
      iconOff = 'favorite_border',
      disabled = false,
      color = 'initial',
      onChange = (e) => debug.log({e}),
    }) => {
      [iconOn, iconOff] = icon ? [icon, icon] : [iconOn, iconOff];
      const [state, setState] = useState({on});
      const toggle = ({target}) => {
        target.blur();
        const on = !state.on;
        setState({on});
        onChange(on);
      }
      useEffect(() => setState({on}), [on]);
      return (
        <button tabIndex={-1} onClick={toggle} disabled={disabled} style={{color}} class={classNames('mdc-ripple-surface', 'mdc-icon-button')}>
          <i class={classNames('material-icons', 'mdc-icon-button__icon', {'mdc-icon-button__icon--on': state.on})}>{iconOn}</i>
          <i class={classNames('material-icons', 'mdc-icon-button__icon', {'mdc-icon-button__icon--on': !state.on})}>{iconOff}</i>
        </button>
      );
    };

    export type IconButtonProps = Parameters<typeof IconButton>[0];

  }

  export const IconButton = withRipple<Internal.IconButtonProps>(Internal.IconButton, true);

}
