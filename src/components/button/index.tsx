
/// <reference path="../_common/withRipple.tsx"/>
/// <reference path="../_common/unknown.tsx"/>

namespace Material {

  const {
    h,
    cloneElement,
  } = preact;

  const {
    withRipple,
    unknown
  } = Common;

  type ButtonIcon = preact.VNode<{className?: string, class?: string}>;

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

    export interface ButtonProps {
      raised?: boolean;
      unelevated?: boolean;
      outlined?: boolean;
      dense?: boolean;
      disabled?: boolean;
      className?: string;
      icon?: ButtonIcon;
      trailingIcon?: ButtonIcon;
      children?: preact.VNode;
      onClick?: (e: any) => void;
    }

    export const Button = ({
      className = '',
      raised = false,
      unelevated = false,
      outlined = false,
      dense = false,
      disabled = false,
      children = unknown,
      trailingIcon = null,
      icon = null,
      onClick = (e) => console.log({e}),
      ...otherProps
    }: ButtonProps) => {
      const props = {
        className: classNames(CSS_CLASSES.ROOT, className, {
          [CSS_CLASSES.RAISED]: raised,
          [CSS_CLASSES.UNELEVATED]: unelevated,
          [CSS_CLASSES.OUTLINED]: outlined,
          [CSS_CLASSES.DENSE]: dense,
        }),
        disabled,
        onClick,
        ...otherProps,
      };
      return (
        <button {...props}>
          <div className="mdc-button__ripple"></div>
          {!trailingIcon ? renderIcon(icon) : null}
          <span className={CSS_CLASSES.LABEL}>{children}</span>
          {trailingIcon ? renderIcon(trailingIcon) : null}
        </button>
      );
    };

    const renderIcon = (icon?: ButtonIcon) =>
      icon ? cloneElement(icon, {
        className: classNames(CSS_CLASSES.ICON, icon.props.className || icon.props.class),
      }) : null;

  } // namespace Internal

  export const Button = withRipple(Internal.Button);

} // namespace Material
