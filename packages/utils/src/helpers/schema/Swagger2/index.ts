import { flatten, toPairs, get } from 'lodash';

import { sha } from '../..';
import {
  Swagger2Schema,
  HttpMethodType,
  Swagger2PathOperation,
  Swagger2PathsObject,
  Swagger2PathEnum,
} from '../../../typings';
import { swagger2SchemaFilters } from './operations';
import { makeSwagger2MethodNameFromSwagger2HttpMethodIdentifier } from './methods';

// TODO: Extract the Swagger2HttpMethodsIdentiferCreator to more appropriate place
// TODO: Should I ignore global api.parameters?
export interface Swagger2HttpMethodIdentifer {
  path: string;
  httpMethod: HttpMethodType;
  operation: Swagger2PathOperation;
}

export abstract class Swagger2HttpMethodsIdentiferCreator {
  private static identifierCollections: Record<string, Array<Swagger2HttpMethodIdentifer>> = {};

  private static createIdentifer(paths: Swagger2PathsObject): Array<Swagger2HttpMethodIdentifer> {
    // TODO: Is flatten necessary?
    return flatten(
      toPairs(paths).map(([path, swagger2Path]) =>
        toPairs<Swagger2PathEnum>(swagger2Path)
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

// TODO: Write this function doc when finalized
export function normalizeSwagger2ResponseDefinitions(swagger2Schema: Swagger2Schema): Swagger2Schema {
  // TODO: Should I ignore swagger.responses?
  const swagger2SchemaTemp = { ...swagger2Schema };

  swagger2SchemaTemp.definitions = swagger2SchemaTemp.definitions || {};

  const currentSchemaHttpMethodIdentifierList = Swagger2HttpMethodsIdentiferCreator.getIdentifier(swagger2Schema.paths);

  currentSchemaHttpMethodIdentifierList.forEach(httpMethodIdentifer => {
    toPairs(httpMethodIdentifer.operation.responses).forEach(([httpCode, resDefinition]) => {
      const { schema } = resDefinition;

      if (schema && !schema.$ref) {
        const methodName = makeSwagger2MethodNameFromSwagger2HttpMethodIdentifier(httpMethodIdentifer);
        const definitionName = `Response_${methodName}_${httpCode}`;
        swagger2SchemaTemp.definitions[definitionName] = schema;
        // TODO: Should I ignore resDefinition.schema = { $ref: `#/definitions/${definitionName }` }?;
      }
    });
  });

  // TODO: Should I ignore following action?
  // currentSchemaHttpMethodIdentifierList.forEach(({ operation: { responses } }) => {
  //   Object.keys(responses).forEach(res => {
  //     const ref = responses[res].$ref;

  //     if (ref) {
  //       // const definition = get(swagger2SchemaTemp, ref.substring(2).split('/')); // remove leading "#/"
  //       // responses[res] = definition;
  //     }
  //   });
  // });

  return swagger2SchemaTemp;
}
