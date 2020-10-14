import { APIGatewayEventLike, checkRequiredParams } from '../src';

describe('Required Params Lambda utils', () => {
    test('Simple test with existing parameters', async () => {
        const simpleEvent: APIGatewayEventLike = {
            body: '',
            pathParameters: {
                foo: 'abc',
                myNum: '123',
                myBool: 'true'
            }
        }

        const result = checkRequiredParams(simpleEvent, {
            foo: String,
            myNum: Number,
            myBool: Boolean
        });

        expect(typeof result.pathParameters.myNum).toBe('number');
        expect(typeof result.pathParameters.foo).toBe('string');
        expect(typeof result.pathParameters.myBool).toBe('boolean');
    });
})