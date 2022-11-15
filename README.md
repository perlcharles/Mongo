# Mongo2

This is a project that has 3 api endpoints that utilize a Mongo DB.  These endpoints are used within a Twilio Studio app.  
The original intent was to have all the code housed here, but I was able to use the Twilio credentials within the Studio.
This is why the credentials are referneced but never used.

In order for Twilio to hit this code, it must be accessable from the public internet.

After setting up the .env files like listed in the .env.example file, you can strt the npm project.

This will start the project running locally on port 3000.  I then used the ngrok service to route that traffic to a public location.

I then updated my studio application to use the ngrok provided endpoint.

