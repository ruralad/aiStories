const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const app = express();
const port = process.env.PORT || 5000;

const serviceAccount = require("./key.json");
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/create-new-story", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5501");
  const response = await openai.createCompletion("text-davinci-001", {
    prompt: "tell me a story that's happy and not too cliche",
    temperature: 0.7,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  let story = response.data.choices[0].text;
  const stats = db.collection("stats").doc("all");
  const doc = await stats.get();
  let currentStoryNumber = Number(doc.data().numberOfStories);
  await db.collection("stories").add({
    story,
    number: currentStoryNumber + 1,
  });
  await stats.update({ numberOfStories: currentStoryNumber + 1 });
  res.send(response.data.choices[0].text);
});

app.get("/update-page-view", async (req, res) => {
  const stats = await db.collection("stats").doc("all").get();
  await db
    .collection("stats")
    .doc("all")
    .update({ totalPageViews: Number(stats.data().totalPageViews) + 1 })
    .then(() => {
      res.send("done");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
