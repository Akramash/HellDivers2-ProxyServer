# Proxy Server for React Application

## Overview

This Proxy Server acts as an intermediary layer between our React frontend application and the backend API, enhancing security, managing CORS issues, and facilitating a cleaner API endpoint structure. Built with Node.js and Express, this server leverages `http-proxy-middleware` for efficient request forwarding and modification, and `dotenv` for secure environment variable management.

## Key Features

- **Environment Variable Configuration**: Utilizes `dotenv` for loading API base URLs from environment variables, allowing for flexible deployment across different environments without code changes.
- **CORS Management**: Implements CORS middleware to enable cross-origin requests, ensuring the React app can communicate with the backend without security issues.
- **Request Rewriting**: Employs path rewriting to simplify frontend requests, making the API more accessible and easier to interact with from the client side.
- **Content-Type Handling**: Automatically adjusts the `Content-Type` header for POST requests, ensuring the correct handling of JSON bodies by the backend.

## How It Works

The server is configured to listen on port 3001 (or a port specified by the environment), ready to accept requests from the React application. When a request to the `/api` endpoint is made, the proxy middleware takes over, forwarding the request to the specified `API_BASE_URL` while handling CORS, path rewriting, and header adjustments. This process is transparent to the end-user, providing a seamless interaction with the backend API.

### Handling CORS and Preflight Requests

The server sets up CORS headers to accept requests from any origin and supports a variety of HTTP methods. For preflight `OPTIONS` requests, it responds with a 200 status code, ensuring compliance with CORS preflight requirements and enabling secure cross-origin communication.

### Secure Configuration with `.env`

API base URLs and potentially sensitive configurations are stored in a `.env` file, not included in source control, to enhance security. This approach allows for easy adjustments to the backend API URL without needing to alter the server's source code directly.

### Path Rewriting and Content-Type Management

Path rewriting simplifies the API structure exposed to the frontend, allowing for cleaner and more intuitive API endpoints. The server ensures that the `Content-Type` header is appropriately set for requests with JSON bodies, facilitating correct processing by the backend.

## Setup and Deployment

1. **Installation**: Clone the repository and run `npm install` to install dependencies.
2. **Configuration**: Create a `.env` file in the root directory, specifying your `API_BASE_URL`.
3. **Running the Server**: Execute `npm start` to launch the server. It will start listening for requests on port 3001 or a custom port defined in your environment variables.

## Future Enhancements

- **HTTPS Support**: Implement HTTPS to secure data in transit, particularly important for production environments.
- **Logging and Monitoring**: Integrate logging and monitoring tools for better insight into request handling and performance metrics.
- **Containerization**: Dockerize the proxy server for easier deployment and scalability across different environments.

## Contributing

Contributions to enhance the proxy server's functionality or documentation are welcome. Please fork the repository, make your changes, and submit a pull request for review.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
