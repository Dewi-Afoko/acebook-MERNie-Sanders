const mongoose = require("mongoose");

const PictureSchema = new mongoose.Schema({
    url: String, 
    title: String, 
    alttext: String,
    user: String,
    likes: {
        count: { 
        type: Number,
        default: 0 
        },
        // liked_by: []
        liked_by: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Array of user ids who liked the post
        } 
        ]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Referencing the User model
        required: false
    }
    }, { timestamps: true });


const Picture = mongoose.model("Picture", PictureSchema);


module.exports = Picture;
