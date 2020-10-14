/*
import middy from '@middy/core';
import {
    APIGatewayEvent,
    APIGatewayProxyEvent,
    APIGatewayProxyHandler, APIGatewayProxyResult,
    Context, Handler
} from "aws-lambda";
import MiddlewareObject = middy.MiddlewareObject;

export type TypedParameterProxyEventType<ParameterType> = Omit<APIGatewayProxyEvent, 'pathParameters'> & { pathParameters: ParameterType };

export type ParamsMiddleware<ParameterType, ProxyResultType = APIGatewayProxyResult> = (parametersDescriptor: ParameterType) => MiddlewareObject<TypedParameterProxyEventType<ParameterType>, ProxyResultType>;

interface RequestParams {
    customerId: string;
}


const paramsMiddleware: ParamsMiddleware = (parameterDescriptor: any) => {

    return {
        before: (handler, next) => {
            handler.event.pathParameters
            next();
        }
    }
}

type ParameterSafeHandler<ParameterType, ProxyResultType = APIGatewayProxyResult> = Handler<TypedParameterProxyEventType<ParameterType>, ProxyResultType>;


const sampleHandler: ParameterSafeHandler<RequestParams> = (event, context) => {

}

const augmentedHandler = middy(sampleHandler)
    .use(paramsMiddleware({
        customerId: 'dawidhawd',
        test: 'bob'
    }));
*/
export const dummy =  '';