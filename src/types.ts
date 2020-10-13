import {APIGatewayEvent, APIGatewayProxyResult} from "aws-lambda";
import middy from "@middy/core";
import MiddlewareObject = middy.MiddlewareObject;

export type MiddyApiGatewayProxyMiddleware = () => MiddlewareObject<APIGatewayEvent, APIGatewayProxyResult>;
