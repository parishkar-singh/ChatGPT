import express from "express";
const app = express();
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());
const configuration = new Configuration({
    organization: "org-tY48mbA9R7hqoobOOB7SELpn",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function run() {
    try {
        const response = await openai.createCompletion({
            model: "ada",
            prompt: "is this is a test?",
            max_tokens: 7,
            temperature: 0,
        });
        console.log(response.data.choices[0].text);
    } catch (error) {
        console.error("error");

    }
}
// run();

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})

// app.get("/", async (req, res) => {
//     const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: "This is a test",
//         max_tokens: 7,
//         temperature: 0,
//     });
//     res.send(response.data.choices[0].text);
// })
//
