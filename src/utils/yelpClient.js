import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER;
const API_KEY = process.env.REACT_APP_YELP_API_KEY;

const yelpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        "accept": "application/json",
        "Access-Control-Allow-Origin":"*",
        'Content-type': 'application/json'
    },
    timeout: 100000,
});

export default yelpClient;