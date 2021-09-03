const crypto = require('crypto')
/**
 * Crea un string aleatorio de 32 letras.
 */
function createSalt () {
  return crypto.randomBytes(16).toString('hex')
}
/**
 *
 * @param {String} pass - Contraseña cruda
 * @param {String} salt - Salt para enciptar la contraseña
 *
 * Crea un has de una texto plano, usando un salt.
 * Se encripta usandno SHA512 iterando 1000 veces y obtniendo 64 caracteres.
 */
function createHash (pass, salt) {
  return crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex')
}
/**
 *
 * @param {String} password - Contraseña cruda
 * @param {Object} user - Documento del usuario
 *
 * Compara el password de un objeto usuario con una contraseña cruda.
 */
function checkPassword (password, user) {
  if (user == null) {
    return false
  } else {
    var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
    return hash === user.password
  }
}

module.exports = {
  createSalt, createHash, checkPassword
}
