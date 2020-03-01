import { HttpMethodType } from '..';

/**
 * Represent swagger2 schema
 *
 * { @link https://swagger.io/docs/specification/2-0/basic-structure/ }
 */
export type Swagger2 = Readonly<{
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
  paths: Readonly<Record<string, Path>>;
  // Input and Output Models
  definitions: Readonly<Record<string, Swagger2Type>>;
  // Parameters
  parameters: Readonly<Record<string, Swagger2Parameter>>;
  // Authentication
  securityDefinitions: Readonly<Record<Swagger2AuthTypes, Swagger2BasicAuth | Swagger2APIKeyAuth | Swagger2OAuth2>>;
}>;

export type Swagger2String = Swagger2Type &
  Readonly<{
    type: Swagger2RawType.string;
  }>;

export type Swagger2Number = Swagger2Type &
  Readonly<{
    type: Swagger2RawType.number | Swagger2RawType.integer;
    minimum?: number;
    maximum?: number;
  }>;

export type Swagger2Boolean = Swagger2Type &
  Readonly<{
    type: Swagger2RawType.boolean;
  }>;

export type SwaggerEnum = Swagger2Type &
  Readonly<{
    type: Swagger2RawType.enum;
    enum: ReadonlyArray<string>;
  }>;

export type Swagger2Dictionary = Swagger2Type &
  Readonly<{
    additionalProperties: Swagger2Type;
  }>;

export type SwaggerSchema = Swagger2Type & {
  schema: Swagger2Type;
};

export type Swagger2Array = Swagger2Type &
  Readonly<{
    type: Swagger2RawType.array;
    items: Swagger2Type;
    collectionFormat: Swagger2CollectionFormat;
    minItems?: number;
    maxItems?: number;
  }>;

export type SwaggerReference = Swagger2Type & {
  type: Swagger2RawType.reference;
  $ref: string;
};

type Swagger2Type = Readonly<
  Partial<{
    type: Swagger2RawType;
    required: boolean;
    description: string;
    $ref: string;
    properties: Record<string, Swagger2RawType>;
    additionalProperties?: boolean | Swagger2Type;
  }>
>;

enum Swagger2RawType {
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
enum Swagger2SchemeTypes {
  http = 'http',
  https = 'https',
  ws = 'ws',
  wss = 'wss',
}

// Paths
type Path = Readonly<Record<HttpMethodType, Swagger2PathOperation>>;

type Swagger2PathOperation = Readonly<{
  summary: string;
  security: Readonly<Record<Swagger2AuthTypes, ReadonlyArray<string>>>;
  description: string;
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
type Swagger2Parameter = Swagger2Type &
  Readonly<{
    name: string;
    in: Swagger2ParameterLocationType;
    default: string | number | boolean | ReadonlyArray<string | number | boolean>;
    collectionFormat: Swagger2CollectionFormat;
    allowEmptyValue: boolean;
    items: Swagger2Parameter;
    format: string;
  }>;

enum Swagger2ParameterLocationType {
  query = 'query',
  path = 'path',
  header = 'header',
  body = 'body',
  formData = 'formData',
}

enum Swagger2CollectionFormat {
  csv = 'csv', // Comma-separated values.
  ssv = 'ssv', // Space-separated values.
  tsv = 'tsv', // Tab-separated values.
  pipes = 'pipes', // Pipe-separated values.
  multi = 'multi', // Multiple parameter instances rather than multiple values. This is only supported for the in: query and in: formData parameters.
}

// Authentication
enum Swagger2AuthTypes {
  basic = 'basic',
  apiKey = 'apiKey',
  oauth2 = 'oauth2',
}

interface Swagger2BasicAuth {
  type: Swagger2AuthTypes.basic;
}

interface Swagger2APIKeyAuth {
  type: Swagger2AuthTypes.apiKey;
  in: string;
  name: string;
}

interface Swagger2OAuth2 {
  type: Swagger2AuthTypes.oauth2;
  flow: string;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: Record<string, string>;
}
