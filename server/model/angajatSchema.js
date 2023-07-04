import mongoose from "mongoose";

const angajatSchema = mongoose.Schema({
  name: String,
  prenume: String,
  dataNastere: String,
  adresa: String,
  telefon: String,
  email: String,
  cetatenie: String,
  cnp: String,
  stareCivila: String,
  salBrut: Number,
  functia: String,
  dataAngajare: String,
  departament: String,
  bonus: Number,
  beneficii: Number,
  contIban: String,
  supervizor: String,
  dispOreSuplim: String,
  cas: Number,
  cass: Number,
  impozit: Number,
  salNet: Number,
  deducere: Number,
});

const angajat = mongoose.model("angajat", angajatSchema);

export default angajat;
