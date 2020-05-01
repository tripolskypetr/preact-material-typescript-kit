
/// <reference path="../components/index.ts"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  const {
    useState
  } = preactHooks;

  export const SelectPage = () => {

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [required, setRequired] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [outlined, setOutlined] = useState(true);
    const [valid, setValid] = useState(true);

    const items = [
      'Bread, Cereal, Rice, and Pasta',
      'Vegetables',
      'Fruit',
    ];

    return (
      <Fragment>
        <div>
          <Button label={`required (${required ? 'true' : 'false'})`} onClick={() => setRequired(!required)}/>
          <Button label={`disabled (${disabled ? 'true' : 'false'})`} onClick={() => setDisabled(!disabled)}/>
          <Button label={`outlined (${outlined ? 'true' : 'false'})`} onClick={() => setOutlined(!outlined)}/>
          <Button label={`valid (${valid ? 'true' : 'false'})`} onClick={() => setValid(!valid)}/>
          <Button onClick={() => setSelectedIndex(parseInt(prompt('index:', '0'), 10))} label="set index"/>
        </div>
        <div>
          <Select
            selectedIndex={selectedIndex}
            label="Default text"
            required={required}
            disabled={disabled}
            outlined={outlined}
            valid={valid}
            items={items}/>
        </div>
      </Fragment>
    );
  };

}
