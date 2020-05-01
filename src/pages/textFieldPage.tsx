
/// <reference path="../components/index.ts"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  const {
    useState
  } = preactHooks

  export const TextFieldPage = () => {

    const [leadingIcon, setLeadingIcon] = useState(true);
    const [trailingIcon, setTrailingIcon] = useState(false);
    const [outlined, setOutlined] = useState(false);
    const [fullWidth, setFullWidth] = useState(false);
    const [textArea, setTextArea] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [text, setText] = useState('');

    return (
      <Fragment>
        <div style="padding: 11px;">
          <Button label={`leadingIcon (${leadingIcon ? 'true' : 'false'})`} onClick={() => setLeadingIcon(!leadingIcon)}/>
          <Button label={`trailingIcon (${trailingIcon ? 'true' : 'false'})`} onClick={() => setTrailingIcon(!trailingIcon)}/>
          <Button label={`outlined (${outlined ? 'true' : 'false'})`} onClick={() => setOutlined(!outlined)}/>
          <Button label={`fullWidth (${fullWidth ? 'true' : 'false'})`} onClick={() => setFullWidth(!fullWidth)}/>
          <Button label={`textArea (${textArea ? 'true' : 'false'})`} onClick={() => setTextArea(!textArea)}/>
          <Button label={`disabled (${disabled ? 'true' : 'false'})`} onClick={() => setDisabled(!disabled)}/>
        </div>
        <div>
          <TextField
            trailingIcon={trailingIcon ? 'search' : null}
            leadingIcon={leadingIcon ? 'search' : null}
            onInput={({target}) => setText(target.value)}
            fullWidth={fullWidth}
            textArea={textArea}
            outlined={outlined}
            label="hello!"
            value={text}
            disabled={disabled}
            helperText={text}/>
        </div>
      </Fragment>
    );
  };

}
