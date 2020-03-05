import { flatten, entries } from 'lodash';

import {
  Swagger2Schema,
  HttpMethodType,
  Swagger2PathOperation,
  Swagger2Parameter,
  Swagger2PathsObject,
  Swagger2Path,
} from '../../typings';

export interface Swagger2HttpMethodIdentifer {
  path: string;
  httpMethodType: HttpMethodType;
  Swagger2PathOperation: Swagger2PathOperation;
  globalParameters: ReadonlyArray<Swagger2Parameter>;
}

export class Swagger2HttpMethodsIdentiferCreator {
  private instance: Array<Swagger2HttpMethodIdentifer>;

  public constructor(swagger2Paths: Swagger2PathsObject) {
    this.instance = this.createInstance(swagger2Paths);
  }

  private createInstance(swagger2Paths: Swagger2PathsObject): Array<Swagger2HttpMethodIdentifer> {
    return flatten(
      entries(swagger2Paths).map(([path, swagger2Path]: [string, Swagger2Path]) =>
        entries(swagger2Path)
          .filter((aa: [HttpMethodType, Swagger2PathOperation]): httpOperationEnum is [
            HttpMethodType,
            Swagger2PathOperation,
          ] => {
            return HttpMethodType[httpOperationEnum[0]];
          })
          .map(([methodType, pathOperation]: [HttpMethodType, Swagger2PathOperation]) => ({
            path,
            methodType,
            pathOperation,
            globalParameters: api.paramter || [],
          })),
      ),
    );
  }

  public getInstance(): Array<Swagger2HttpMethodIdentifer> {
    return this.instance;
  }
}

export function normalizeSwagger2ResponseDefinitions(swagger2Schema: Swagger2Schema): Swagger2Schema {
  const swagger2SchemaTemp = { ...swagger2Schema };

  swagger2SchemaTemp.definitions = swagger2SchemaTemp.definitions || {};

  const pathAndMethodAndOperationAndParamaterListTupleList = createSwagger2PathAndMethodAndOperationAndParamaterListTuple(
    swagger2Schema.paths,
  );

  return ('' as unknown) as Swagger2Schema;
}
