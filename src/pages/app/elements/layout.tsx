
/// <reference path="../../../components/index.ts"/>

namespace Material {

  const {
    h,
    Fragment
  } = preact;

  const {
    style
  } = typestyle;

  const demoCell = style({
    backgroundColor: 'gray',
    minHeight: '10px',
  });

  const demoRow = style({
    backgroundColor: 'whitesmoke'
  });

  export namespace Elements {

    export const Layout = () => (
      <Fragment>
        <Grid>
          <Row className={demoRow}>
            <Cell className={demoCell} columns={6}></Cell>
            <Cell className={demoCell} columns={3}></Cell>
            <Cell className={demoCell} columns={2}></Cell>
            <Cell className={demoCell} columns={1}></Cell>
            <Cell className={demoCell} columns={3}></Cell>
            <Cell className={demoCell} columns={1}></Cell>
            <Cell className={demoCell} columns={8}></Cell>
          </Row>
        </Grid>
        <Grid>
          <Row className={demoRow} style="min-height: 75px;">
            <Cell className={demoCell} align='top'></Cell>
            <Cell className={demoCell} align='middle'></Cell>
            <Cell className={demoCell} align='bottom'></Cell>
          </Row>
        </Grid>
      </Fragment>
    );

  }

}
