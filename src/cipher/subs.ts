export const caesarCipher = (
  str: string,
  shift: number,
  decrypt: boolean = false,
): string => {
  if (decrypt) {
    shift = -shift;
  }
  return str
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i) != null) {
        let code = char.charCodeAt(0);
        const base = code < 97 ? 65 : 97;
        code = ((code - base + shift + 26) % 26) + base;
        return String.fromCharCode(code);
      }
      return char;
    })
    .join('');
};

export const substitutionCipher = (
  str: string,
  alphabet: string,
  decrypt: boolean = false,
): string => {
  const normalAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  return str
    .split('')
    .map((char) => {
      const index = normalAlphabet.indexOf(char.toLowerCase());
      if (index === -1) return char; // Character not in alphabet

      return decrypt ? normalAlphabet[alphabet.indexOf(char)] : alphabet[index];
    })
    .join('');
};
