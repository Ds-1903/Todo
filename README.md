# Todo App Backend

A Node.js backend application for a Todo management system built with **Express**, **TypeScript**, and **MongoDB**. This app is designed with modern JavaScript/TypeScript tooling and includes support for secure user authentication and task scheduling.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- RESTful API using Express
- MongoDB integration with Mongoose
- Secure authentication with JWT and bcrypt
- Environment-based configuration with dotenv
- Task scheduling with node-cron
- Written in TypeScript

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Ds-1903/Todo.git
    cd todo
    ```

2. Install the project dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and configure the necessary environment variables, such as MongoDB URI and JWT secret:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/todo
    JWT_SECRET=your_jwt_secret
    ```

## Running the App

To run the app in development mode, use the following command:

```bash
npm run dev
