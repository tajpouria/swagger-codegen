import {
  Swagger2Schema,
  normalizeSwagger2ResponseDefinitions,
  AbstractSwagger2SchemaTree,
} from '@swagger-codegen/utils';

import { SwaggerSchemaAnalyzer } from '.';
import { swaggerSchemaNormalizer } from './swaggerSchemaAnalyzerCommons';

interface Swagger2AnalyzerConstructorProps {
  swagger2Schema: Swagger2Schema;
  swagger2SchemaNormalizer?(swaggerSchema: Swagger2Schema): Swagger2Schema;
}

export class Swagger2Analyzer implements SwaggerSchemaAnalyzer {
  private normalizedSwagger2Schema: Swagger2Schema;

  constructor({
    swagger2Schema,
    swagger2SchemaNormalizer = (_swagger2Schema: Swagger2Schema): Swagger2Schema =>
      swaggerSchemaNormalizer<Swagger2Schema>(_swagger2Schema, [normalizeSwagger2ResponseDefinitions]),
  }: Swagger2AnalyzerConstructorProps) {
    this.normalizedSwagger2Schema = swagger2SchemaNormalizer(swagger2Schema);
  }

  public createAbstractSwaggerSchemaTree(): void {
    const { normalizedSwagger2Schema } = this;

    const abstractSwagger2SchemaTreeTemp: AbstractSwagger2SchemaTree = {
      isES6: opts.isES6,
      description: swagger.info.description,
      isSecure: swagger.securityDefinitions !== undefined,
      isSecureToken: false,
      isSecureApiKey: false,
      isSecureBasic: false,
      moduleName: opts.moduleName,
      className: opts.className,
      imports: opts.imports,
      domain:
        swagger.schemes && swagger.schemes.length > 0 && swagger.host && swagger.basePath
          ? `${swagger.schemes[0]}://${swagger.host}${swagger.basePath.replace(/\/+$/g, '')}`
          : '',
      methods: [],
      definitions: [],
    };
  }
}
