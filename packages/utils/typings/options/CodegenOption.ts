export interface CodeGenOptions {
  readonly swagger: SwaggerSchema;
  plugins: Array<Plugin>;
  generator: Generator;
}
