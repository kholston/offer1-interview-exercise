import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  propertyType: { type: String, required: true },
  squareFeet: { type: Number, required: true },
  numberBedrooms: { type: Number, required: true },
  numberBaths: { type: Number, required: true },
  description: { type: String, required: true },
  primaryOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
  ownerType: { type: String, required: true },
  primaryImageUrl: { type: String, required: true },
});

PropertySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id;
    delete returnedObject.__v;
  },
});
export default mongoose.model("Property", PropertySchema);
