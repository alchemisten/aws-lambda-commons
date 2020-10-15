import { ValidationError, APIGatewayEventLike } from '../types/';

export interface RequiredParamsCheckResult<Params> {
    error?: ValidationError;
    pathParameters: Params;
}

export type PathParameterValueType = StringConstructor | NumberConstructor | BooleanConstructor;
export type PathParameterTypeMap = { [key: string]: PathParameterValueType };
export type PathParameterValueMap<PathParamMapType extends PathParameterTypeMap> = { [key in keyof PathParamMapType]: ReturnType<PathParamMapType[key]> };

export const checkRequiredParams: <P extends PathParameterTypeMap, ParamReturnType = PathParameterValueMap<P>>(event: APIGatewayEventLike, params: P) => RequiredParamsCheckResult<ParamReturnType> = (event, params ) => {
    const eventParameters = event.pathParameters;

    const result = {
        pathParameters: {}
    } as RequiredParamsCheckResult<any>

    // If no parameters have been passed and the specified path parameters are also empty, everything is fine and we can return an empty object saying that there are no validation errors.
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
                const valueConstructor = params[param];
                const paramStrValue: string = eventParameters[param];
                try {
                    if(valueConstructor.name === 'Boolean') {
                        if(paramStrValue === 'true'){
                            result.pathParameters[param] = true;
                        } else if(paramStrValue === 'false'){
                            result.pathParameters[param] = false;
                        } else {
                            throw new Error();
                        }
                    }
                    else {
                        result.pathParameters[param] = valueConstructor(paramStrValue);
                    }
                } catch {
                    validationError.fields.push( {
                        msg: `The required path parameter ${ param } was provided but had the wrong type. Should have been of type: ${valueConstructor.name} or at least castable to it.`,
                        name: param,
                        value: paramStrValue
                    } )
                }
            }
        }
    }

    if(validationError.fields.length > 0) {
        result.error = validationError;
    }

    return result
}
