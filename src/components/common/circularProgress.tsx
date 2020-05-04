namespace Material {

  const {
    h
  } = preact;

  const {
    useRef,
    useState,
    useEffect,
  } = preactHooks;

  const createTransition = (duration, property, delay, easeFunction) => {
    duration = duration || '450ms';
    property = property || 'all';
    delay = delay || '0ms';
    easeFunction = easeFunction || 'linear';
    return `${property} ${duration} ${easeFunction} ${delay}`;
  }

  const setAutoPrefix = (style, key, value) => {
    style[key] = value;
  }

  const getRelativeValue = (value, min, max) => {
    const clampedValue = Math.min(Math.max(min, value), max);
    return clampedValue / (max - min);
  }

  const getArcLength = (fraction, size, thickness) => {
    return fraction * Math.PI * (size - thickness);
  }

  namespace Internal {

    export const CircularProgress = ({
      mode = 'indeterminate',
      value = 0,
      min = 0,
      max = 100,
      size = 40,
      thickness = 3.5,
      color = 'var(--mdc-theme-primary)',
      style = {},
      ...otherProps
    }) => {

      const wrapper = useRef(null);
      const path = useRef(null);

      const styles = {
        root: {
          position: 'relative',
          display: 'inline-block',
          width: size,
          height: size,
        },
        wrapper: {
          width: size,
          height: size,
          display: 'inline-block',
          transition: createTransition('transform', '20s', null, 'linear'),
          transitionTimingFunction: 'linear',
        },
        svg: {
          width: size,
          height: size,
          position: 'relative',
        },
        path: {
          stroke: color,
          strokeLinecap: 'round',
          transition: createTransition('all', '1.5s', null, 'ease-in-out'),
        },
      };

      const scalePath = (path, step = 0, patchTimer = (id) => console.log({id})) => {
        if (mode !== 'indeterminate') return;
        step %= 3;
        if (step === 0) {
          path.style.strokeDasharray = `${getArcLength(0, size, thickness)}, ${getArcLength(1, size, thickness)}`;
          path.style.strokeDashoffset = 0;
          path.style.transitionDuration = '0ms';
        } else if (step === 1) {
          path.style.strokeDasharray = `${getArcLength(0.7, size, thickness)}, ${getArcLength(1, size, thickness)}`;
          path.style.strokeDashoffset = getArcLength(-0.3, size, thickness);
          path.style.transitionDuration = '750ms';
        } else {
          path.style.strokeDasharray = `${getArcLength(0.7, size, thickness)}, ${getArcLength(1, size, thickness)}`;
          path.style.strokeDashoffset = getArcLength(-1, size, thickness);
          path.style.transitionDuration = '850ms';
        }
        patchTimer(setTimeout(() => scalePath(path, step + 1, patchTimer), step ? 750 : 250));
      }

      const rotateWrapper = (wrapper, patchTimer = (id) => console.log({id})) => {
        if (mode !== 'indeterminate') return;
        setAutoPrefix(styles.wrapper, 'transform', 'rotate(0deg)');
        setAutoPrefix(styles.wrapper, 'transitionDuration', '0ms');
        setTimeout(() => {
          setAutoPrefix(styles.wrapper, 'transform', 'rotate(1800deg)');
          setAutoPrefix(styles.wrapper, 'transitionDuration', '10s');
          setAutoPrefix(styles.wrapper, 'transitionTimingFunction', 'linear');
        }, 50);
        patchTimer(setTimeout(() => rotateWrapper(wrapper, patchTimer), 10050));
      }

      useEffect(() => {
        let timer = null;
        scalePath(path.current, 0, (id) => timer = id);
        return () => {
          if (timer) {
            clearTimeout(timer);
          }
        }
      }, []);

      useEffect(() => {
        let timer = null;
        rotateWrapper(wrapper.current, (id) => timer = id);
        return () => {
          if (timer) {
            clearTimeout(timer);
          }
        }
      }, []);

      return (
        <div {...otherProps} style={{...styles.root, ...style}} >
        <div ref={wrapper} style={styles.wrapper} >
          <svg
            viewBox={`0 0 ${size} ${size}`}
            style={styles.svg}
          >
            <circle
              ref={path}
              style={styles.path}
              cx={size / 2}
              cy={size / 2}
              r={(size - thickness) / 2}
              fill="none"
              strokeWidth={thickness}
              strokeMiterlimit="20"
            />
          </svg>
        </div>
      </div>
      )
    }

    export type CircularProgressProps = Parameters<typeof CircularProgress>[0];

  }

  interface CircularProgressProps extends Internal.CircularProgressProps {
    mode?: 'determinate' | 'indeterminate'
  }

  export const CircularProgress = withType<CircularProgressProps>(Internal.CircularProgress);

}
