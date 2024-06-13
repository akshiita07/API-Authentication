//npm i
//npm i express
//npm i body-parser
//npm i ejs
//npm i axios

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(express.static('public'));

const yourUsername = "aki";
const yourPassword = "wowaki";
const yourAPIKey = "4421b5bc-a11b-4deb-b9c2-c132ddf11df9";
const yourBearerToken = "06e755dd-e860-433b-b7c6-b62e15583fff";

app.get('/', (req, res) => {
    res.render("index.ejs");
})

app.get('/noAuth', async (req, res) => {
    // Use axios to hit up the /random endpoint
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
        //The data you get back should be sent to the ejs file as "content"
        const content = JSON.stringify(response.data);
        console.log(content);

        res.render("index.ejs", { data: content });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        error.message = "404 error";
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

app.get('/basic', async (req, res) => {

    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
            auth: {
                username: yourUsername,
                password: yourPassword,
            },
        });
        const content = JSON.stringify(response.data);
        // console.log(content);

        res.render("index.ejs", { data: content });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        error.message = "404 error";
        res.render("index.ejs", {
            error: error.message,
        });
    }
});
app.get('/key', async (req, res) => {
    try {
        const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
        const content = JSON.stringify(response.data);
        // console.log(content);

        res.render("index.ejs", { data: content });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        error.message = "No activities that match your criteria:404 error";
        res.render("index.ejs", {
            error: error.message,
        });
    }
});
app.get('/token', async (req, res) => {
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
            headers: {
                Authorization: `Bearer ${yourBearerToken}`
            },
        });
        const content = JSON.stringify(response.data);
        // console.log(content);

        res.render("index.ejs", { data: content });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        error.message = "No activities that match your criteria:404 error";
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})