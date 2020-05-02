namespace Material {

  const {
    createElement,
  } = preact;

  const CSS_CLASSES = {
    ROOT: 'mdc-layout-grid',
    INNER: 'mdc-layout-grid__inner',
    CELL: 'mdc-layout-grid__cell',
    CELL_SPAN: 'mdc-layout-grid__cell--span',
    CELL_ORDER: 'mdc-layout-grid__cell--order',
    CELL_ALIGN: 'mdc-layout-grid__cell--align',
    FIXED_COLUMN_WIDTH: 'mdc-layout-grid--fixed-column-width',
    ALIGN: 'mdc-layout-grid--align',
  };

  const DEVICE_TYPE = {
    DESKTOP: 'desktop',
    PHONE: 'phone',
    TABLET: 'tablet',
  };

  namespace Internal {

    export const Cell = ({
      align = 'middle',
      children = null,
      className = '',
      columns = null,
      desktopColumns = null,
      order = null,
      phoneColumns = null,
      tabletColumns = null,
      tag = 'div',
      ...otherProps
    }) => {
      const classes = () => classNames(CSS_CLASSES.CELL, className, {
        [`${CSS_CLASSES.CELL_ALIGN}-${align}`]: align,
        [`${CSS_CLASSES.CELL_ORDER}-${order}`]: order,
        [`${CSS_CLASSES.CELL_SPAN}-${columns}`]: columns,
        [`${CSS_CLASSES.CELL_SPAN}-${desktopColumns}-${DEVICE_TYPE.DESKTOP}`]: desktopColumns,
        [`${CSS_CLASSES.CELL_SPAN}-${phoneColumns}-${DEVICE_TYPE.PHONE}`]: phoneColumns,
        [`${CSS_CLASSES.CELL_SPAN}-${tabletColumns}-${DEVICE_TYPE.TABLET}`]: tabletColumns,
      });
      return createElement(tag, {
        className: classes(),
        ...otherProps,
      }, children);
    };

    export const Grid = ({
      align = 'left',
      children = null,
      className = '',
      fixedColumnWidth = false,
      tag = 'div',
      ...otherProps
    }) => {
      const classes = () => classNames(CSS_CLASSES.ROOT, className, {
        [`${CSS_CLASSES.ALIGN}-${align}`]: align,
        [CSS_CLASSES.FIXED_COLUMN_WIDTH]: fixedColumnWidth,
      });
      return createElement(tag, {
        className: classes(),
        ...otherProps
      }, children);
    };

    export const Row = ({
      children = null,
      className = '',
      tag = 'div',
      ...otherProps
    }) => {
      const classes = () => classNames(CSS_CLASSES.INNER, className);
      return createElement(tag, {
        className: classes(),
        ...otherProps
      }, children);
    };

    export type CellProps = Parameters<typeof Cell>[0];
    export type GridProps = Parameters<typeof Grid>[0];

  }

  type TwelveColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  type EightColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  type Alignment = 'bottom' | 'middle' | 'top';
  type FourColumn = 1 | 2 | 3 | 4;

  interface CellProps extends Internal.CellProps {
    align?: Alignment;
    columns?: TwelveColumn;
    desktopColumns?: TwelveColumn;
    order?: TwelveColumn;
    phoneColumns?: FourColumn;
    tabletColumns?: EightColumn;
  }

  interface GridProps extends Internal.GridProps {
    align?: 'left' | 'right';
  }

  export const Cell = withType<CellProps>(Internal.Cell);
  export const Grid = withType<GridProps>(Internal.Grid);
  export const Row = Internal.Row;

}
