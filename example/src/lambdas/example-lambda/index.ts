import 'source-map-support';
import {APIGatewayProxyHandler, APIGatewayEvent} from 'aws-lambda';
// import { EnvironmentNames } from '../shared/constants';

export const handler: APIGatewayProxyHandler = async (_: APIGatewayEvent) => {
    return {
        statusCode: 200,
        body: ''
    }
};


