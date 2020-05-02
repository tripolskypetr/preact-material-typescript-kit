namespace Material {

  const {
    h,
    createElement
  } = preact;

  function createTypography({defaultTag = '', classModifier = ''}) {
    return ({
      children = null,
      className = '',
      tag = defaultTag,
      ...otherProps
    }) => createElement(tag, {
      className: classNames(
        `mdc-typography--${classModifier}`,
        'mdc-typography',
        className,
      ),
      ...otherProps
    }, children);
  };

  export const BodyTypo1 = createTypography({
    classModifier: 'body1',
    defaultTag: 'p',
  });

  export const BodyTypo2 = createTypography({
    classModifier: 'body2',
    defaultTag: 'p',
  });

  export const ButtonTypo = createTypography({
    classModifier: 'button',
    defaultTag: 'span',
  });

  export const CaptionTypo = createTypography({
    classModifier: 'caption',
    defaultTag: 'span',
  });

  export const HeadlineTypo1 = createTypography({
    classModifier: 'headline1',
    defaultTag: 'h1',
  });

  export const HeadlineTypo2 = createTypography({
    classModifier: 'headline2',
    defaultTag: 'h2',
  });

  export const HeadlineTypo3 = createTypography({
    classModifier: 'headline3',
    defaultTag: 'h3',
  });

  export const HeadlineTypo4 = createTypography({
    classModifier: 'headline4',
    defaultTag: 'h4',
  });

  export const HeadlineTypo5 = createTypography({
    classModifier: 'headline5',
    defaultTag: 'h5',
  });

  export const HeadlineTypo6 = createTypography({
    classModifier: 'headline6',
    defaultTag: 'h6',
  });

  export const OverlineTypo = createTypography({
    classModifier: 'overline',
    defaultTag: 'span',
  });

  export const SubtitleTypo1 = createTypography({
    classModifier: 'subtitle1',
    defaultTag: 'h6',
  });

  export const SubtitleTypo2 = createTypography({
    classModifier: 'subtitle2',
    defaultTag: 'h6',
  });

}
