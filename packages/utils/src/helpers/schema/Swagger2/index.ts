import { flatten, entries } from 'lodash';

import { sha } from '../..';
import {
  Swagger2Schema,
  HttpMethodType,
  Swagger2PathOperation,
  Swagger2PathsObject,
  Swagger2PathEnum,
} from '../../../typings';
import { swagger2SchemaFilters } from './operations';

// TODO: Should I ignore global api.parameters
export interface Swagger2HttpMethodIdentifer {
  path: string;
  httpMethod: HttpMethodType;
  operation: Swagger2PathOperation;
}

export abstract class Swagger2HttpMethodsIdentiferCreator {
  private static identifierCollections: Record<string, Array<Swagger2HttpMethodIdentifer>> = {};

  private static createIdentifer(paths: Swagger2PathsObject): Array<Swagger2HttpMethodIdentifer> {
    // TODO: is flatten necessary
    return flatten(
      entries(paths).map(([path, swagger2Path]) =>
        entries<Swagger2PathEnum>(swagger2Path)
          // TODO: Solve following craps
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          .filter<Swagger2PathEnum>((swagger2PathEnum: Swagger2PathEnum) =>
            swagger2SchemaFilters.isValidSwagger2Path(swagger2PathEnum as Swagger2PathEnum),
          )
          .map(([httpMethod, operation]: Swagger2PathEnum) => ({
            path,
            httpMethod,
            operation,
          })),
      ),
    );
  }

  public static getIdentifier(paths: Swagger2PathsObject): Array<Swagger2HttpMethodIdentifer> {
    const { identifierCollections, createIdentifer } = this;

    const pathShaRepresentation = sha(paths);

    if (!identifierCollections[pathShaRepresentation]) {
      Swagger2HttpMethodsIdentiferCreator.identifierCollections[pathShaRepresentation] = createIdentifer(paths);
    }

    return identifierCollections[pathShaRepresentation];
  }
}

export function normalizeSwagger2ResponseDefinitions(swagger2Schema: Swagger2Schema): Swagger2Schema {
  const swagger2SchemaTemp = { ...swagger2Schema };

  swagger2SchemaTemp.definitions = swagger2SchemaTemp.definitions || {};

  const currentSchemaHttpMethodIdentifierList = Swagger2HttpMethodsIdentiferCreator.getIdentifier(swagger2Schema.paths);

  console.info(currentSchemaHttpMethodIdentifierList);

  return ('' as unknown) as Swagger2Schema;
}
