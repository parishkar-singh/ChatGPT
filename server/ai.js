import express, {response} from "express";

const app = express();
import {Configuration, OpenAIApi} from "openai";
import dotenv from "dotenv";
import cors from "cors";

app.use(cors());
dotenv.config();
app.use(express.json());
const configuration = new Configuration({
    organization: "org-tY48mbA9R7hqoobOOB7SELpn",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})

app.post("/", async (req, res) => {
    const {message,currentModel} = req.body;
    console.log(message);
    const response = await openai.createCompletion({
        model: "ada",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    res.json({message: response.data.choices[0].text});
})

app.get("/models", async (req, res) => {
    const response = await openai.listEngines();
    // console.log(response.data.data);
    res.json({models: response.data.data});
})
