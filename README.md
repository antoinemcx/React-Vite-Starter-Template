<h1 align="center">React-Vite-Starter-Template</h1>
<p align="center">
    Full-stack starter template for React projects by <a href="https://github.com/antoinemcx">antoinemcx</a> using Vite.<br />
    If you like the project, feel free to put a ⭐ ; If you need help, join the <a href="https://discord.gg/G6WQsMQShZ">server support</a>.
</p>

<p align="center">
    <a title="MIT License" href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
    <a title="CodeFactor" href="https://www.codefactor.io/repository/github/antoinemcx/react-vite-starter-template">
        <img src="https://www.codefactor.io/repository/github/antoinemcx/react-vite-starter-template/badge" alt="CodeFactor">
    </a>
    <a title="Stars" href="[LICENCE](https://github.com/antoinemcx/React-Vite-Starter-Template)">
        <img src="https://img.shields.io/github/stars/antoinemcx/React-Vite-Starter-Template" alt="Stars">
    </a>
    <a title="Support server" href="https://discord.gg/G6WQsMQShZ">
        <img src="https://img.shields.io/discord/738122381062832180.svg?&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2&label=Support" alt="Support server">
    </a>

   <br>
</p>

## Features
* 🚀 Full-stack app : ready to code with a starter file structure !
* 📁 Separated client (React+Vite) and server (express) sides
* ❌ Custom error paging
* 🖌️ Integration of FontAwesome
* ✏️ Pages template with a responsive header and a Title
* 📡 MariaDB connection with migrations management
* 🔑 JWT Authentication system
* 👥 Sign up page with conditional logic and Sign in with "Remember me"
* 🔐 Private routing with a loading message
* ⚙️ A basic ESLint configuration for the client side

### CRA version
If you need you'll find a branch "[CRA](https://github.com/antoinemcx/React-Vite-Starter-Template/tree/cra)" for the same application bootstraped with Create-React-App instead of Vite.

<br>

## Setup the project

### 1. Installation
First, install the dependencies in the two folders separately :
```sh
$ cd client ; npm install
$ cd server ; npm install
```

### 2. Configuration
Then, rename the **.env.example** files in the two folders into **.env**  and replace the values if needed.

### 3. Database
This template uses on the MariaDB database, a slightly modified version of MySQL.<br>
First, create the database. The name of the database must be the same as the one set in the **server/.env** file.<br>

![](https://i.imgur.com/ALeKvsf.png "Creating a database on phpMyAdmin")

After creating the database, run following command :
```sh
$ cd server ; node database/migrations/0.0.0_init_project.js
```

<br>

## Scripts

In development, you will mainly use `npm run start` on both **server/** and **client/** sides ; however, here are the other scripts :

### In the server/ folder
|`npm run <script>` |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3001`|

### In the client/ folder
|`npm run <script>` |Description|
|-------------------|-----------|
|`start`              |Serves your app at `localhost:1234`|
|`build`            |Builds the application for production to ./dist|
|`lint`             |[Lints](https://en.wikipedia.org/wiki/Lint_%28software%29) the project to review errors|
|`preview`          |Preview your production app|

<br>

## More information

For any errors found, please contact me [here](https://discord.gg/G6WQsMQShZ) or do a pull request.  
This repository is licensed under the MIT License. See the `LICENSE` file ([here](LICENSE)) for more information.
