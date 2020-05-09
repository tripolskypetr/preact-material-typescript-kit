
/// <reference path="../../../components/index.ts"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  export namespace Elements {

    export const Other = () => (
      <Fragment>
        <IconButton/>
        <Chip/>
        <Progress style={{width: '175px'}} progress={0.75}/>
        <Slider max={10} value={3} style={{width: '175px'}} discrete={true} pin={true} marks={true}/>
        <CircularProgress thickness={10}/>
        <Calendar/>
      </Fragment>
    );

  }

}