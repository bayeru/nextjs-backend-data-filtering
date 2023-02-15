## Getting started

> This is a Next.js based solution that provides a user-friendly platform to filter data on the backend.

## Installing prerequisite tools

Before you start, you need to install the following tools.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [VS Code](https://code.visualstudio.com/) (Optional)
- [Docker Desktop](https://www.docker.com/) (Optional)

## Installing the app

To install the app:

- Unzip the source code to wherever directory you want.
- Open the source code directory with VS Code.
- Open a terminal window and run the following command to install the necessary dependencies.

```shell
npm install
```

## Directory structure

- Since it's a Next.js application, it comes with a single directory for the backend and frontend.

## Creating a MongoDB database

- Please follow this video tutorial to create a MongoDB database using MongoDB Atlas:

[MongoDB Atlas Tutorial](https://youtu.be/084rmLU1UgA?t=38)

- Note down your username, password and mongodb connection string. (You will add this to environment variables.)

## Environment variables

- The app requires certain environment variables.
- Rename the .env.local.sample file as .env.local and edit the environment variables according to your setup.

```ini
# Leave as is
NODE_ENV=development

# Leave as is
CLIENT_URL=http://localhost:3000

# Leave as is
NEXT_PUBLIC_API_URL=/api

# MongoDB database uri (Replace with your connection string)
MONGO_URI="mongodb+srv://yourUsername:yourPassword@cluster............."

````

## Seeding the database

- Before running the app, you should seed the database with sample data.
- Open a new terminal window and run the following command.

```shell
npm run seed
```

## Running app for development

To run the app in development mode:

1. Open a terminal window and goto project directory.
2. Run the following command.

```shell
npm run dev
```

## Accessing the app

After you run app. Open a browser window and navigate to
[http://localhost:3000](http://localhost:3000)

## Building app for deployment

Please follow these steps to build the app.

- Open a new terminal window and go into the backend directory.
- Run the following command. This command will generate a `.next/standalone` directory.

```shell
npm run build
```

- Copy `public`, `.next/standalone` and `.next/static` directories to your server.
- Now, you can run the app with the following command

```shell
node ./server.js
```

## Running with Docker

- The app comes with a Dockerfile, you can use the following command to build and deploy docker containers.
- Go into the main directory and run the following commands in order. Make sure the docker service is running before running these commands.

```shell
npm run docker:build
npm run docker:run
```