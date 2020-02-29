export interface IPreGeneratedSchema {
  [path: string]: IPreGeneratedSchemaMethods;
}

export interface IPreGeneratedSchemaMethods<T> {
  [method: MethodType]: () => Promise<T>;
}
