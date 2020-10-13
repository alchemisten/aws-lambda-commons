import * as cdk from '@aws-cdk/core';
// import { AttributeType, BillingMode, Table as DynamoDbTable } from "@aws-cdk/aws-dynamodb";
// import { Bucket } from "@aws-cdk/aws-s3";
import { RemovalPolicy } from "@aws-cdk/core";

export class AwsLambdaMiddlewaresExamplesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stage = process.env.STAGE || 'dev';

    // example dynamodb table
    const exampleDatabaseName = this.node.tryGetContext('@db:example-table')+ '-' + stage;

    // const exampleDatabase = new DynamoDbTable(this, exampleDatabaseName, {
    //   tableName: exampleDatabaseName,
    //   partitionKey: {
    //     name: 'id',
    //     type: AttributeType.STRING,
    //   },
    //   billingMode: BillingMode.PAY_PER_REQUEST,
    //   removalPolicy: RemovalPolicy.DESTROY,
    // });
    //
    // // example asset
    // const assetsBucketName = this.node.tryGetContext('@s3:zimmermann-discount-media-assets') + '-' + stage;
    //
    // const assetsBucket = new Bucket(this, 'assets-bucket', {
    //   bucketName: assetsBucketName,
    //   removalPolicy: RemovalPolicy.RETAIN,
    // });

    

    

  }
}
