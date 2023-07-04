import Cerere from "../model/cereri.js";

export const newCerere = async (request, response) => {
  try {
    const cerere = await new Cerere(request.body);
    cerere.save();

    response.status(200).json("Comment saved successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAllCereri = async (request, response) => {
  try {
    const cereri = await Cerere.find({ postId: request.params.id });

    response.status(200).json(cereri);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const stergeCerere = async (request, response) => {
  try {
    const cerere = await Cerere.findById(request.params.id);
    await cerere.delete();

    response.status(200).json("comment deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
export const updateCerere = async (request, response) => {
  try {
    const cerere = await new Cerere.findById(request.params.id);

    if (!cerere) {
      response.status(404).json({ msg: "Tichet not found" });
      return;
    }
    await Cerere.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("Tichet inchis");
  } catch (error) {
    response.status(500).json(error);
  }
};
/**
 *
 *
 *
 *
 */

/**
 * export const updateCerere = async (request, response) => {
  try {
    const cerere = await new Cerere.findById(request.params.id);

    if (!cerere) {
      response.status(404).json({ msg: "Tichet not found" });
      return;
    }
    await Cerere.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("Tichet inchis");
  } catch (error) {
    response.status(500).json(error);
  }
};
 *
 */
