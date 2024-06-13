# API-Authentication

### Description:
This project is a Node.js web application that demonstrates different methods of API authentication. It leverages Express to create a server, Axios to make HTTP requests, and EJS for rendering dynamic HTML content. The application showcases four types of authentication methods: no authentication, basic authentication, API key authentication, and bearer token authentication.

### Implementation:

#### 1. Project Setup:
- **Dependencies Installation**: The project requires several npm packages, which are installed using the following commands:
  ```bash
  npm install
  npm install express body-parser ejs axios
  ```

#### 2. Server Setup:
- **Express Server**: An Express server is created and configured to listen on port 3000.
- **Static Files**: The server is set to serve static files from the 'public' directory.
- **Body Parser**: Middleware is used to parse incoming request bodies.

```javascript
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
```

#### 3. Authentication Variables:
- **Credentials and Tokens**: Defined for basic authentication, API key authentication, and bearer token authentication.
```javascript
const yourUsername = "";
const yourPassword = "";
const yourAPIKey = "";
const yourBearerToken = "";
```

#### 4. Routes Implementation:
- **Home Route**: Renders the index page with options to choose different authentication methods.
```javascript
app.get('/', (req, res) => {
    res.render("index.ejs");
});
```

- **No Authentication Route**: Fetches data from a public API endpoint and renders it.
```javascript
app.get('/noAuth', async (req, res) => {
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        const content = JSON.stringify(response.data);
        res.render("index.ejs", { data: content });
    } catch (error) {
        res.render("index.ejs", { error: "404 error" });
    }
});
```

- **Basic Authentication Route**: Fetches data using basic authentication (username and password) and renders it.
```javascript
app.get('/basic', async (req, res) => {
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
            auth: {
                username: yourUsername,
                password: yourPassword,
            },
        });
        const content = JSON.stringify(response.data);
        res.render("index.ejs", { data: content });
    } catch (error) {
        res.render("index.ejs", { error: "404 error" });
    }
});
```

- **API Key Authentication Route**: Fetches data using an API key and renders it.
```javascript
app.get('/key', async (req, res) => {
    try {
        const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
        const content = JSON.stringify(response.data);
        res.render("index.ejs", { data: content });
    } catch (error) {
        res.render("index.ejs", { error: "404 error" });
    }
});
```

- **Bearer Token Authentication Route**: Fetches data using a bearer token and renders it.
```javascript
app.get('/token', async (req, res) => {
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
            headers: {
                Authorization: `Bearer ${yourBearerToken}`
            },
        });
        const content = JSON.stringify(response.data);
        res.render("index.ejs", { data: content });
    } catch (error) {
        res.render("index.ejs", { error: "404 error" });
    }
});
```

#### 5. Frontend Implementation:
- **HTML (index.ejs)**: Contains buttons to test different authentication methods. When a button is clicked, it triggers a route that handles the corresponding authentication method


#### 6. Running the Application:
- **Start the Server**: The server is started using the following command:
  ```bash
  node index.js
  ```
- **Access the Application**: Open a browser and navigate to `http://localhost:3000` to interact with the API authentication demo.

This project serves as an educational tool to understand and implement various authentication mechanisms in web applications using Node.js, Express, Axios, and EJS.
