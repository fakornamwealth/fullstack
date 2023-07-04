import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // userId
    product: [
      {
        productId: {
          type: String,
        },

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    quantity: {
      type: Number,
      default: 1,
    },
    amount: { type: Number, required: true },
    total: { type: Number },
    status: { type: String, default: 'pending...' },
  },
  { timestamps: true }
);

export default mongoose.model('Cart', CartSchema);
