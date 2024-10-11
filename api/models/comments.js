const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    post_id: { type: mongoose.Schema.ObjectId, ref: "Post" },

    picture_id: { type: mongoose.Schema.ObjectId, ref: "Picture" },

    user: { type: String },

    comment: { type: String },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);


module.exports = Comment;
