
import CryptoJS from 'crypto-js'


const salt = "Hk0nhT7GSdDbBUe9FWPYgzxAwmc3pCE1Ji";
const genSecretKey = (key) => CryptoJS.SHA256(`${key}${salt}`).toString();

export const encrypt = (message, key) => CryptoJS.AES.encrypt(message, genSecretKey(key)).toString();
export const decrypt = (message, key) => CryptoJS.AES.decrypt(message.toString(), genSecretKey(key)).toString(CryptoJS.enc.Utf8);