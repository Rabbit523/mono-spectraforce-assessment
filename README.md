# Take Home Coding Project – Sr Digital Applications Developer

This project is a full-stack application built with Node.js, Express, and React-Redux. The backend acts as an authentication and CRUD middleware for the [reqres.in](https://reqres.in) API. The frontend, built with React-Redux, provides a user interface for login and resources management. The backend and frontend are both written in TypeScript.

## Requirements

- Node.js
- Yarn

## Getting Started

### 1. Clone the Repository

You can clone the repository to your local machine by running:

```bash
git clone <repository_url>
```

### 2. Install Dependencies

- Navigate to the root directory of the project:

```bash
    cd <project_directory>
```

- And install the necessary packages for the server:

```bash
    npm install or yarn install
```

- Then, navigate to the client directory:

```bash
    cd frontend && yarn install
```

- And build backend to bundle typescript into javascript:

```bash
    cd ../backend && yarn backend:build
```

### 3. Run the Application

```bash
    cd ../ && yarn start
```

## Application Usage

The application presents a login form. Upon successful authentication, users can view a paginated list of resources. Users can add and remove resources.

## Features

- User Authentication
- CRUD operations for resources
- Pagination of resources list
- Logout functionality
