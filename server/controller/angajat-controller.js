import Angajat from "../model/angajatSchema.js";

export const createAngajat = async (request, response) => {
  try {
    const angajat = new Angajat(request.body);
    await angajat.save();

    response.status(200).json("Angajat saved successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteAngajat = async (request, response) => {
  try {
    const angajat = await Angajat.findById(request.params.id);

    await angajat.delete();

    response.status(200).json("post deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
export const getAngajat = async (request, response) => {
  try {
    const angajat = await Angajat.findById(request.params.id);

    response.status(200).json(angajat);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAllAngajati = async (request, response) => {
  let username = request.query.username;

  try {
    let angajati;
    if (username) {
      angajati = await Angajat.find({ username: username });
    } else {
      angajati = await Angajat.find({});
    }

    response.status(200).json(angajati);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updateAngajat = async (request, response) => {
  try {
    const angajat = await Angajat.findById(request.params.id);

    if (!angajat) {
      response.status(404).json({ msg: "Angajat not found" });
      return;
    }

    await Angajat.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("Angajat updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
