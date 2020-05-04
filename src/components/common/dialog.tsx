
/// <reference path="./textField.tsx"/>
/// <reference path="./snackbar.tsx"/>

namespace Material {

  const {
    h,
    Fragment,
    createElement
  } = preact;

  const {
    useRef,
    useState,
    useEffect,
    useLayoutEffect
  } = preactHooks;

  const {
    MDCDialog
  } = mdc.dialog;

  const cssClasses = {
    BASE: 'mdc-dialog',
    CONTAINER: `mdc-dialog__container`,
    SURFACE: `mdc-dialog__surface`,
    TITLE: `mdc-dialog__title`,
    CONTENT: `mdc-dialog__content`,
    ACTIONS: `mdc-dialog__actions`,
    BUTTON: `mdc-dialog__button`,
    DEFAULT_BUTTON: `mdc-dialog__button--default`,
    SCRIM: `mdc-dialog__scrim`,
  };

  export const Dialog = ({
    tag = 'div',
    className = '',
    open = false,
    children = null,
    role = 'alertdialog',
    onChange = (e) => console.log({e}),
    ...otherProps
  }) => {

    const elementRef = useRef(null);
    const mdcDialogRef = useRef(null);

    useLayoutEffect(() => {
      const mdcDialog = new MDCDialog(elementRef.current);
      const handler = () => onChange(mdcDialog.isOpen);
      mdcDialogRef.current = mdcDialog;
      mdcDialog.listen('MDCDialog:opened', handler);
      mdcDialog.listen('MDCDialog:closed', handler);
      return () => {
        mdcDialogRef.current = null;
        mdcDialog.unlisten('MDCDialog:opened', handler);
        mdcDialog.unlisten('MDCDialog:closed', handler);
        mdcDialog.destroy();
      }
    }, []);

    useEffect(() => {
      const {current} = mdcDialogRef;
      if (current && open) {
        current.open();
      } else if (current) {
        current.close();
      }
    }, [open]);

    return createElement(tag, {
      className: classNames(cssClasses.BASE, className),
      ref: elementRef,
      role,
      ...otherProps
    }, children);
  }

  export const DialogButton = ({
    className = '',
    label = '',
    isDefault = false,
    onClick = (e) => console.log({e}),
    ...otherProps
  }) => {
    const classes = () => classNames(className, cssClasses.BUTTON, {
      [cssClasses.DEFAULT_BUTTON]: isDefault,
    });
    return <Button onClick={onClick} className={classes()} {...otherProps} label={label}/>
  };

  export const DialogContent = ({
    className = '',
    children = null,
    tag = 'div',
    ...otherProps
  }) => createElement(tag, {
    className: classNames(className, cssClasses.CONTENT),
    ...otherProps
  }, children);

  export const DialogContainer = ({
    className = '',
    children = null,
    tag = 'div',
    ...otherProps
  }) => createElement(tag, {
    className: classNames(cssClasses.CONTAINER, className),
    ...otherProps
  }, createElement(tag, {
    className: cssClasses.SURFACE,
  }, children));

  export const DialogFooter = ({
    className = '',
    children = null,
    tag = 'footer',
    ...otherProps
  }) => createElement(tag, {
    className: classNames(className, cssClasses.ACTIONS),
    ...otherProps
  }, children);

  export const DialogTitle = ({
    className = '',
    children = null,
    tag = 'h2',
    ...otherProps
  }) => createElement(tag, {
    className: classNames(className, cssClasses.TITLE),
    ...otherProps
  }, children);

  export const DialogScrim = ({
    className = '',
    children = null,
    tag = 'div',
    ...otherProps
  }) => createElement(tag, {
    className: classNames(className, cssClasses.SCRIM),
    ...otherProps
  }, children);

}
