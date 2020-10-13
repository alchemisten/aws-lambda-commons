#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { AwsLambdaMiddlewaresExamplesStack } from '../lib/aws-lambda-middlewares-examples-stack';

const app = new App();

const stage = process.env.STAGE || 'dev';

new AwsLambdaMiddlewaresExamplesStack(app, `aws-lambda-middlewares-examples-${stage}`);