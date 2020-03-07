import { transform, camelCase } from 'lodash';

import { HttpMethodType } from '../..';

/**
 * Create MethodName from using swaggerPath and method
 * @param path UrlPath e.g. /pet/findById
 * @param httpMethod HttpMethod
 */
export function createSwaggerMethodNameByPathAndHttpMethod(path: string, httpMethod: HttpMethodType): string {
  const cleanPath = path.replace(/\/$/, '');

  let segments = cleanPath.split('/');

  if (cleanPath[0] === '') {
    segments = segments.slice(1);
  }

  segments = transform(segments, (result, segment) => {
    if (segment[0] === '{' && segment[segment.length - 1] === '}') {
      // eslint-disable-next-line no-param-reassign
      segment = `by${segment[1].toUpperCase()}${segment.substring(2, segment.length - 1)}`;
    }
    result.push(segment);
  });

  const endpointName = camelCase(segments.join('-'));
  const lowerCasedHttpVerb = httpMethod.toLowerCase();
  if (endpointName.length > 0) {
    const pascalCaseEndpointName = `${endpointName[0].toUpperCase()}${endpointName.substring(1)}`;
    return `${lowerCasedHttpVerb}${pascalCaseEndpointName}`;
  }

  return `rootEndpoint_${lowerCasedHttpVerb}`;
}
