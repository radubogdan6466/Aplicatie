import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb://${username}:${password}@ac-mfsrlct-shard-00-00.97l7kxn.mongodb.net:27017,ac-mfsrlct-shard-00-01.97l7kxn.mongodb.net:27017,ac-mfsrlct-shard-00-02.97l7kxn.mongodb.net:27017/?ssl=true&replicaSet=atlas-1l7oku-shard-0&authSource=admin&retryWrites=true&w=majority`;

  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Conectat cu bd");
  } catch (error) {
    console.log("Naspa, eroare la conectare cu bd", error);
  }
};

export default Connection;
