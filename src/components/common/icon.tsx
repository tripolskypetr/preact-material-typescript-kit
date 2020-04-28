namespace Material {

  const {
    h
  } = preact;

  export const Icon = ({
    className = '',
    icon = '',
    ...otherProps
  }) => (
    <i className={classNames('material-icons', className)} {...otherProps}>
      {icon}
    </i>
  );

} // namespace Material
