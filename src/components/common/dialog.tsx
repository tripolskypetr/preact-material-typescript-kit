
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

  namespace Internal {

    const Dialog = ({
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

    const DialogButton = ({
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

    const DialogContent = ({
      className = '',
      children = null,
      tag = 'div',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(className, cssClasses.CONTENT),
      ...otherProps
    }, children);

    const DialogContainer = ({
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

    const DialogFooter = ({
      className = '',
      children = null,
      tag = 'footer',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(className, cssClasses.ACTIONS),
      ...otherProps
    }, children);

    const DialogTitle = ({
      className = '',
      children = null,
      tag = 'h2',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(className, cssClasses.TITLE),
      ...otherProps
    }, children);

    const DialogScrim = ({
      className = '',
      children = null,
      tag = 'div',
      ...otherProps
    }) => createElement(tag, {
      className: classNames(className, cssClasses.SCRIM),
      ...otherProps
    }, children);

    const AlertDialog = ({
      title = 'Title',
      message = 'Message',
      resolve = () => console.log('resolve'),
    }) => {
      const [opened, setOpened] = useState(true);
      return (
        <Dialog open={opened} onChange={(v) => !v && resolve()}>
          <DialogContainer>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <p>{message}</p>
            </DialogContent>
            <DialogFooter>
              <DialogButton label='Ок' onClick={() => setOpened(false)}/>
            </DialogFooter>
          </DialogContainer>
          <DialogScrim/>
        </Dialog>
      );
    }

    const PromptDialog = ({
      message = 'Message',
      value = 'Value',
      resolve = (e) => console.log(e)
    }) => {
      const [opened, setOpened] = useState(true);
      const [text, setText] = useState(value);
      const textRef = useRef('');
      useEffect(() => {
        textRef.current = text
      }, [text]);
      const handleClose = (v) => {
        if (v === false) {
          resolve(textRef.current)
        }
      };
      return (
        <Dialog open={opened} onChange={handleClose}>
          <DialogContainer>
            <DialogTitle>{message}</DialogTitle>
            <DialogContent>
              <TextField value={text} onInput={({target}) => setText(target.value)} fullWidth={true}/>
            </DialogContent>
            <DialogFooter>
              <DialogButton label='Ок' onClick={() => setOpened(false)}/>
            </DialogFooter>
          </DialogContainer>
          <DialogScrim/>
        </Dialog>
      );
    };

    const ConfirmDialog = ({
      title = 'Title',
      message = 'Message',
      resolve = (e) => console.log(e)
    }) => {
      const [opened, setOpened] = useState(true);
      const resultRef = useRef(false);
      const handleClose = (v) => {
        if (v === false) {
          resolve(resultRef.current);
        }
      };
      const close = (result) => {
        resultRef.current = result;
        setOpened(false);
      };
      return (
        <Dialog open={opened} onChange={handleClose}>
          <DialogContainer>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <p>{message}</p>
            </DialogContent>
            <DialogFooter>
              <DialogButton label='Ок' onClick={() => close(true)}/>
              <DialogButton label='Отмена' onClick={() => close(false)}/>
            </DialogFooter>
          </DialogContainer>
          <DialogScrim/>
        </Dialog>
      );
    }

    export class DialogProvider extends preact.Component<any, any> {

      public static alert: (title?: string, message?: string) => Promise<any> = null;
      public static prompt: (message?: string, value?: string) => Promise<any> = null;
      public static snack: (message?: string, timeout?: number) => Promise<any> = null;
      public static confirm: (title?: string, message?: string) => Promise<any> = null;
      public static select: () => Promise<any> = null;

      constructor(props) {
        super(props);
        this.state = {
          alertOpened: false,
          alertMessage: '',
          alertTitle: '',

          promptOpened: false,
          promptMessage: '',
          promptValue: '',

          snackBarOpened: false,
          snackBarMessage: '',
          snackBarTimeout: 5000,

          confirmDialogOpened: false,
          confirmDialogTitle: '',
          confirmDialogMessage: '',
        };

        DialogProvider.alert = (title = '', message = '') => new Promise((res) => {
          this.setState((prevState) => ({
            ...prevState,
            alertTitle: title,
            alertMessage: message,
            alertOpened: true,
          }));
          this.resolveAlert = res;
        });

        DialogProvider.prompt = (message = '', value = '') => new Promise((res) => {
          this.setState((prevState) => ({
            ...prevState,
            promptMessage: message,
            promptOpened: true,
            promptValue: value,
          }));
          this.resolvePrompt = res;
        });

        DialogProvider.snack = (message = '', timeout = 5000) => new Promise((res) => {
          this.setState((prevState) => ({
            ...prevState,
            snackBarMessage: message,
            snackBarTimeout: timeout,
            snackBarOpened: true,
          }));
          this.resolveSnack = res;
        });

        DialogProvider.confirm = (title = 'Title', message = 'Message') => new Promise((res) => {
          this.setState((prevState) => ({
            ...prevState,
            confirmDialogOpened: true,
            confirmDialogTitle: title,
            confirmDialogMessage: message,
          }));
          this.resolveConfirm = res;
        });
      }

      resolveAlert = null;
      resolvePrompt = null;
      resolveSnack = null;
      resolveConfirm = null;

      render(props, state) {
        return (
          <Fragment>
            {state.alertOpened && (
              <AlertDialog
                title={state.alertTitle}
                message={state.alertMessage}
                resolve={() => {
                  this.setState({...state, alertOpened: false});
                  this.resolveAlert();
                }}/>
            )}
            {state.promptOpened && (
              <PromptDialog
                message={state.promptMessage}
                value={state.promptValue}
                resolve={(v) => {
                  this.setState({...state, promptOpened: false});
                  this.resolvePrompt(v);
                }}/>
            )}
            {state.snackBarOpened && (
              <Snackbar
                open={state.snackBarOpened}
                message={state.snackBarMessage}
                timeoutMs={state.snackBarTimeout}
                onChange={(v) => {
                  if (!v) {
                    this.setState({...state, snackBarOpened: false});
                    this.resolveSnack();
                  }
                }}/>
            )}
            {state.confirmDialogOpened && (
              <ConfirmDialog
                message={state.confirmDialogMessage}
                title={state.confirmDialogTitle}
                resolve={(v) => {
                  this.setState({...state, confirmDialogOpened: false});
                  this.resolveConfirm(v);
                }}/>
            )}
            {props.children}
          </Fragment>
        );
      }
    }

  }

  export const DialogProvider = Internal.DialogProvider;

}
