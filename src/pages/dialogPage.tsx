
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
      await DialogProvider.prompt('Message', 'Default value');
      console.log('done');
    };

    const confirmClick = async () => {
      await DialogProvider.confirm();
      console.log('done');
    };

    const selectClick = async () => {
      await DialogProvider.select();
      console.log('done');
    };

    return (
      <Fragment>
        <Button onClick={alertClick} label="Alert"/>
        <Button onClick={promptClick} label="Prompt"/>
        <Button onClick={confirmClick} label="Confirm"/>
        <Button onClick={selectClick} label="Select"/>
      </Fragment>
    );
  }

}