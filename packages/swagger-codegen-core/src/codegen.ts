import { CodeGenOptions } from '@swagger-codegen/utils';

import { SwaggerAnalyzer, Swagger2Analyzer } from './swaggerAnalyzers';

export class CodeGen {
  private codegenOptions: CodeGenOptions;

  private analyzer: SwaggerAnalyzer;

  constructor(codegenOptions: CodeGenOptions) {
    this.codegenOptions = codegenOptions;

    // TODO: Reliable operation on codegenOptions in order to switch between analyzers
    this.analyzer = new Swagger2Analyzer({ swagger2Schema: codegenOptions.swaggerSchema });
  }

  public generate(): string {
    const { codegenOptions, analyzer } = this;

    const abstractSwaggerTree = analyzer.createAbstractSwaggerTree();

    return JSON.stringify(codegenOptions);
  }
}
