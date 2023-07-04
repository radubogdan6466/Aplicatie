import mongoose from "mongoose";

const TichetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
  mesaj: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  tipCerere: {
    type: String,
  },
  raspuns: {
    type: String,
  },
});

const tichet = mongoose.model("tichet", TichetSchema);

export default tichet;
