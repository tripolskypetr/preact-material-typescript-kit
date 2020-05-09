
/// <reference path="./withRipple.tsx"/>
/// <reference path="./debug.ts"/>

namespace Material {

  const {
    h,
  } = preact;

  namespace Internal {

    const cssClasses = {
      ROOT: 'mdc-button',
      ICON: 'mdc-button__icon',
      LABEL: 'mdc-button__label',
      DENSE: 'mdc-button--dense',
      RAISED: 'mdc-button--raised',
      OUTLINED: 'mdc-button--outlined',
      UNELEVATED: 'mdc-button--unelevated',
    };

    export const Button = ({
      className = '',
      raised = false,
      unelevated = false,
      outlined = false,
      dense = false,
      disabled = false,
      label = 'Button',
      trailingIcon = '',
      icon = '',
      onClick = (e) => debug.log({e}),
      ...otherProps
    }) => {
      const classes = () => classNames(cssClasses.ROOT, className, {
        [cssClasses.RAISED]: raised,
        [cssClasses.UNELEVATED]: unelevated,
        [cssClasses.OUTLINED]: outlined,
        [cssClasses.DENSE]: dense,
      });
      return (
        <button className={classes()} disabled={disabled} onClick={onClick} {...otherProps}>
          <div className="mdc-button__ripple"></div>
          {icon ? <Icon className={cssClasses.ICON} icon={icon.toString()}/> : null}
          <span className={cssClasses.LABEL}>{label}</span>
          {trailingIcon ? <Icon className={cssClasses.ICON} icon={trailingIcon.toString()}/> : null}
        </button>
      );
    };

    export type ButtonProps = Parameters<typeof Button>[0];

  }

  export const Button = withRipple<Internal.ButtonProps>(Internal.Button);

} // namespace Material
