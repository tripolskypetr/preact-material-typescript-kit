
/// <reference path="./withRipple.tsx"/>

namespace Material {

  const {
    h
  } = preact;

  const {
    useRef,
    useEffect,
    useLayoutEffect,
  } = preactHooks;

  const {
    MDCLinearProgress
  } = mdc.linearProgress;

  const cssClasses = {
    BASE: 'mdc-linear-progress',
    PROGRESS_BAR: 'mdc-linear-progress__bar',
    REVERSED: 'mdc-linear-progress--reversed',
    BAR_INNER: 'mdc-linear-progress__bar-inner',
    PROGRESS_BUFFER: 'mdc-linear-progress__buffer',
    PRIMARY_BAR: 'mdc-linear-progress__primary-bar',
    SECONDARY_BAR: 'mdc-linear-progress__secondary-bar',
    INDETERMINATE: 'mdc-linear-progress--indeterminate',
    BUFFERING_DOTS: 'mdc-linear-progress__buffering-dots',
  };

  namespace Internal {

    export const Progress = ({
      buffer = 0,
      bufferingDots = true,
      className = '',
      closed = false,
      indeterminate = false,
      progress = 0,
      reversed = false,
      ...otherProps
    }) => {

      const elementRef = useRef(null);
      const mdcProgressRef = useRef(null);

      useLayoutEffect(() => {
        const mdcProgress = new MDCLinearProgress(elementRef.current);
        mdcProgressRef.current = mdcProgress;
        return () => {
          mdcProgressRef.current = null;
          mdcProgress.destroy();
        };
      }, [bufferingDots, indeterminate, reversed]);

      useEffect(() => {
        const {current} = mdcProgressRef;
        if (current) {
          current.determinate = !indeterminate;
          current.progress = progress;
          current.reverse = reversed;
          current.buffer = buffer;
          current.close = closed;
        }
      }, [indeterminate, progress, buffer, reversed, closed]);

      const classes = () => classNames(cssClasses.BASE, 'mdc-ripple-surface', className, {
        [cssClasses.INDETERMINATE]: indeterminate,
        [cssClasses.REVERSED]: reversed,
      });

      return (
        <div className={classes()} ref={elementRef} role='progressbar' {...otherProps}>
          {bufferingDots && <div className={cssClasses.BUFFERING_DOTS}/>}
          <div className={cssClasses.PROGRESS_BUFFER}/>
          <div className={classNames(cssClasses.PROGRESS_BAR, cssClasses.PRIMARY_BAR)}>
            <span className={cssClasses.BAR_INNER} />
          </div>
          <div className={classNames(cssClasses.PROGRESS_BAR, cssClasses.SECONDARY_BAR)}>
            <span className={cssClasses.BAR_INNER} />
          </div>
        </div>
      );
    };

    export type ProgressProps = Parameters<typeof Progress>[0];

  }

  export const Progress = withRipple<Internal.ProgressProps>(Internal.Progress);

}
