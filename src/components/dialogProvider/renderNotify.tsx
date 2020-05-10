
/// <reference path="../common/dialog.tsx"/>
/// <reference path="../common/radio.tsx"/>
/// <reference path="../common/debug.ts"/>

namespace Material {

  const {
    h
  } = preact;

  const {
    useRef,
    useState,
    useEffect,
  } = preactHooks;

  namespace Internal {

    const AlertDialog = ({
      title = 'Title',
      message = 'Message',
      resolve = () => debug.log('resolve'),
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
      resolve = (e) => debug.log(e)
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
      resolve = (e) => debug.log(e)
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

    const SnackDialog = ({
      message = '',
      timeout = 5000,
      resolve = () => debug.log('resolve')
    }) => {
      return (
        <Snackbar
          open={true}
          message={message}
          timeoutMs={timeout}
          onChange={(v) => {
            if (!v) {
              resolve();
            }
          }}/>
      )
    }

    const SelectDialog = ({
      title = '',
      items = [],
      resolve = (e) => debug.log(e),
    }) => {
      const [opened, setOpened] = useState(true);
      const [index, setIndex] = useState(-1);
      const indexRef = useRef(-1);
      useEffect(() => {
        indexRef.current = index
      }, [index]);
      const handleClose = (v) => {
        if (v === false) {
          resolve(indexRef.current);
        }
      };
      return (
        <Dialog open={opened} onChange={handleClose}>
          <DialogContainer>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <List onItemClick={(e) => setIndex(e)}>
                {items.map((item, i) => (
                  <ListItem>
                    <ListItemGraphic>
                      <Radio
                        name="selectDialogGroup"
                        value={item}
                        label={item}
                        onChange={() => null}
                        checked={index === i}/>
                    </ListItemGraphic>
                    <ListItemText>
                      Hello
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogFooter>
              <DialogButton label='Ок' onClick={() => setOpened(false)}/>
            </DialogFooter>
          </DialogContainer>
          <DialogScrim/>
        </Dialog>
      );
    }

    const CalendarDialog = ({
      now = moment(),
      resolve = (e) => debug.log({e}),
    }) => {
      const [opened, setOpened] = useState(true);
      const [value, setValue] = useState<string | null>(null);
      const valueRef = useRef(null);
      useEffect(() => {
        valueRef.current = value;
      }, [value]);
      const handleClose = (v) => {
        if (v === false) {
          resolve(valueRef.current);
        }
      };
      return (
        <Dialog open={opened} onChange={handleClose}>
          <DialogContainer minHeight='585px' maxHeight='585px' minWidth='415px' maxWidth='415px'>
            <DialogContent>
              <Calendar now={now} onChange={setValue}/>
            </DialogContent>
            <DialogFooter>
              <DialogButton label='Ок' onClick={() => setOpened(false)}/>
            </DialogFooter>
          </DialogContainer>
          <DialogScrim/>
        </Dialog>
      );
    }

    export const NotifyRenderer = ({
      type = '',
      props = {},
      resolve = null,
    }) => {
      if (type === 'alert') {
        return <AlertDialog resolve={resolve} {...props}/>
      } else if (type === 'prompt') {
        return <PromptDialog resolve={resolve} {...props}/>
      } else if (type === 'confirm') {
        return <ConfirmDialog resolve={resolve} {...props}/>
      } else if (type === 'snack') {
        return <SnackDialog resolve={resolve} {...props}/>
      } else if (type === 'select') {
        return <SelectDialog resolve={resolve} {...props}/>
      } else if (type === 'date') {
        return <CalendarDialog resolve={resolve} {...props}/>
      }
    };

    export type NotifyRendererProps = Parameters<typeof NotifyRenderer>[0];

  }

  interface NotifyRendererProps extends Internal.NotifyRendererProps {
    type: 'alert' | 'prompt' | 'confirm' | 'snack' | 'select' | 'date',
    resolve: Function,
    props: object,
  }

  export const NotifyRenderer = withType<NotifyRendererProps>(Internal.NotifyRenderer);

}
