# DevPeoplesBackend

This is a simple backend server built with Node.js and Express.

## Features

- Basic Express server setup
- Test route at `/test` that returns a greeting message

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository or download the source code.
2. Install dependencies:

   ```
   npm install
   ```

3. (Optional) Install `nodemon` globally for development:

   ```
   npm install -g nodemon
   ```

### Running the Server

- To start the server:

  ```
  npm start
  ```

- For development with auto-reload (if you have `nodemon`):

  ```
  npm run dev
  ```

The server will run on [http://localhost:7777](http://localhost:7777).

### Test Route

- Visit [http://localhost:7777/test](http://localhost:7777/test)  
  You should see:  
  ```
  Hello, World From Server!
  ```

## Project Structure

```
DevPeoplesBackend/
├── node_modules/
├── src/
│   └── app.js
├── package.json
└── .gitignore
```

## Notes

- `node_modules/` is ignored in version control via `.gitignore`.
- The main server logic is in `src/app.js`.

---
# Let's Understand Route Handling in Express

In Express, the **order of your route handlers matters**. Express checks each route in the order you define them, and the first matching route handles the request.

Here's the code from `app.js`:

```javascript
const express = require('express');
const app = express();

app.use("/test", (req, res) => {
  res.send('Test!');
});

app.use("/", (req, res) => {
  res.send('Home!');
});

const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## How Route Handling Works Here

1. **`/test` Route First:**  
   - If you visit `http://localhost:7777/test`, Express matches the first route and responds with `Test!`.

2. **`/` Route Second:**  
   - If you visit `http://localhost:7777/` or any other path not starting with `/test`, Express matches the second route and responds with `Home!`.

## Why Order Matters

If you put the `/` route first, it would match **all** requests (including `/test`), so the `/test` route would never be reached. By putting `/test` first, you ensure that requests to `/test` get the correct response, and all other requests fall through to the home route.

**In summary:**  
- Express matches routes in the order you define them.
- More specific routes should come before more

Author: Deepak Maurya
