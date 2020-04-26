namespace Material {

  const { h } = preact;
  export namespace Common {
    namespace Internal {
      export const Unknown = () => <span class="tpmk__missingChild"></span>;
    }
    export const unknown = <Internal.Unknown/>
  }

}
