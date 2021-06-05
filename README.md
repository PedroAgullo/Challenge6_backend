<a name="top"></a>

<h1>Backend Gym Appoinment</h1>



:speech_balloon: [About](#id1)   

:hammer: [Tools](#id2)

:clipboard: [Instructions](#id3)

:eye_speech_bubble: [Phase I - Creating the Backend](#id4)

:exclamation: [Required and extra endpoints](#id5)

:mailbox: [Postman](#id6)

:smile: [Thanks](#id7)

---

<a name="id1"></a>
## **About**

This is the back-end for a future Gym appointment application.

This project is part of the [GeeksHubs Academy](https://bootcamp.geekshubsacademy.com/) Full Stack Developer Bootcamp. 

---
**Phase I**
**Start date:** 01 / Jun /2021
**Deadline:** 06 / Jun / 2021


**Contributors:**
* [Pedro Agull Marco](https://github.com/PedroAgullo)
* [Mariana Fernández Sacristán](https://github.com/mlfernandez)

---

<a name="id2"></a>

## **Tools**

To create this project we worked with these tools and technologies:

| <img src="img/logovisual.png" alt="Visual" width="30"/> | Visual Studio Code |

| <img src="img/javascript2.png" alt="JavaScript" width="30"/> | JavaScript | 

| <img src="img/nodejs.png" alt="HTML5" width="30"/> | Node JS & Express |

| <img src="img/mongodb.png" alt="MONGO" width="30"/> |  MongoDB, Mongoose & Atlas | 

| <img src="img/git.png" alt="Git" width="30"/> | Git |

| <img src="img/github2.png" alt="GitHub" width="30"/> | GitHub | 

| <img src="img/postman.png" alt="GitHub" width="30"/> | Postman |

|<img src="img/trelloLogo.png" alt="trello" width="30"/>| Trello | 



<a name="id3"></a>
***
## **Instructions**

<details>
<summary>Click on the arrow to expand</summary>

1. <h3> Starting Node Package Manager </h3>
   (We must have installed Node.js)
Using npm init from the command line initializes the project’s package.json file.

```javascript
npm init -y
```
2. <h3>Install MongoDB</h3>
>MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

3. <h3>Install Nodemon</h3>
>Nodemon is a utility depended on by over 1.5 million projects, that will monitor for any changes in your source and automatically restart your server. Perfect for development.

```javascript
npm i nodemon
```
4. <h3> Add {"start":"node index.js"} in the file package.json section "scripts"</h3>
```json
  "scripts": {
   "start": "node index.js", 
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

5. <h3>Install framework Express </h3>
>Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It facilitates the fast development with Node based Web applications.

```javascript
npm i express
```

6. <h3>Install Mongoose </h3>
>Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB

```javascript
npm i mongoose
```

7. <h3> Delete the ^ simbol in "dependencies" file  package.json </h3>
```json
"dependencies": {
    "express": "^4.17.1"
  },
```
8. <h3>Install Cors </h3>
> Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
```javascript
npm i cors
```

9. <h3> Add .gitignore on the Work space folder and inside write</h3>
```json
/node_modules
```
10. <h3>Install the encryption dependency</h3>

   >The **bcrypt** hashing function allows us to build a password security platform that scales with computation power and always hashes every password with a salt.

  ```javascript
  npm i bcrypt
  ```

  >A **JSON web token**, or JWT (“jot”) for short, is a standardized, optionally validated and/or encrypted container format that is used to securely transfer information between two parties

  ```javascript
  npm i jsonwebtoken
  ```
For explample **autheticate.js** require bcrypt and jsonwebtoken require:
<details><summary>Click in the arrow to expand and see the code example.</summary>

```javascript
const jwt = require("jsonwebtoken");
const secret = "Los mas jovenes del Bootcamp";
const authenticate = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Tienes que hacer login para realizar esta acción.");
    }
    let token = req.headers.authorization.split(" ")[1];
    let auth = jwt.verify(token, secret);
    if (auth.id != req.body.member) {
      throw new Error("No tienes permiso para realizar esta accion");
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = authenticate;
```
</details>

11. <h3>To conect to the server write on the terminal</h3>
```javascript
npm start
```
12. <h3>Now we can start to code the backend.</h3>
>To know more about this see Creating the Backend below.

13. <h3>To see the Data in Postman.</h3>
>To know more about this see Postman below.

14. <h3>To see the Data on Atlas.</h3>
>To know more about this see Atlas below.

</details>


<a name="id4"></a>
## Phase I Creating the Backend

<details>
<summary>Click the arrow to expand</summary>


1. <h3>index.js</h3>

In this file we found the file all dependencies we need to import, also we setup the middlewares and the server.`
<details>
<summary>Click the arrow to see index.js's code</summary>

```javascript
const express = require('express');
const router = require('./router');
const db = require('./config/mongoose.js');
const app = express();
const port = 3000;
const cors = require('cors');

//Middlewares
app.use(express.json());
app.use(cors());
app.use(router);

db
.then(() => {
app.listen(port, () => console.log(`Node server running on http://localhost:${port}`));
})
.catch((err) => console.log(err.message))
```
</details>

2. <h3>mongoose.js</h3>
Create **mongoose.js** to conect the data base.

```javascript
const mongoose = require("mongoose");
const QUERY_STRING =
  "mongodb+srv://admin:Admin1234@cluster0.oayl4.mongodb.net/dbGym?retryWrites=true&w=majority";

// Connection to DB
const db = mongoose
  .connect(QUERY_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));

module.exports = db;
```

3. <h3>router.js</h3>

* We have to call Node Express.
```javascript
const router = require('express').Router();
```
* Call the files on the folder routes.
```javascript
const userRouter = require('./routes/userRouter.js');
const roomRouter = require('./routes/roomRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const monitorRouter = require('./routes/monitorRouter.js');
const lockerRouter = require('./routes/lockerRouter.js');
```
* This says that when the user puts the path where it should go.
```javascript
router.use('/user', userRouter);
router.use('/room', roomRouter);
router.use('/login', loginRouter);
router.use('/monitor', monitorRouter);
router.use('/locker', lockerRouter);
```

* Finally export the file routers.
```javascript
module.exports = router;
```

4. <h3>controllers</h3>

Controllers contain the class and callback functions which we pass to the router's methods. 

We will need one for each model, Monitor, Room, User, Locker, and an additional to the login.

This is an example in class Monitor, a function to modify the information:

```javascript
class Profesor {
  constructor() {}

  async modifyMonitor(data) {
    return Monitor.findByIdAndUpdate(
      { _id: data.id },
      //Datos que cambiamos
      {
        address: data.address,
        country: data.country,
        city: data.city,
        telephone: data.telephone,
        speciality: data.speciality,
        isActive: data.isActive,
      },
      { new: true, omitUndefined: true }
    );
  }
let monitorController = new Profesor();
module.exports = monitorController;
```

5. <h3>routes</h3>

A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern.

```javascript
const router = require("express").Router();
const monitorController = require("../controllers/monitorController.js");
const authenticate = require("../middleware/authenticate.js");
const admin = require("../middleware/admin.js");
const monitor = require("../middleware/monitor.js");
```
We have one for each controller, this is a example of one of this to search all Coaches in the data base.

```javascript
//GET - Return all Users in the DB

router.get("/", admin, async (req, res) => {
  try {
    res.json(await monitorController.findAllMonitor());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
```
</details>

<a name="id5"></a>
##Required endpoints

  * User Register
  * User Login
  * Pending gym classes (Active)
  * Delete gym classes 
  * Create a new gym classes


<a name="id6"></a>
##Additional endpoints

**Monitor**

  * Monitor Register
  * Monitor Login
  * Find all monitors
  * Find monitor by Id
  * Find monitor by email
  * Modify Monitor
  * Review Monitor by message
 
**Room**

  * Join a user to the gym class:
    - Verify if the user have a valid subscription (annual, month or pending payment).
    - Check if the user is already registered in that class.
    - Verify if the capacity of the class has been reached. 
  * Join a coach to the gym class:
    - Check if the trainer's speciality matches the gym classes to be taught.
    - Verify if that trainer doesn't have already a class at that time and day.
    - Check that there is no more than one trainer signed up to teach the class.
  * All gym classes
  * All inactive gym classes
  * Find gym classes by date  
  * Delete gym classes
  * Update gym classes status (create list of assistants to send an email for monitor review)
  * Monitor Leave the class.
  * User Leave the class.

**User**

  * Find all users
  * Find Users by email
  * Modify User
  * Update status member (annual, mensual or pending payment).

 **Locker** 
  * Find all locker
  * Find all available locker
  * Find all locker rented.
  * Create a new locker.
  * Rent a locker.
  

<a name="id7"></a>
***
## **Postman and Atlas**

>**Postman** is a collaboration platform for API development. Postman's features simplify each step of building an API and streamline collaboration so you can create better APIs—faster.

>**MongoDB Atlas** is the global cloud database service for modern applications.
Deploy fully managed MongoDB across AWS, Google Cloud, and Azure with best-in-class automation and proven practices that guarantee availability, scalability, and compliance with the most demanding data security and privacy standards.

**Example of endpoints on Postman**
<details>
<summary>Click to see the endpoints on Postman.</summary>


![Captura](img/imgPostmanAllOrders.JPG)



</details>

[API Documentation](https://documenter.getpostman.com/view/15824691/TzY4gap6)


<a name="id8"></a>
***
## **Thanks**

We would like to thank our teacher, David, for his help and dedication. And to our bootcamp partners for every brainstorming (and daily) session.

<br>
<br>

[UP](#top)