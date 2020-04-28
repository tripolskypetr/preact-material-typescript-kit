/// <reference path="./components/common/button.tsx"/>
/// <reference path="./components/common/icon.tsx"/>
/// <reference path="./components/common/checkbox.tsx"/>
/// <reference path="./components/common/radio.tsx"/>

namespace Material {

  const {h, render} = preact;

  const {useState} = preactHooks;

  const App = () => {
    const [checked, setChecked] = useState(true);
    const [radio, setRadio] = useState('');
    return (
      <div>
        <Checkbox label="hello!" checked={checked}/>
        <Button label="hello!" icon='add' onClick={() => setChecked(!checked)}/>
        <form>
          <Radio name="sampleGroup" value="1" label="First" onChange={({target}) => setRadio(target.value)} checked={radio === '1'}/>
          <Radio name="sampleGroup" value="2" label="Second" onChange={({target}) => setRadio(target.value)} checked={radio === '2'}/>
          <Radio name="sampleGroup" value="3" label="Third" onChange={({target}) => setRadio(target.value)} checked={radio === '3'}/>
        </form>
      </div>
    );
  };

  render(<App/>, document.body, document.body.lastChild as HTMLElement);

}
