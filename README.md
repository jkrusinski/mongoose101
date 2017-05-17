# Mongoose101

Mongoose JS is hands down the most widely used object-relational mapping (ORM) tool to use with the popular NoSQL database, MongoDB. The main advantage of using a NoSQL database is the ability to store documents. Instead of arranging your information into relational tables, you simply pass a JSON document to the database. This eliminates the conversion of data that is necessary every time something is retrieved or stored from the database. However, MongoDB does not offer any kind of schema validation out-of-the-box. Let's say you have a collection of user documents in your database. When you first created the project, you designed your application to expect a phone number property on every user document that contained a `Number` value. Most likely your application would behave exactly as you expect it for a while. But as your project grows and time moves along, it can be difficult to remember how exactly you intended your user objects to look. If you unintentionally wrote a piece of code that created new user documents with a phone number property that contained a `String` value, or even no phone number property at all, MongoDB would accept the document with ease. This can lead to some very hard-to-find bugs in your application. Mongoose is designed to address these issues specifically and makes schema creation and validation a breeze.

## Install MongoDB
As a developer, your main point of contact with the database will be through the Mongoose library. You do, however, still need to have MongoDB installed and running on your machine. Installation instructions vary for different operating systems so find which method is appropriate for you. For a list of all the installation options, click [here](https://www.mongodb.com/download-center#community). Below are a few common installation methods.

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
