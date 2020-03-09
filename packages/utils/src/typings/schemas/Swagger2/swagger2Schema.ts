import { HttpMethodType } from '../..';

// TODO: Remove unnecessary Readonly types

/**
 * Represent swagger2 schema
 *
 * @link https://swagger.io/docs/specification/2-0/basic-structure/
 */
export type Swagger2Schema = Readonly<{
  // Metadata
  swagger: string;
  info: Readonly<{
    title: string;
    version: string;
    description: string;
  }>;
  // Base URL
  host: string;
  basePath: string;
  schemes: ReadonlyArray<Swagger2SchemeTypes>;
  // Consumes, Produces
  consumes: ReadonlyArray<string>;
  produces: ReadonlyArray<string>;
  // Paths
  paths: Swagger2PathsObject;
  // Input and Output Models
  definitions: Record<string, Swagger2Type>;
  // Parameters
  parameters: Record<string, Swagger2Parameter>;
  // Authentication
  securityDefinitions: Record<Swagger2AuthTypes, Swagger2BasicAuth | Swagger2APIKeyAuth | Swagger2OAuth2>;
}>;

export type Swagger2StringType = Swagger2Type &
  Readonly<{
    type: Swagger2RawType.string;
  }>;

export type Swagger2NumberType = Swagger2Type &
  Readonly<{
    type: Swagger2RawType.number | Swagger2RawType.integer;
    minimum?: number;
    maximum?: number;
  }>;

export type Swagger2BooleanType = Swagger2Type &
  Readonly<{
    type: Swagger2RawType.boolean;
  }>;

export type SwaggerEnumType = Swagger2Type &
  Readonly<{
    type: Swagger2RawType.enum;
    enum: ReadonlyArray<string>;
  }>;

export type Swagger2DictionaryType = Swagger2Type &
  Readonly<{
    additionalProperties: Swagger2Type;
  }>;

export type SwaggerSchemaType = Swagger2Type & {
  schema: Swagger2Type;
};

export type Swagger2ArrayType = Swagger2Type &
  Readonly<{
    type: Swagger2RawType.array;
    items: Swagger2Type;
    collectionFormat: Swagger2CollectionFormat;
    minItems?: number;
    maxItems?: number;
  }>;

export type SwaggerReferenceType = Swagger2Type & {
  type: Swagger2RawType.reference;
  $ref: string;
};

export type Swagger2Type = Partial<{
  type: Swagger2RawType;
  required: boolean;
  description: string;
  $ref: string;
  properties: Record<string, Swagger2RawType>;
  additionalProperties: boolean | Swagger2Type;
  schema: Swagger2Type;
}>;

export enum Swagger2RawType {
  object = 'object',
  string = 'string',
  boolean = 'boolean',
  number = 'number',
  integer = 'integer',
  array = 'array',
  enum = 'enum',
  schema = 'schema',
  reference = 'reference',
}

// Base URL
export enum Swagger2SchemeTypes {
  http = 'http',
  https = 'https',
  ws = 'ws',
  wss = 'wss',
}

// Paths
export type Swagger2PathsObject = Readonly<Record<string, Swagger2Path>>;

export type Swagger2Path = Readonly<Record<HttpMethodType, Swagger2PathOperation>>;

export type Swagger2PathEnum = [HttpMethodType, Swagger2PathOperation];

export type Swagger2PathOperation = Readonly<{
  summary: string;
  security: Readonly<Record<Swagger2AuthTypes, ReadonlyArray<string>>>;
  description: string;
  operationId: string;
  tags: ReadonlyArray<string>;
  produces: ReadonlyArray<string>;
  consumes: ReadonlyArray<string>;
  parameters: ReadonlyArray<Swagger2Parameter>;
  responses: Record<string, Swagger2Type>;
  externalDocs: Partial<{
    url: string;
    description: string;
  }>;
  deprecated: boolean;
}>;

// Parameters
export type Swagger2Parameter = Swagger2Type &
  Readonly<{
    name: string;
    in: Swagger2ParameterLocationType;
    default: string | number | boolean | ReadonlyArray<string | number | boolean>;
    collectionFormat: Swagger2CollectionFormat;
    allowEmptyValue: boolean;
    items: Swagger2Parameter;
    format: string;
  }>;

export enum Swagger2ParameterLocationType {
  query = 'query',
  path = 'path',
  header = 'header',
  body = 'body',
  formData = 'formData',
}

export enum Swagger2CollectionFormat {
  csv = 'csv', // Comma-separated values.
  ssv = 'ssv', // Space-separated values.
  tsv = 'tsv', // Tab-separated values.
  pipes = 'pipes', // Pipe-separated values.
  multi = 'multi', // Multiple parameter instances rather than multiple values. This is only supported for the in: query and in: formData parameters.
}

// Authentication
export enum Swagger2AuthTypes {
  basic = 'basic',
  apiKey = 'apiKey',
  oauth2 = 'oauth2',
}

export interface Swagger2BasicAuth {
  type: Swagger2AuthTypes.basic;
}

export interface Swagger2APIKeyAuth {
  type: Swagger2AuthTypes.apiKey;
  in: string;
  name: string;
}

export interface Swagger2OAuth2 {
  type: Swagger2AuthTypes.oauth2;
  flow: string;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: Record<string, string>;
}
