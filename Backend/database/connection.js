const mongoose = require('mongoose');

const URI =
  'mongodb+srv://admin:admin@cluster0.yqtrk.mongodb.net/UberTreats?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log('Database Connected!');
};

module.exports = connectDB;
