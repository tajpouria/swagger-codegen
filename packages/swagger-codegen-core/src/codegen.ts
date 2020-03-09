import { CodeGenOptions } from '@swagger-codegen/utils';

import { SwaggerSchemaAnalyzer, Swagger2Analyzer } from './swaggerSchemaAnalyzers';

export class CodeGen {
  private codegenOptions: CodeGenOptions;

  private analyzer: SwaggerSchemaAnalyzer;

  constructor(codegenOptions: CodeGenOptions) {
    this.codegenOptions = codegenOptions;

    // TODO: Reliable operation on codegenOptions in order to switch between analyzers
    this.analyzer = new Swagger2Analyzer({ swagger2Schema: codegenOptions.swaggerSchema });
  }

  public generate(): string {
    const { codegenOptions, analyzer } = this;

    const abstractSwaggerSchemaTree = analyzer.createAbstractSwaggerSchemaTree();

    return JSON.stringify(codegenOptions);
  }
}
