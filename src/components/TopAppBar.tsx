namespace Material {

  const {useState, useCallback} = preactHooks;
  const {style} = typestyle;
  const {h} = preact;

  export namespace TopAppBar {

    export const enum TopBarSectionAlign {
      Start = 'mdc-top-app-bar__section--align-start',
      Center = 'mdc-top-app-bar__section--align-center',
      End = 'mdc-top-app-bar__section--align-end',
    };

    export const TopBarTitle = (props) => (
      <span class="mdc-top-app-bar__title">{props.label}</span>
    );

    export const TopBarNavigationIcon = (props) => (
      <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">{props.iconName}</button>
    );

    export const TopBarSection = (props: {align: TopBarSectionAlign} & any) => (
      <section class={['mdc-top-app-bar__section', props.align].join(' ')}>
        {props.children}
      </section>
    );

    export const TopBar = (props) => {
      return (
        <header class="mdc-top-app-bar">
          <div class="mdc-top-app-bar__row">
            {props.children}
          </div>
        </header>
      );
    };

  } // namespace TopAppBar

} // namespace Material
