module.exports = {
  aws: {
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey
  },
  production: {
    booking: "http://ec2-3-15-24-53.us-east-2.compute.amazonaws.com",
    overview: "https://fec-overview.s3-us-west-2.amazonaws.com/overview.js"
  },
  development: {
    overview: "http://localhost:3003/overview.js"
  }
}