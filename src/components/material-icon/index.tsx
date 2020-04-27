
/// <reference path="../_common/withRipple.tsx"/>

namespace Material {

  const {
    h
  } = preact;

  export interface MaterialIconProps {
    icon?: string;
    className?: string;
  }

  export const MaterialIcon = ({
    className,
    icon,
    ...otherProps
  }: MaterialIconProps) => (
    <i className={classNames('material-icons', className)} {...otherProps}>
      {icon}
    </i>
  );

} // namespace Material
