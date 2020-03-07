import { CodeGen } from '@swagger-codegen/core';

import { pet } from './testSwaggerSchemas';

const codegen = new CodeGen({ swaggerSchema: pet });

codegen.generate();
