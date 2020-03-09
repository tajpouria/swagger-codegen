export interface SwaggerSchemaAnalyzer {
  createAbstractSwaggerSchemaTree(): any;
}

/**
 * Running a sets of actions on swagger schema in order to turn it into target shape
 * @param swagger2Schema Generated schema by swagger v2
 * @param normalizerMethodPipe A list of methods which each one receive swaggerSchema from previous do some action on it and retrieve it
 */
export const swaggerSchemaNormalizer = <SwaggerSchema>(
  swagger2Schema: SwaggerSchema,
  normalizerMethodPipe: Array<(swaggerSchema: SwaggerSchema) => SwaggerSchema>,
): SwaggerSchema =>
  normalizerMethodPipe.reduce((lastProducedSchema, method) => method(lastProducedSchema), swagger2Schema);
