import app from "./app.js";
import { PORT } from "./config/env.js";

app.listen(PORT, function () {
  console.log(`El servidor esta ejecutando! http://localhost:${PORT}`);
});
