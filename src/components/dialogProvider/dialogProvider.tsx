
/// <reference path="./renderNotify.tsx"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  interface Notification {
    type: 'alert' | 'prompt' | 'confirm' | 'snack' | 'select',
    props: object,
    resolve: Function,
  }

  interface DialogProviderProps {
    children?: preact.ComponentChild,
  }

  interface DialogProviderState {
    notify: Notification | null;
  }

  export class DialogProvider extends preact.Component<DialogProviderProps, DialogProviderState> {

    private static instance: DialogProvider = null;

    constructor(props) {
      super(props);
      DialogProvider.instance = this;
    }

    public static alert(title?: string, message?: string): Promise<any> {
      return new Promise((resolve) => {
        this.instance.notify({
          type: 'alert',
          props: {title, message},
          resolve,
        })
      })
    }

    public static prompt(message?: string, value?: string): Promise<any> {
      return new Promise((resolve) => {
        this.instance.notify({
          type: 'prompt',
          props: {message, value},
          resolve,
        })
      })
    }

    public static snack(message?: string, timeout?: number): Promise<any> {
      return new Promise((resolve) => {
        this.instance.notify({
          type: 'snack',
          props: {message, timeout},
          resolve,
        })
      })
    }

    public static confirm(title?: string, message?: string): Promise<any> {
      return new Promise((resolve) => {
        this.instance.notify({
          type: 'confirm',
          props: {title, message},
          resolve,
        })
      })
    }

    public static select(title?: string, items?: string[]): Promise<any> {
      return new Promise((resolve) => {
        this.instance.notify({
          type: 'select',
          props: {title, items},
          resolve,
        });
      })
    }

    private notifyQueue: Notification[] = [];

    private applyResolveMiddleware(notification: Notification): Notification {
      return {
        ...notification,
        resolve: (...args) => {
          this.setState({notify: null}, () => {
            this.setState({notify: this.notifyQueue.pop()});
          });
          return notification.resolve(...args);
        }
      }
    }

    async notify(notification: Notification) {
      const notify = this.applyResolveMiddleware(notification);
      if (this.state.notify) {
        this.notifyQueue.push(notify);
      } else {
        this.setState({notify});
      }
    }

    render(props: DialogProviderProps, state: DialogProviderState) {
      return (
        <Fragment>
          {props.children}
          {state.notify && (
            <NotifyRenderer
              type={state.notify.type}
              props={state.notify.props}
              resolve={state.notify.resolve}/>
          )}
        </Fragment>
      );
    }

  }

}
