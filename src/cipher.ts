export const caesarCipher = (str: string, shift: number, decrypt: boolean = false): string => {
  if (decrypt) {
    shift = -shift
  }
  return str
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i) != null) {
        let code = char.charCodeAt(0)
        const base = code < 97 ? 65 : 97
        code = ((code - base + shift + 26) % 26) + base
        return String.fromCharCode(code)
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

export const vigenereCipher = (str: string, key: string, decrypt: boolean = false): string => {
  let keyIndex = 0
  const keyLength = key.length
  const shiftChar = (char: string, shift: number) => {
    let code = char.charCodeAt(0)
    const base = code < 97 ? 65 : 97
    code = ((code - base + (decrypt ? -shift : shift) + 26) % 26) + base
    return String.fromCharCode(code)
  }

  return str
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i) != null) {
        const shift = key.charCodeAt(keyIndex % keyLength) - (key[0] < 'a' ? 65 : 97)
        const encryptedChar = shiftChar(char, shift)
        keyIndex++
        return encryptedChar
      }
      return char
    })
    .join('')
}
