var mongoose = require('mongoose');

const reviewschema = mongoose.Schema({
    reviewprofileimage: [
        {
          public_id: {
            type: String,
            required: true,
            default:null,
          },
          url: {
            type: String,
            required: true,
            default:null,
          },
        },
      ],
    user: {
        type:String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        default:null,
      },
})

module.exports = mongoose.model("Review", reviewschema);