/// <reference path="./components/button/index.tsx"/>
/// <reference path="./components/icon/index.tsx"/>
/// <reference path="./components/checkbox/index.tsx"/>
/// <reference path="./components/radio/index.tsx"/>

namespace Material {

  const {h, render} = preact;

  const {useState} = preactHooks;

  const App = () => {
    const [checked, setChecked] = useState(true);
    return (
      <div>
        <Checkbox label="hello!" checked={checked}/>
        <Button icon={<Icon icon="add"/>} onClick={() => setChecked(!checked)}>
          Hello!
        </Button>
        <form>
          <Radio name="sampleGroup" value="1" label="First"/>
          <Radio name="sampleGroup" value="2" label="Second" checked={true}/>
          <Radio name="sampleGroup" value="3" label="Third"/>
        </form>
      </div>
    );
  };

  render(<App/>, document.body, document.body.lastChild as HTMLElement);

}
