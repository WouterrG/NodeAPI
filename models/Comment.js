import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
            max: 400,
        },
        user: {
            type: String,
            required: true,
            min: 2,
            max: 50
        }
    }, {timestamps: true}
)

const Comment = mongoose.model("Comment", CommentSchema)
export default Comment