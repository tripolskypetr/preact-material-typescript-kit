namespace Material {

  const {
    h
  } = preact;

  export function withType<T = any>(Component: preact.ComponentType<any>) {
    return (props: T) => <Component {...props}/>;
  }

}
