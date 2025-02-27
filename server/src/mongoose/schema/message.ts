import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

messageSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
