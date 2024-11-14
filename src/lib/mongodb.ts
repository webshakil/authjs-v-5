import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const dbName = process.env.MONGO_DBNAME;

  if (!username || !password || !dbName) {
    throw new Error("MONGO_USERNAME, MONGO_PASSWORD, or MONGO_DBNAME is not defined");
  }

  const uri = `mongodb+srv://${username}:${password}@mernstack-pagination.dmkoc.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  return mongoose.connect(uri, {
  
  });
};

export default dbConnect;




