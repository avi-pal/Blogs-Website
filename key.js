const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin_avirup:0rug5n3zPlfNfzod@cluster0.rwwzv.mongodb.net/blogpost",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("successfully connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const keySchema = {
  akey: String,
};
const Acckey = new mongoose.model("Acckey", keySchema);

const acckey = new Acckey({
  akey: "admin123",
});
acckey.save().then(() => {
  console.log("Added Key");
  mongoose.connection.close().then(() => {
    console.log("connection closed");
  });
});
