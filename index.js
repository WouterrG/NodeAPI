import express from 'express';
import _ from "lodash";
import mongoose from 'mongoose';
import Comment from './models/Comment.js';
import dotenv from "dotenv";

const app = express();
dotenv.config();

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
    const { id } = req.params;
    console.log(id)

    try {
        const comment = await Comment.findById(id);
        return res.status(200).json(comment);

    } catch (err) {
        return res.sendStatus(404);
    }
})

app.post("/comments", async (req, res) => {
    const content = req.body.content;

    if (!content) {
        return res.sendStatus(400);
    }

    const newComment = new Comment({
        comment: content.comment,
        user: content.user
    });
    await newComment.save()

    res.status(201).json({
        comment: newComment,
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

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: 'mainframe',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
