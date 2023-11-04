# Social-Network-API

<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" width="100">
</div>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Walkthrough-Video](#walkthrough-video)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description

The Social Network API is a robust backend application that provides a set of powerful API routes for managing users, thoughts, reactions, and friend connections. It seamlessly integrates with a MongoDB database using Mongoose models, ensuring data integrity and reliability.

### Key Features:

- **Server Initialization:** When you invoke the application, the server is started, and the Mongoose models are synchronized with the MongoDB database.
- **API Routes:** The application offers a comprehensive set of API routes for performing various operations, including GET, POST, PUT, and DELETE for users, thoughts, reactions, and friend connections.
- **CRUD Operations:** Through Insomnia, you can perform CRUD operations (Create, Read, Update, Delete) with ease. This includes creating and updating users, friends, reactions and thoughts.
- **Friend Management:** The API allows you to add and remove friends to a user's friend list, facilitating social interactions within the platform.
- **Thought Deletion:** When a user is deleted, their associated thoughts are also automatically removed, ensuring data consistency.
- **Testing with Insomnia:** Effortlessly test API routes in Insomnia to verify functionality and data integrity.

Follow the installation instructions below to get started with the Social Network API.

## Installation

### Clone the repository to your local machine

```sh
git clone https://github.com/dmerk2/Social-Network-API.git
```

### Install necessary dependencies and add the seeds to populate the database

```sh
npm i && npm run seed
```

### Start the application

```sh
npm start
```

## Walkthrough Video

Click the lightning bolt [⚡](https://watch.screencastify.com/v/Cqn3otY2orJ96Vd0gw3i) to view the Social Network API application in action!

## License

This project is licensed under the terms of the **[MIT License](https://opensource.org/licenses/MIT)**

## Contributing

Daniel Merkin

## Tests

Use Insomnia or any API testing tool to interact with the routes.

## Questions

If you have any questions or suggestions about this project, please feel free to contact me:

- GitHub: [@dmerk2](https://github.com/dmerk2)
- Email: dan.merkin@gmail.com
