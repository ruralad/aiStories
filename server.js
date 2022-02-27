const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const { response } = require("express");
const app = express();
const port = process.env.PORT;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5501');
      const response = await openai.createCompletion("text-davinci-001", {
        prompt: "tell me a story that's happy and not too cliche",
        temperature: 0.7,
        max_tokens: 234,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
   const obj = fs.readFileSync("./data.json",{encoding :"utf-8"});
   let file = JSON.parse(obj);
   file.stories.push(response.data.choices[0].text)
   fs.writeFileSync("./data.json",JSON.stringify(file))
   res.send(response.data.choices[0].text)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
