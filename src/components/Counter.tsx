namespace Material {

  const {useState, useCallback} = preactHooks;
  const {h} = preact;

  export const Counter = () => {
    const [value, setValue] = useState(0);
    const increment = useCallback(() => {
      setValue(value + 1);
    }, [value]);
    return (
      <div>
        Counter: {value}
        <button onClick={increment}>
          <span className="material-icons">add_circle</span>
        </button>
      </div>
    );
  };
}
