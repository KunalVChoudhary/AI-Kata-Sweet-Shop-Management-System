const { Schema, model } = require('mongoose');

const sweetSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      default: 'Indian'
    }
  },
  {
    timestamps: true
  }
);

const Sweet = model('Sweet', sweetSchema);
module.exports = Sweet;
