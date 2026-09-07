# Vaiko įgūdžiai – Web

Parent web application for the **Vaiko įgūdžiai** family task and reward system.

This application is used by parents to manage their children's tasks and rewards, approve completed tasks, and keep track of points and activity.

It is one part of the Vaiko įgūdžiai project, together with a mobile application for children and a FastAPI backend.

## Features

Parents can:

- create an account and log in
- add multiple children
- create and delete tasks
- assign points to tasks
- create and delete rewards
- set the point cost of rewards
- approve or reject completed tasks
- confirm claimed rewards
- see each child's current point balance
- view activity history
- generate a connection code for the child's mobile app

The interface is responsive and can be used on both desktop and mobile devices.

## Tech stack

- React
- JavaScript
- Axios
- Bootstrap
- React Router

## API

The web application communicates with the FastAPI backend through a REST API.

Parent authentication is handled using JWT tokens.

## Running locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

## Production

The production version is hosted on my Raspberry Pi and exposed over HTTPS using Cloudflare Tunnel.

Live application:

**https://vaikoigudziai.lt**

## Related repositories

This repository is part of the **Vaiko įgūdžiai** project:

- Main project – `vaiko-igudziai`
- Backend API – `vaiko-igudziai-backend`
- Child mobile app – `vaiko-igudziai-mobile`
