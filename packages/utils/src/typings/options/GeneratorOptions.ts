export interface IGeneratorOptions {
  swaggerSchema: JSON;
  plugins: Array<IPlugin>;
  generator: IGenerator;
}
