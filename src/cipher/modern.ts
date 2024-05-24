import { SHA256 as cryptoJsSHA256 } from 'crypto-js';
import { TextEncoder } from 'util';

let subtle: SubtleCrypto;
if (typeof global !== 'undefined' && global.crypto && global.crypto.subtle) {
  subtle = global.crypto.subtle;
} else if (
  typeof window !== 'undefined' &&
  window.crypto &&
  window.crypto.subtle
) {
  subtle = window.crypto.subtle;
}

export async function sha256Browser(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  if (subtle) {
    const hashBuffer = await subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } else {
    return cryptoJsSHA256(text).toString();
  }
}

/**
 * Chiffre RC4
 */
export const rc4 = (text: string, key: string): string => {
  const s = Array.from({ length: 256 }, (_, k) => k);
  let j = 0;
  let out = '';

  // Initialisation de la permutation de S
  for (let i = 0; i < 256; i++) {
    j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
    [s[i], s[j]] = [s[j], s[i]];
  }

  // Génération de la séquence clé
  let i = 0;
  j = 0;
  for (let y = 0; y < text.length; y++) {
    i = (i + 1) % 256;
    j = (j + s[i]) % 256;
    [s[i], s[j]] = [s[j], s[i]];
    const k = s[(s[i] + s[j]) % 256];
    out += String.fromCharCode(text.charCodeAt(y) ^ k);
  }

  return out;
};

/**
 * Chiffre XOR
 */
export const xorCipher = (text: string, key: string): string => {
  let result = '';

  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length),
    );
  }

  return result;
};
