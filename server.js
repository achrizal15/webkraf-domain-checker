const express = require("express")
const cors = require('cors');
require('dotenv').config();
const app = express();
// Middleware untuk parsing body pada request
app.use(express.json());
app.use(cors())
// Import Routes
const routes = require("./routes");
app.use("/api", routes);

// Jalankan server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
