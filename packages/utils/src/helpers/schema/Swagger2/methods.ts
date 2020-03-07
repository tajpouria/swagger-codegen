import { camelCase } from 'lodash';

import { Swagger2HttpMethodIdentifer } from '.';
import { createSwaggerMethodNameByPathAndHttpMethod } from '../schemaCommons';

export function makeSwagger2MethodNameFromSwagger2HttpMethodIdentifier({
  path,
  httpMethod,
  operation,
}: Swagger2HttpMethodIdentifer): string {
  const { operationId } = operation;

  return operationId ? camelCase(operationId) : createSwaggerMethodNameByPathAndHttpMethod(path, httpMethod);
}
