import { APIGatewayEventLike } from '../types';

export interface FieldViolationMsg {
    name: string,
    value?: string,
    msg: string
}
export interface ValidationError extends Error {
    fields: FieldViolationMsg[]
}

export interface RequiredParamsCheckResult<Params> {
    error?: ValidationError;
    pathParameters: Params;
}

export type PathParamValueType = StringConstructor | NumberConstructor | BooleanConstructor;
export type PathParamMap = { [key: string]: PathParamValueType };
export type PathParamValueMap<PathParamMapType extends PathParamMap> = { [key in keyof PathParamMapType]: ReturnType<PathParamMapType[key]> };

export const checkRequiredParams: <P extends PathParamMap, ParamReturnType = PathParamValueMap<P>>( event: APIGatewayEventLike, params: P) => RequiredParamsCheckResult<ParamReturnType> = ( event, params ) => {
    const eventParameters = event.pathParameters;

    const result = {
        pathParameters: {}
    } as RequiredParamsCheckResult<any>

    // If no parameters where passed and the provided path parameters are also empty everything is fine and we can return none which states there are no validation errors.
    if ( (!params || Object.keys(params).length === 0) && !eventParameters ) {
        return result;
    }
    const validationError: ValidationError = {
        fields: [],
        message: 'The path parameters check returned that some required parameters where not provided for the specific call.',
        name: 'Path parameters validation error.'
    }

    for ( const param in params ) {
        if(params.hasOwnProperty(param)) {
            if ( !eventParameters || !eventParameters[ param ] ) {
                validationError.fields.push( {
                    msg: `The required path parameter ${ param } was not provided.`,
                    name: param,
                    value: undefined
                } )
            } else {
                result.pathParameters[param] = params[param](eventParameters[param]);
            }
        }
    }

    if(validationError.fields.length > 0) {
        result.error = validationError;
    }

    return result
}