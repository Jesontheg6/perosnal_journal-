import CryptoJS from 'crypto-js'

const salt = "Hk0nhT7GSdDbBUe9FWPYgzxAwmc3pCE1Ji";

const secretKey = CryptoJS.SHA256(`${global.secretKey}${salt}`).toString();

export const encryptData = (message) => CryptoJS.AES.encrypt(message, secretKey).toString();
export const decryptData = (message) => CryptoJS.AES.decrypt(message.toString(), secretKey).toString(CryptoJS.enc.Utf8);

