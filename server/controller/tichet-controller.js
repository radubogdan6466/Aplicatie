import Tichet from "../model/tichet.js";

export const createTichet = async (request, response) => {
  try {
    const tichet = new Tichet(request.body);
    await tichet.save();

    response.status(200).json("Tichet salvat");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteTichet = async (request, response) => {
  try {
    const tichet = await Tichet.findById(request.params.id);

    await tichet.delete();

    response.status(200).json("Tichet sters");
  } catch (error) {
    response.status(500).json(error);
  }
};
export const getTichet = async (request, response) => {
  try {
    const tichet = await Tichet.findById(request.params.id);

    response.status(200).json(tichet);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAllTichete = async (request, response) => {
  let username = request.query.username;

  try {
    let tichete;
    if (username) {
      tichete = await Tichet.find({ username: username });
    } else {
      tichete = await Tichet.find({});
    }

    response.status(200).json(tichete);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updateTichet = async (request, response) => {
  try {
    const tichet = await Tichet.findById(request.params.id);

    if (!tichet) {
      response.status(404).json({ msg: "Tichetul nu a fost gasit" });
      return;
    }

    await Tichet.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("Tichet status schimbat");
  } catch (error) {
    response.status(500).json(error);
  }
};
