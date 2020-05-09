
/// <reference path="./debug.ts"/>

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
    MDCSnackbar
  } = mdc.snackbar;

  const cssClasses = {
    BASE: 'mdc-snackbar',
    SURFACE: 'mdc-snackbar__surface',
    LABEL: 'mdc-snackbar__label',
    ACTIONS: 'mdc-snackbar__actions',
    ACTION: 'mdc-snackbar__action',
    STACKED: 'mdc-snackbar--stacked',
    LEADING: 'mdc-snackbar--leading',
  };

  export const Snackbar = ({
    message = 'Default message',
    className = '',
    timeoutMs = -1,
    actionText = '',
    open = false,
    stacked = false,
    leading = false,
    onChange = (e) => debug.log({e}),
    onAction = (e) => debug.log({e}),
  }) => {

    const elementRef = useRef(null);
    const mdcSnackbarRef = useRef(null);

    useLayoutEffect(() => {
      const mdcSnackbar = new MDCSnackbar(elementRef.current);
      const handler = () => onChange(mdcSnackbar.isOpen);
      mdcSnackbar.listen('MDCSnackbar:opened', handler);
      mdcSnackbar.listen('MDCSnackbar:closed', handler);
      mdcSnackbarRef.current = mdcSnackbar;
      return () => {
        mdcSnackbar.unlisten('MDCSnackbar:opened', handler);
        mdcSnackbar.unlisten('MDCSnackbar:closed', handler);
        mdcSnackbarRef.current = null;
        mdcSnackbar.destroy();
      };
    }, [actionText]);

    useEffect(() => {
      const {current} = mdcSnackbarRef;
      if (current) {
        current.timeoutMs = timeoutMs;
        current.labelText = message;
        if (actionText) {
          current.actionButtonText = actionText;
        }
      }
    }, [timeoutMs, message, actionText]);

    useEffect(() => {
      const {current} = mdcSnackbarRef;
      if (open && current) {
        current.open();
      } else if (current) {
        current.close();
      }
    }, [open]);

    const classes = () => classNames(className, cssClasses.BASE, {
      [cssClasses.STACKED]: stacked,
      [cssClasses.LEADING]: leading,
    });

    return (
      <div className={classes()} ref={elementRef}>
        <div className={cssClasses.SURFACE}>
          <div className={cssClasses.LABEL} role='status' aria-live='polite'>
          </div>
          {actionText ? (
            <div className={cssClasses.ACTIONS}>
              <button
                type='button'
                onClick={onAction}
                className={classNames('mdc-button', cssClasses.ACTION)}/>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

}
