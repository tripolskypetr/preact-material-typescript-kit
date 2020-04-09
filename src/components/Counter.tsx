namespace Material {

  const {useState, useCallback} = preactHooks;
  const {style} = typestyle;
  const {h} = preact;

  const greenClass = style({background: 'green'});

  /**
   * TODO: closure compiler jsx factory externs
   */
  export const Counter = () => {
    const [value, setValue] = useState(0);
    const increment = useCallback(() => {
      setValue(value + 1);
    }, [value]);
    const obj = {
      'some': {
        'prop1': 1,
      }
    };
    return (
      <div class={greenClass}>
        Counter: {value}
        <button class="test" onClick={increment}>
          <span className="material-icons">add_circle</span>
          {JSON.stringify(obj)}
        </button>
      </div>
    );
  };
}
