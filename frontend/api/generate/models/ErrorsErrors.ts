/* tslint:disable */
/* eslint-disable */
/**
 * todo
 * Todo app api
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ErrorsErrors
 */
export interface ErrorsErrors {
    /**
     * 
     * @type {string}
     * @memberof ErrorsErrors
     */
    message: string;
}

export function ErrorsErrorsFromJSON(json: any): ErrorsErrors {
    return ErrorsErrorsFromJSONTyped(json, false);
}

export function ErrorsErrorsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorsErrors {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': json['message'],
    };
}

export function ErrorsErrorsToJSON(value?: ErrorsErrors | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
    };
}

