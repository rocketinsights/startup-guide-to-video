[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
## A startups guide to video

The purpose of this project is to serve as a simple foundation for any company looking to allow users to upload content, prepare that video for playback and ultimately play it back. We created this project because at [Rocket Insights](http://www.rocketinsights.com) we have helped a number of customers solve this exact problem. We have made a concerted effort to keep this tutorial focused on best practices in regards to video and purposely left out features such as user authentication, error handling...etc. Additional to help make this topic more digestable we have broken it up into three parts:

1. Getting the video from the client.

2. Encoding the video for playback. (Coming soon...)

3. Playing back the video. (Coming soon...)

## Getting started

* Create an [AWS account](https://aws.amazon.com/free/).

* Sign into the console and create a new bucket in S3.

* Create a [new user](https://console.aws.amazon.com/iam/home#users). Make sure you check the `Generate an access key for each user` checkbox. After you create the user download their credentials.

* Clone this repo.

* Open this repo in your favorite code editor. Open the all.js file and edit the variables at the top with your values: 

```
var region = process.env.REGION || 'Your region. Probably us-east-1'
var accessKeyId = process.env.ACCESS_KEY_ID || 'Your access key here'
var secretAccessKey = process.env.SECRET_ACCESS_KEY || 'Your secret key here'
var bucket = process.env.BUCKET || 'your bucket name here'
```

* npm install

* npm start

Now try and upload a video. Assuming all is successful you should see a progress bar complete. If you log back into S3 you will now see your video file in your bucket.

