export class EncryptionService {
  private static INSTANCE = new EncryptionService();

  public static getInstance() {
    return EncryptionService.INSTANCE;
  }

  constructor() {}

  encrypt(salt: string, text: string) {
    // code copy/passed from: https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption
    const textToChars = (text: any) => text.split('').map((c: any) => c.charCodeAt(0));
    const byteHex = (n: any) => ('0' + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code: any) => textToChars(salt).reduce((a: any, b: any) => a ^ b, code);
    return text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
  }

  decrypt(salt: string, encoded: string) {
    // code copy/passed from: https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption
    const textToChars = (text: any) => text.split('').map((c: any) => c.charCodeAt(0));
    const applySaltToChar = (code: any) => textToChars(salt).reduce((a: any, b: any) => a ^ b, code);
    return (encoded.match(/.{1,2}/g) || [])
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join('');
  }
}
