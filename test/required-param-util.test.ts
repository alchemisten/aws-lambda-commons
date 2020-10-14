import { checkRequiredParams, APIGatewayEventLike } from '../src';

describe('Required Params Lambda utils', () => {
    const pathParameterSchema = {
        sampleId: String,
        sampleNumber: Number,
        sampleBool: Boolean
    }

    const getAwsLikeEvent: (sampleId: any, sampleNumber: any, sampleBool: any ) => APIGatewayEventLike = (sampleId, sampleNumber, sampleBool) => {
        return {
            body: '',
            pathParameters: {
                sampleId: `${sampleId}`,
                sampleNumber: `${sampleNumber}`,
                sampleBool: `${sampleBool}`
            }
        }
    }

    test('Simple test with existing and valid parameters and schema.', async () => {
        const sampleId = "SAMPLE_ID_VALUE";
        const sampleNumber = 217635821123;
        const sampleBool = false;

        const result = checkRequiredParams(getAwsLikeEvent(sampleId, sampleNumber, sampleBool), pathParameterSchema);

        expect(typeof result.pathParameters.sampleId).toBe('string');
        expect(result.pathParameters.sampleId).toBe(sampleId);

        expect(typeof result.pathParameters.sampleNumber).toBe('number');
        expect(result.pathParameters.sampleNumber).toBe(sampleNumber);

        expect(typeof result.pathParameters.sampleBool).toBe('boolean');
        expect(result.pathParameters.sampleBool).toBe(sampleBool);
    });

    test('Simple test with existing wrong parameters', async () => {
        const sampleAwsHttpEvent: APIGatewayEventLike = {
            body: '',
            pathParameters: {
                sampleId: 'SAMPLE_ID_VALUE',
                sampleNumber: '213412343',
                sampleBool: '789'
            }
        }

        const result = checkRequiredParams(sampleAwsHttpEvent, pathParameterSchema);

        expect(result.error).toBeDefined()
        if(result.error){
            expect(result.error.fields.length).toBe(1);
        }
    });

    test('Simple test with missing parameters', async () => {
        const sampleAwsHttpEvent: APIGatewayEventLike = {
            body: '',
            pathParameters: {}
        }

        const result = checkRequiredParams(sampleAwsHttpEvent, pathParameterSchema);

        expect(result.error).toBeDefined()
        if(result.error){
            expect(result.error.fields.length).toBe(Object.keys(pathParameterSchema).length);
        }
    });


    test('Simple test with big numbers parameters', async () => {
        const sampleId = "SAMPLE_ID_VALUE";
        const bigNumber = Math.pow(Number.MAX_SAFE_INTEGER, 3);
        const sampleBool = true;

        const result = checkRequiredParams(getAwsLikeEvent(sampleId, bigNumber, sampleBool), pathParameterSchema);

        expect(result.pathParameters.sampleId).toBe(sampleId);
        expect(typeof result.pathParameters.sampleNumber).toBe('number');
        expect(result.pathParameters.sampleNumber).toBe(bigNumber);
        expect(result.pathParameters.sampleBool).toBe(sampleBool);
    });
})
