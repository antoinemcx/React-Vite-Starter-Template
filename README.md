<h1 align="center">React-<strike>Vite</strike>-Starter-Template</h1>
<p align="center">
    Full-stack starter template for React projects by <a href="https://github.com/antoinemcx">antoinemcx</a> using <strike>Vite</strike> <b>CRA</b>.<br />
    If you like the project, feel free to put a ⭐ ; If you need help, join the <a href="https://discord.gg/G6WQsMQShZ">server support</a>.
</p>

<p align="center">
    <a title="MIT Licence" href="LICENCE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT Licence"></a>
    <a title="CodeFactor" href="https://www.codefactor.io/repository/github/antoinemcx/react-vite-starter-template">
        <img src="https://www.codefactor.io/repository/github/antoinemcx/react-vite-starter-template/badge" alt="CodeFactor">
    </a>
    <a title="Stars" href="[LICENCE](https://github.com/antoinemcx/React-Vite-Starter-Template)">
        <img src="https://img.shields.io/github/stars/antoinemcx/React-Vite-Starter-Template" alt="Stars">
    </a>
    <a title="Support server" href="https://discord.gg/G6WQsMQShZ">
        <img src="https://img.shields.io/discord/738122381062832180.svg?logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2&label=Support" alt="Support server">
    </a>

   <br>
</p>

## Features
### CRA version
⚠️ ***This branch is the Create-React-App version of this template.   
If you want to use Vite instead you'll find it in the "[main](https://github.com/antoinemcx/React-Vite-Starter-Template/tree/main)" branch.***   

* 🚀 Full-stack app : ready to code with a starter file structure !
* 📁 Separated client (React+CRA) and server (express) sides
* ❌ Custom error paging
* 🖌️ Integration of FontAwesome
* ✏️ Pages template with a responsive header and a Title
* 📡 MariaDB connection with migrations management
* 🔑 JWT Authentication system
* 👥 Sign up page with conditional logic and Sign in with "Remember me"
* 🔐 Private routing with a loading message

<br>

## Setup the project
First, install the dependencies in the two folders separately :
```sh
$ cd client ; npm install
$ cd server ; npm install
```
Then, rename the **.env** files in the **server/** folder into **.env** and replace the values if needed.
Finally, change the values of the **.env.development** and **.env.production** of the **client/** folder if needed.

## Scripts

In development, you will mainly use `npm run start` on both **server/** and **client/** sides ; however, here are the other scripts :

### In the server/ folder
|`npm run <script>` |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3002`|

### In the client/ folder
|`npm run <script>` |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3000`|
|`production`       |Builds the application for production to ./dist|
|`test`             |Run the tests if you provide some tests files|
|`eject`            |Remove the ./dist folder and eject the configs|

<br>

## More information

For any errors found, please contact me [here](https://discord.gg/G6WQsMQShZ) or do a pull request.  
This repository is licensed under the MIT License. See the `LICENSE` file ([here](LICENSE)) for more information.
