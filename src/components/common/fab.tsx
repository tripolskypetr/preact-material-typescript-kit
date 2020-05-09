
/// <reference path="./debug.ts"/>

namespace Material {

  const {
    h,
  } = preact;

  namespace Internal {

    const CSS_CLASSES = {
      ROOT: 'mdc-fab',
      ICON: 'mdc-fab__icon',
      LABEL: 'mdc-fab__label',
      MINI: 'mdc-fab--mini',
      EXTENDED: 'mdc-fab--extended',
      EXITED: 'mdc-fab--exited',
    };

    export const FloatingActionButton = ({
      exited = false,
      mini = false,
      icon = 'favorite',
      label = '',
      className = '',
      onClick = (e) => debug.log({e}),
      ...otherProps
    }) => {
      const extended = label.length > 0;
      const classes = classNames(CSS_CLASSES.ROOT, className, {
        [CSS_CLASSES.MINI]: mini,
        [CSS_CLASSES.EXTENDED]: extended,
        [CSS_CLASSES.EXITED]: exited,
      });
      return (
        <button className={classes} onClick={onClick} {...otherProps} style="padding: 11px;">
          <Icon icon={icon} />
          {extended && <span className={CSS_CLASSES.LABEL}>{label}</span>}
        </button>
      );
    };

    export type FloatingActionButtonProps = Parameters<typeof FloatingActionButton>[0];

  }

  export const FloatingActionButton = withRipple<Internal.FloatingActionButtonProps>(Internal.FloatingActionButton);

}