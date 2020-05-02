
/// <reference path="../components/index.ts"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  export const OtherPage = () => (
    <Fragment>
      <IconButton/>
      <Chip/>
      <Progress style={{width: '175px'}} progress={0.75}/>
    </Fragment>
  );

}