
/// <reference path="../../../components/index.ts"/>

namespace Material {

  const {
    h
  } = preact;


  export namespace Elements {

    export const Dialog = () => {

      const alertClick = async () => {
        await DialogProvider.alert('Title', 'Message');
        console.log('done');
      };

      const promptClick = async () => {
        const v = await DialogProvider.prompt('Message', 'Default value');
        console.log('done', v);
      };

      const confirmClick = async () => {
        const v = await DialogProvider.confirm('title', 'message');
        console.log('done', v);
      };

      const selectClick = async () => {
        const v = await DialogProvider.select('title', ['a', 'b', 'c']);
        console.log('done', v);
      };

      const snackClick = async () => {
        await DialogProvider.snack('Message', 5000);
        console.log('done');
      };

      return (
        <div>
          <Button onClick={alertClick} label="Alert"/>
          <Button onClick={promptClick} label="Prompt"/>
          <Button onClick={snackClick} label="Snack"/>
          <Button onClick={confirmClick} label="Confirm"/>
          <Button onClick={selectClick} label="Select"/>
        </div>
      );
    }

  }

}