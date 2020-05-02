
/// <reference path="../components/index.ts"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  const {
    useState
  } = preactHooks;

  export const SnackbarPage = () => {

    const [timeoutMs, setTimeoutMs] = useState(-1);
    const [actionText, setActionText] = useState('');
    const [open, setOpen] = useState(false);
    const [stacked, setStacked] = useState(false);
    const [leading, setLeading] = useState(false);

    return (
      <Fragment>
        <Button label={`open (${open ? 'true' : 'false'})`} onClick={() => setOpen(!open)}/>
        <Button label={`stacked (${stacked ? 'true' : 'false'})`} onClick={() => setStacked(!stacked)}/>
        <Button label={`leading (${leading ? 'true' : 'false'})`} onClick={() => setLeading(!leading)}/>
        <Button onClick={() => setTimeoutMs(parseInt(prompt('timeout:', '5000'), 10))} label="set timeout"/>
        <Button onClick={() => setActionText(prompt('action text:', 'action'))} label="set action text"/>
        <Snackbar
          timeoutMs={timeoutMs}
          actionText={actionText}
          open={open}
          stacked={stacked}
          leading={leading}
          onChange={setOpen}
          message="Hello, everyone!"/>
      </Fragment>
    )
  };

}
