import { HttpMethodType, Swagger2PathEnum } from '../../..';

export const swagger2SchemaFilters = {
  isValidSwagger2Path: (swagger2PathEnum: Swagger2PathEnum): swagger2PathEnum is Swagger2PathEnum => {
    const [httpMethod] = swagger2PathEnum;

    if (HttpMethodType[httpMethod]) return true;

    return false;
  },
};
