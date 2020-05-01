
/// <reference path="./withRipple.tsx"/>

namespace Material {

  const {
    h,
  } = preact;

  namespace Internal {

    const CSS_CLASSES = {
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
      label = '',
      trailingIcon = '',
      icon = '',
      onClick = (e) => console.log({e}),
      ...otherProps
    }) => {
      const classes = () => classNames(CSS_CLASSES.ROOT, className, {
        [CSS_CLASSES.RAISED]: raised,
        [CSS_CLASSES.UNELEVATED]: unelevated,
        [CSS_CLASSES.OUTLINED]: outlined,
        [CSS_CLASSES.DENSE]: dense,
      });
      return (
        <button className={classes()} disabled={disabled} onClick={onClick} {...otherProps}>
          <div className="mdc-button__ripple"></div>
          {icon ? <Icon className={CSS_CLASSES.ICON} icon={icon.toString()}/> : null}
          <span className={CSS_CLASSES.LABEL}>{label}</span>
          {trailingIcon ? <Icon className={CSS_CLASSES.ICON} icon={trailingIcon.toString()}/> : null}
        </button>
      );
    };

    export type ButtonProps = Parameters<typeof Button>[0];

  }

  export const Button = withRipple<Internal.ButtonProps>(Internal.Button);

} // namespace Material
