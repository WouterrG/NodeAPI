const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

app.get("/outfit", (req, res) => {
    const tops = ["Black", "White", "Orange", "Navy"];
    const jeans = ["Black", "Beige", "Grey", "Navy"];
    const shoes = ["Black", "White", "Brown"];

    res.json({
        top: _.sample(tops),
        jeans: _.sample(jeans),
        shoes: _.sample(shoes)
    });
});

app.get("/comment/:id", async (req, res) => {
    const id = req.params.id;
    let content;

    try {
        content = await fs.readFile(`data/comment/${id}.txt`, "utf-8");
    } catch (err) {
        return res.sendStatus(404);
    }

    res.json({
        content: content
    })
})

app.post("/comments", async (req, res) => {
    const id = uuid();
    const content = req.body.content;

    if (!content) {
        return res.sendStatus(400);
    }

    await fs.mkdir("data/comments", { recursive: true});
    await fs.writeFile(`data/comments/${id}.txt`, content);

    res.status(201).json({
        id: id
    });
})

app.post("/summation", async (req, res) => {  

    if (!req.body.content) {
        return res.sendStatus(400);
    }

    const firstNumber = req.body.content.firstNumber;
    const secondNumber = req.body.content.secondNumber;

    const sum = firstNumber + secondNumber;

    res.status(201).json({
        answer: sum
    });
})

app.listen(3001, () => console.log("API Server is running..."));