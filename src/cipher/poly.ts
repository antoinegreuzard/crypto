export const vigenereCipher = (
  str: string,
  key: string,
  decrypt: boolean = false,
): string => {
  let keyIndex = 0;
  const keyLength = key.length;
  const shiftChar = (char: string, shift: number): string => {
    let code = char.charCodeAt(0);
    const base = code < 97 ? 65 : 97;
    code = ((code - base + (decrypt ? -shift : shift) + 26) % 26) + base;
    return String.fromCharCode(code);
  };

  return str
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i) != null) {
        const shift =
          key.charCodeAt(keyIndex % keyLength) - (key[0] < 'a' ? 65 : 97);
        const encryptedChar = shiftChar(char, shift);
        keyIndex++;
        return encryptedChar;
      }
      return char;
    })
    .join('');
};
