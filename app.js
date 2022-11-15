import express from "express";
//import twilio from "twilio";
import config from "config";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const dbUser = config.get("MongoDBUser");
const dbPass = config.get("MongoDBPass");
//const accountSID = config.get("AccountSID");
const db = config.get("db");
const collection = config.get("collection");
//const twilioAuthToken = config.get("TwilioAuthToken");
const mongoURL =
  "mongodb+srv://" +
  dbUser +
  ":" +
  dbPass +
  "@cluster0.nvxi5a3.mongodb.net/test";

//const client = new twilio(accountSID, twilioAuthToken);
const mongoClient = new MongoClient(mongoURL);

mongoClient.connect().then(() => {
  console.log("Db Connected");
  app.listen(3000, () => {
    console.log("Server Connected");
  });
});

async function getRandomDate() {
  const collectionLength = (
    await mongoClient.db(db).collection(collection).find({}).toArray()
  ).length;
  const randomIndex = Math.floor(Math.random() * (collectionLength - 1) + 0);
  const fullDateArray = await mongoClient
    .db(db)
    .collection(collection)
    .find({})
    .toArray();
  const randomDate = fullDateArray[randomIndex].DateIdea;
  //console.log(randomIndex);
  //console.log(randomDate);
  return randomDate;
}

async function suggestDate(suggestion) {
  const doc = {
    DateIdea: suggestion,
  };
  await mongoClient.db(db).collection(collection).insertOne(doc);
  const successMsg = "Inserted: " + suggestion;
  console.log(successMsg);
  return successMsg;
}

async function addUser(phone, email) {
  const doc = {
    phone: phone,
    email: email,
  };
  await mongoClient.db(db).collection(collection1).insertOne(doc);
  const successMsg = "Inserted: " + JSON.stringify(doc);
  console.log(successMsg);
  return successMsg;
}
app.post("/random", async (req, res) => {
  // async way
  try {
    const randomDate = await getRandomDate();
    res.status(200).send(randomDate);
  } catch (error) {
    console.error(error);
  }
});

app.post("/suggest", async (req, res) => {
  // async way
  try {
    const { DateIdea } = bodyParser.json(req.body);
    const parsedDate = req.body.DateIdea.trim();
    //console.log(parsedDate);
    const insertedDate = await suggestDate(parsedDate);
    res.status(200).send(insertedDate);
  } catch (error) {
    console.error(error);
  }
});

app.post("/addUser", async (req, res) => {
  // async way
  try {
    const phone = req.body.phone.trim();
    const email = req.body.email.trim();
    //console.log(phone);
    const insertedUser = await addUser(phone, email);
    res.status(200).send(insertedUser);
  } catch (error) {
    console.error(error);
  }
});

// exports.handler = function(context, event, callback) {

//     //const fs = require('fs');
//         //filePath = Runtime.getAssets()['/ideas.txt'].path;
//         fileBuffer = Runtime.getAssets()['/ideas.txt'].open;
//         //fs.readFileSync(filePath, 'utf-8');
//         listOfDateIdeas = fileBuffer().toString();
//         splitDateIdeas = listOfDateIdeas.split("\n");
//         hiIndex = splitDateIdeas.length-1;
//         randLine = Math.floor(Math.random() * hiIndex);
//         dateIdea = splitDateIdeas[randLine];
//      //console.log('help');
//         return callback (null, dateIdea);
//     };
