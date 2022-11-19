# YELP SEARCH CODING EXERCISE
## YELP SEARCH APP

This project was bootstrapped with [Create React App] and is for YELP Bussiness search.
Created by [Jeffrey Wilson]

### Available Scripts

In the project directory, you can run:
#### `npm install`
#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## SOLUTION BY CORS POLICY

When deciding to work with the Yelp Fusion Api, I quickly realized that after implementation within my code, I kept getting CORS errors in my Console.

Access to XMLHttpRequest at ‘https://api.yelp.com/v3/businesses/search?term=coffee&&location=New%20York%20City' from origin ‘null’ has been blocked by CORS policy: Response to preflight request doesn’t pass access control check: No ‘Access-Control-Allow-Origin’ header is present on the requested resource.

 In order to get it working, that’s why we use CORS Anywhere, when we open that link online, there is a button “Request access to demo server” we click on that, and this activates the CORS, after doing that, we can go back to our website and have access to the YELP API. You can check here and click the request button.
https://cors-anywhere.herokuapp.com/corsdemo
