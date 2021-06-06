module.exports = {
  dev: {
    booking: "http://localhost:3002/booking",
    overview: "http://localhost:3003/overview",
    reviews: "http://localhost:3001/reviews",
    photogallery: "http://localhost:3004/photogallery"
  },
  prod: {
    booking: "http://ec2-3-15-24-53.us-east-2.compute.amazonaws.com",
    overview: "http://ec2-35-163-3-32.us-west-2.compute.amazonaws.com",
    reviews: "http://ec2-54-193-152-3.us-west-1.compute.amazonaws.com",
    photogallery: "http://ec2-54-183-90-91.us-west-1.compute.amazonaws.com"
  }
}

