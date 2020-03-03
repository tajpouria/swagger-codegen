import { Swagger2Schema, normalizeSwagger2ResponseDefinitions } from '@swagger-codegen/utils';

import { SwaggerAnalyzer } from '.';
import { swaggerSchemaNormalizer } from './commons';

interface Swagger2AnalyzerConstructorProps {
  swagger2Schema: Swagger2Schema;
  swagger2SchemaNormalizer?(swaggerSchema: Swagger2Schema): Swagger2Schema;
}

export class Swagger2Analyzer implements SwaggerAnalyzer {
  private normalizedSwagger2Schema: Swagger2Schema;

  constructor({
    swagger2Schema,
    swagger2SchemaNormalizer = (_swagger2Schema: Swagger2Schema): Swagger2Schema =>
      swaggerSchemaNormalizer<Swagger2Schema>(_swagger2Schema, [normalizeSwagger2ResponseDefinitions]),
  }: Swagger2AnalyzerConstructorProps) {
    this.normalizedSwagger2Schema = swagger2SchemaNormalizer(swagger2Schema);
  }

  public createAbstractSwaggerTree(): void {
    const { normalizedSwagger2Schema } = this;
    console.info(normalizedSwagger2Schema);
  }
}
