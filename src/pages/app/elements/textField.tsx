
/// <reference path="../../../components/index.ts"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  const {
    useState
  } = preactHooks;

  export namespace Elements {

    export const TextField = () => {

      const [leadingIcon, setLeadingIcon] = useState(true);
      const [trailingIcon, setTrailingIcon] = useState(false);
      const [outlined, setOutlined] = useState(false);
      const [fullWidth, setFullWidth] = useState(false);
      const [textArea, setTextArea] = useState(false);
      const [disabled, setDisabled] = useState(false);
      const [valid, setValid] = useState(true);
      const [text, setText] = useState('');

      return (
        <Fragment>
          <div style="padding: 11px;">
            <Button label={`leadingIcon (${leadingIcon ? 'true' : 'false'})`} onClick={() => setLeadingIcon(!leadingIcon)}/>
            <Button label={`trailingIcon (${trailingIcon ? 'true' : 'false'})`} onClick={() => setTrailingIcon(!trailingIcon)}/>
            <Button label={`outlined (${outlined ? 'true' : 'false'})`} onClick={() => setOutlined(!outlined)}/>
            <Button label={`fullWidth (${fullWidth ? 'true' : 'false'})`} onClick={() => setFullWidth(!fullWidth)}/>
            <Button label={`textArea (${textArea ? 'true' : 'false'})`} onClick={() => setTextArea(!textArea)}/>
            <Button label={`valid (${valid ? 'true' : 'false'})`} onClick={() => setValid(!valid)}/>
            <Button label={`disabled (${disabled ? 'true' : 'false'})`} onClick={() => setDisabled(!disabled)}/>
          </div>
          <div>
            <Material.TextField
              trailingIcon={trailingIcon ? 'search' : null}
              leadingIcon={leadingIcon ? 'search' : null}
              onInput={({target}) => setText(target.value)}
              fullWidth={fullWidth}
              textArea={textArea}
              outlined={outlined}
              label="hello!"
              value={text}
              valid={valid}
              disabled={disabled}
              helperText={text}/>
          </div>
        </Fragment>
      );
    };

  }

}
