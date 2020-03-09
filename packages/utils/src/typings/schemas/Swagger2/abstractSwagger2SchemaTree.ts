import { Swagger2AbstractSchemaTreeMethod } from '.';

export interface AbstractSwagger2SchemaTree {
  description: string;
  isSecure: boolean;
  moduleName: string;
  className: string;
  imports: ReadonlyArray<string>;
  domain: string;
  isSecureToken: boolean;
  isSecureApiKey: boolean;
  isSecureBasic: boolean;
  methods: Array<Swagger2AbstractSchemaTreeMethod>;
  definitions: Definition[];
}
