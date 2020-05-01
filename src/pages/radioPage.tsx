
/// <reference path="../components/index.ts"/>

namespace Material {

  const {
    h,
  } = preact;

  const {
    useState,
  } = preactHooks;

  export const RadioPage = () => {
    const [radio, setRadio] = useState('');
    const [disabled, setDisbled] = useState(true);
    return (
      <div>
        <Radio disabled={disabled} name="sampleGroup" value="1" label="First" onChange={({target}) => setRadio(target.value)} checked={radio === '1'}/>
        <Radio disabled={disabled} name="sampleGroup" value="2" label="Second" onChange={({target}) => setRadio(target.value)} checked={radio === '2'}/>
        <Radio disabled={disabled} name="sampleGroup" value="3" label="Third" onChange={({target}) => setRadio(target.value)} checked={radio === '3'}/>
        <Button label="Disable" icon='backup' onClick={() => setDisbled(!disabled)}/>
      </div>
    );
  };

}