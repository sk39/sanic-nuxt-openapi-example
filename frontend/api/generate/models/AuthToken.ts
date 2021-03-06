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
 * @interface AuthToken
 */
export interface AuthToken {
    /**
     * 
     * @type {string}
     * @memberof AuthToken
     */
    refreshToken: string;
    /**
     * 
     * @type {string}
     * @memberof AuthToken
     */
    accessToken: string;
}

export function AuthTokenFromJSON(json: any): AuthToken {
    return AuthTokenFromJSONTyped(json, false);
}

export function AuthTokenFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthToken {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'refreshToken': json['refresh_token'],
        'accessToken': json['access_token'],
    };
}

export function AuthTokenToJSON(value?: AuthToken | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'refresh_token': value.refreshToken,
        'access_token': value.accessToken,
    };
}


