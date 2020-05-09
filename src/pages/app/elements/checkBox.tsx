
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

    export const CheckBox = () => {
      const [checked, setChecked] = useState(true);
      const [disabled, setDisbled] = useState(true);
      return (
        <Fragment>
          <Material.Checkbox label="hello" disabled={disabled} checked={checked}/>
          <Switch label="world" disabled={disabled} checked={checked}/>
          <Button label="Check" icon='add' onClick={() => setChecked(!checked)}/>
          <Button label="Disable" icon='backup' onClick={() => setDisbled(!disabled)}/>
        </Fragment>
      );
    };

  }

}
