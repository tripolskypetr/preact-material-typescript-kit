
/// <reference path="../components/index.ts"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  export const DialogPage = () => {

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
      await DialogProvider.select();
      console.log('done');
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