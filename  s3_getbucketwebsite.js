const AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'}); //add keys

s3 = new AWS.S3({apiVersion: '2006-03-01'});

var bucketParams = {Bucket: process.argv[2]};

s3.getBucketWebsite(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else if (data) {
    console.log("Success", data);
  }
});

var staticHostParams = {
  Bucket: '',
  WebsiteConfiguration: {
    ErrorDocument: {
      Key: ''
    },
    IndexDocument: {
      Suffix: ''
    },
  }
};

// Insert specified bucket name and index and error documents into params JSON
// from command line arguments
staticHostParams.Bucket = process.argv[2];
staticHostParams.WebsiteConfiguration.IndexDocument.Suffix = process.argv[3];
staticHostParams.WebsiteConfiguration.ErrorDocument.Key = process.argv[4];

// set the new website configuration on the selected bucket
s3.putBucketWebsite(staticHostParams, function(err, data) {
  if (err) {
    // display error message
    console.log("Error", err);
  } else {
    // update the displayed website configuration for the selected bucket
    console.log("Success", data);
  }
});

var AWS = require('aws-sdk');
var path = require("path");
var fs = require('fs');

const uploadDir = function(s3Path, bucketName) {

    let s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
    });

    function walkSync(currentDirPath, callback) {
        fs.readdirSync(currentDirPath).forEach(function (name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walkSync(filePath, callback);
            }
        });
    }

    walkSync(s3Path, function(filePath, stat) {
        let bucketPath = filePath.substring(s3Path.length+1);
        let params = {Bucket: bucketName, Key: bucketPath, Body: fs.readFileSync(filePath) };
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('Successfully uploaded '+ bucketPath +' to ' + bucketName);
            }
        });

    });
};

//cmd node s3_getbucketwebsite.js fec-booking
//node s3_setbucketwebsite.js BUCKET_NAME INDEX_PAGE ERROR_PAGE
//aws s3 cp booking s3://s3_fec-booking/booking/ --recursive