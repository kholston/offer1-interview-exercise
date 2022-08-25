import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
  licenseNumber: { type: String, required: true },
  licenseState: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: { type: String, required: true },
});

AgentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Agent", AgentSchema);
