import { APIGatewayEvent } from 'aws-lambda';


export type APIGatewayEventLike = Pick<APIGatewayEvent, 'pathParameters' | 'body'> & Partial<APIGatewayEvent>