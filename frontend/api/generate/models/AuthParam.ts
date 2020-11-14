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
 * @interface AuthParam
 */
export interface AuthParam {
    /**
     * 
     * @type {string}
     * @memberof AuthParam
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof AuthParam
     */
    password: string;
}

export function AuthParamFromJSON(json: any): AuthParam {
    return AuthParamFromJSONTyped(json, false);
}

export function AuthParamFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthParam {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'userId': json['user_id'],
        'password': json['password'],
    };
}

export function AuthParamToJSON(value?: AuthParam | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'user_id': value.userId,
        'password': value.password,
    };
}

