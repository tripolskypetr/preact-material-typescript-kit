namespace Material {

  const {
    h
  } = preact;

  namespace Internal {

    export const Chip = ({
      icon = 'check',
      className = '',
      onClick = (e) => console.log({e}),
      ...otherProps
    }) => {
      return (
        <div onClick={onClick} className={classNames('mdc-chip', className)} {...otherProps}>
          <div class="mdc-chip__ripple"></div>
          <Icon className={classNames('mdc-chip__icon', 'mdc-chip__icon--leading')} icon={icon}/>
          <span role="gridcell">
            <span class="mdc-chip__primary-action">
              <span class="mdc-chip__text">Add to calendar</span>
            </span>
          </span>
        </div>
      );
    };

    export type ChipProps = Parameters<typeof Chip>[0];

  }

  export const Chip = withRipple<Internal.ChipProps>(Internal.Chip);

}
