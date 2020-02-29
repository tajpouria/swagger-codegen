import { HttpMethod } from '..';

/**
 * Represent swagger2 schema
 *
 * { @link https://swagger.io/docs/specification/2-0/basic-structure/ }
 */
export interface Swagger {
  // Metadata
  readonly swagger: string;
  readonly info: {
    readonly title: string;
    readonly version: string;
    readonly description: string;
  };
  // Base URL
  readonly host: string;
  readonly basePath: string;
  readonly schemes: ReadonlyArray<SchemeTypes>;
  // Consumes, Produces
  readonly produces: ReadonlyArray<string>;
  readonly consumes: ReadonlyArray<string>;
  // Paths
  readonly paths: Record<string, Path>;
  // Parameters
  readonly parameters: Record<string, Parameter>;
  // Authentication
  readonly securityDefinitions: Record<AuthTypes, BasicAuth | APIKeyAuth | OAuth2>;
  // Input and Output Models
  readonly definitions: {
    readonly [index: string]: SwaggerType;
  };
}

// Base URL
enum SchemeTypes {
  http = 'http',
  https = 'https',
  ws = 'ws',
  wss = 'wss',
}

// Paths
type Path = { readonly [op in HttpMethod]?: HttpOperation } & {
  readonly parameters?: ReadonlyArray<Parameter>;
};

// Parameters
interface Parameter extends SwaggerType {
  readonly name: string;
  readonly camelCaseName: string;
  readonly 'x-exclude-from-bindings'?: boolean;
  readonly 'x-proxy-header'?: string;
  readonly 'x-name-pattern'?: string;
  readonly collectionFormat?: CollectionFormat;
  readonly $ref: string;
  readonly enum: ReadonlyArray<any>;
  readonly isSingleton: boolean;
  readonly singleton: any; // TODO: Remove this any.
  readonly in: 'body' | 'query' | 'header' | 'formData' | 'path';
  readonly required: boolean;
}

// Authentication
enum AuthTypes {
  basic = 'basic',
  apiKey = 'apiKey',
  oauth2 = 'oauth2',
}

interface BasicAuth {
  type: AuthTypes.basic;
}

interface APIKeyAuth {
  type: AuthTypes.apiKey;
  in: string;
  name: string;
}

interface OAuth2 {
  type: AuthTypes.oauth2;
  flow: string;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: Record<string, string>;
}
