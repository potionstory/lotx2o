import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Lotto = new Schema({
  username: { type: Schema.Types.ObjectId, ref: "account" },
  number: Array,
  created: { type: Date, default: Date.now }
});

export default mongoose.model("lotto", Lotto);
