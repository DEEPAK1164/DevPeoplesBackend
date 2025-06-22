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
Author: Deepak Maurya
