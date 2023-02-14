const bcrypt = require("bcrypt");

/**
 * Encrypts a given password
 * @param {string} password
 * @returns promise password hash
 */
async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
  return hash;
}

hashPassword("Hola josu");

module.exports = hashPassword;
