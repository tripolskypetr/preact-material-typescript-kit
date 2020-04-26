
/// <reference path="../_common/withRipple.tsx"/>

namespace Material {

  const {
    h
  } = preact;

  export interface MaterialIconProps {
    icon?: string;
    className?: string;
    hasRipple?: boolean;
    unbounded?: boolean;
  }

  export const MaterialIcon = ({
    className,
    icon,
    unbounded,
    ...otherProps
  }: MaterialIconProps) => (
    <i className={classNames('material-icons', className)} {...otherProps}>
      {icon}
    </i>
  );

}
