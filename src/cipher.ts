export const caesarCipher = (str: string, shift: number, decrypt: boolean = false): string => {
  shift = decrypt ? -shift : shift

  return str
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i) != null) {
        const code = char.charCodeAt(0)

        const shiftAmount = ((code >= 65 && code <= 90 ? 65 : 97) + shift + 26) % 26
        return String.fromCharCode(shiftAmount + (code >= 65 && code <= 90 ? 65 : 97))
      }
      return char
    })
    .join('')
}

export const substitutionCipher = (str: string, alphabet: string, decrypt: boolean = false): string => {
  const normalAlphabet = 'abcdefghijklmnopqrstuvwxyz'
  return str
    .split('')
    .map((char) => {
      const index = normalAlphabet.indexOf(char.toLowerCase())
      if (index === -1) return char // Character not in alphabet

      return decrypt ? normalAlphabet[alphabet.indexOf(char)] : alphabet[index]
    })
    .join('')
}
