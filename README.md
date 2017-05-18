# Mongoose101

Mongoose JS is hands down the most widely used object-relational mapping (ORM) tool to use with the popular NoSQL database, MongoDB. The main advantage of using a NoSQL database is the ability to store documents. Instead of arranging your information into relational tables, you simply pass a JSON document to the database. This eliminates the conversion of data that is necessary every time something is retrieved or stored from the database.

Unfortunately, MongoDB does not offer any kind of schema validation out-of-the-box. Let's say you have a collection of user documents in your database. When you first created the project, you designed your application to expect a phone number property on every user document that contained a `Number` value. Most likely your application would behave exactly as you expect it for a while. But as your project grows and time moves along, it can be difficult to remember how exactly you intended your user objects to look. If you unintentionally wrote a piece of code that created new user documents with a phone number property that contained a `String` value, or even no phone number property at all, MongoDB would accept the document with ease. This can lead to some very hard-to-find bugs in your application. Mongoose is designed to address these issues specifically and makes schema creation and validation a breeze.

## Install MongoDB
As a developer, your main point of contact with the database will be through the Mongoose library. You do, however, still need to have MongoDB installed and running on your machine. Installation instructions vary for different operating systems so find which method is appropriate for you. For a list of all the installation options, click [here](https://www.mongodb.com/download-center#community). Below are a few common methods.

#### Mac
Install using Homebrew. If you don't have brew installed on your computer, install it [here](https://brew.sh).

``` bash
brew update
brew install mongodb
brew tap homebrew/services

mkdir -p /data/db ## create the db directory
sudo chown -R `id -un` /data/db ## set the right permissions
```
To start, stop, and restart the mongod daemon:
``` bash
brew services start mongodb
brew services stop mongodb
brew services restart mongodb
```

#### Ubuntu
Install using apt-get. The given instructions are for Ubuntu 14.04 ([link](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04)). Instructions for installation on Ubuntu 16.04, click [here](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04).

``` bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

To start, stop, and restart the mongod daemon:
``` bash
sudo service mongod start
sudo service mongod stop
sudo service mongod restart
```
### Graphical User Interface
The included Mongo CLI tool requires that you know MongoDB's specific querying language. While some clever googling will likely lead you to the correct syntax, it's much easier to install a GUI to actually see the data you have stored in your database. [Robomongo](https://robomongo.org) is quite a popular one and has good installation instructions on their website.

## Install Mongoose
Once you have your database installed and running as a daemon, install mongoose locally to your project using npm.
``` bash
npm install --save mongoose
```
At the top of your server index, connect mongoose to your database. This needs to occur before you access any of the other mongoose methods. I usually do this right after I instantiate my express app.

``` javascript
// server.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yourdb');
```
You should replace `yourdb` with whatever you want to name your new database. There is no need to create the database in MongoDB itself beforehand. If mongoose sees that there is no database that matches, it will create a new one for you. The `mongo://` protocol handles most of the configuration for you, so if you didn't change any of MongoDB's default configurations, you shouldn't have to worry about ports or anything like that. If you were hosting the database on a machine other than your local one, you would replace `localhost` with that IP address.

## Schema Design
MongoDB allows you to arrange your documents into collections. Mongoose give you the power to add a schema to these collections to ensure that all of the documents in a collection look the same. Bellow is a simple schema for a basic user document.

``` javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  phone: Number,
  admin: Boolean
});
```

To create a schema, pass a javascript object through mongoose's Schema constructor function. Notice that the values that declare what type each property on the document should contain are just [standard built-in javascript objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).

#### Simple Types
The following javascript globals are valid schema types:

``` javascript
{
  text: String,
  number: Number,
  bool: Boolean,
  date: Date,
  array: [],
  mixed: Schema.Types.Mixed,
  objectId: Schema.Types.ObjectId
}
```

Notice the last two types are not actually javascript globals, but types provided by mongoose to allow for a variety of types and to reference mongoose ObjectId's respectively. We will get more into how Mongoose's ObjectId's work a little later.

#### Nested Types
Arrays of data are common when creating databases. If you assign a property to an empty array, mongoose will assume that its contents are mixed. In most cases you want arrays to contain a single type of data. To do that, just wrap the type in brackets like so:

``` javascript
{
  arrayOfStrings: [String],
  arrayOfNumbers: [Number],
  arrayOfBooleans: [Boolean],
  arrayOfDates: [Date],
  arrayOfObjectIds: [Schema.Types.ObjectId]
}
```

You can also nest data in objects, just like you would in all of your other javascript code. For example:

``` javascript
{
  address: {
    number: Number,
    street: String,
    city: String,
    state: String,
    zip: Number
  }
}
```

#### Options
The real power that mongoose gives you for schema design is in its options. Take a look at the code below:

``` javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  phone: Number,
  admin: Boolean
});
```

At first glance it may seem like `username` and `password` are both properties that contain nested data, but that is not actually the case. The `type` property is a special keyword that tells mongoose that this is an options object for the property pointing to it. The options object for `username` tells us three things about the property: it is of type `String`, it must be a unique value in the database, and it is required.
