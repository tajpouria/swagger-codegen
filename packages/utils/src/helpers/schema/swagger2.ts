import { flatten, entries } from 'lodash';

import {
  Swagger2Schema,
  Swagger2PathsObject,
  Swagger2PathAndMethodAndOperationAndParamaterListTuple,
  Swagger2PathsObjectEntriesTuple,
  HttpMethodType,
  Swagger2PathOperation,
} from '../../typings';

/**
 * Create a list of [path, pathMethod, pathOperation, Array<pathParameters>] from swagger2PathObject
 * @param paths Swagger2Schema paths property
 */
export function createSwagger2PathAndMethodAndOperationAndParamaterListTuple(
  paths: Swagger2PathsObject,
): Array<Swagger2PathAndMethodAndOperationAndParamaterListTuple> {
  return flatten(
    entries(paths).map(([path, api]: Swagger2PathsObjectEntriesTuple) => {
      entries(api)
        .filter((httpOperationEnum: [HttpMethodType, Swagger2PathOperation]): httpOperationEnum is [
          HttpMethodType,
          Swagger2PathOperation,
        ] => {
          return HttpMethodType[httpOperationEnum[0]];
        })
        .map(([methodType, pathOperation]: [HttpMethodType, Swagger2PathOperation]) => [
          path,
          methodType,
          pathOperation,
          api.paramter || [],
        ]);
    }),
  );
}

export function normalizeSwagger2ResponseDefinitions(swagger2Schema: Swagger2Schema): Swagger2Schema {
  const swagger2SchemaTemp = { ...swagger2Schema };

  swagger2SchemaTemp.definitions = swagger2SchemaTemp.definitions || {};

  const pathAndMethodAndOperationAndParamaterListTupleList = createSwagger2PathAndMethodAndOperationAndParamaterListTuple(
    swagger2Schema.paths,
  );

  return ('' as unknown) as Swagger2Schema;
}
