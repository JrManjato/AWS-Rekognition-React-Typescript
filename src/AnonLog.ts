import AWS from "aws-sdk";
export function Anonlog() {
  AWS.config.region = process.env.REACT_APP_REGION
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_POOL_ID as string
  });
}