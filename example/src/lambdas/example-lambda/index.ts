import 'source-map-support';
import {APIGatewayProxyHandler, APIGatewayEvent} from 'aws-lambda';

export const handleRequest: APIGatewayProxyHandler = async (_: APIGatewayEvent) => {
    return {
        statusCode: 200,
        body: ''
    }
};
