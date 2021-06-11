module.exports = {
  production: {
    booking: "http://ec2-13-57-19-184.us-west-1.compute.amazonaws.com",
    overview: "http://ec2-35-163-3-32.us-west-2.compute.amazonaws.com"
  },
  development: {
    booking: "http://localhost:3002",
    overview: "http://localhost:3003/overview.js"
  },
  aws: {
    accessKeyId: "AKIAUQ4Y2QZOECW3EBG5",
    secretAccessKey: "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"
  },
  view: {
    booking_service: "http://ec2-13-57-19-184.us-west-1.compute.amazonaws.com:3002"
  }
}
