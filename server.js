const express = require("express");
const cors = require("cors");
const { application } = require("express");
const app = express();
 
var corsOptions = {
    Origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./app/routes/team.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>  {
    console.log (`The server is running on ${PORT}.` );
});




