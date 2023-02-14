const bcrypt = require("bcrypt");

async function validatePassword(hash, password) {
  const isValid = await bcrypt.compare(password, hash);
  console.log(isValid);
}

validatePassword(
  "$2b$10$ZsAteUn/uAWQ2Q/N4L3qGO5V8HTweqR/RShZxt54A44cXUHhKb5I2",
  "Hola josus"
);
