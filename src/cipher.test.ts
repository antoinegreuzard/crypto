import { caesarCipher, substitutionCipher } from './cipher/subs';
import { vigenereCipher } from './cipher/poly';
import { rc4, xorCipher, sha256Browser } from './cipher/modern';

describe('Cipher Tests', () => {
  test('Caesar Cipher', () => {
    expect(caesarCipher('abc', 3)).toBe('def');
    expect(caesarCipher('def', 3, true)).toBe('abc');
  });

  test('Substitution Cipher', () => {
    const alphabet = 'zyxwvutsrqponmlkjihgfedcba';
    expect(substitutionCipher('abc', alphabet)).toBe('zyx');
    expect(substitutionCipher('zyx', alphabet, true)).toBe('abc');
  });

  test('Vigenere Cipher', () => {
    expect(vigenereCipher('attackatdawn', 'lemon')).toBe('lxfopvefrnhr');
    expect(vigenereCipher('lxfopvefrnhr', 'lemon', true)).toBe('attackatdawn');
  });

  test('RC4 Cipher', () => {
    expect(rc4('attackatdawn', 'key')).toBe(rc4('attackatdawn', 'key'));
  });

  test('XOR Cipher', () => {
    expect(xorCipher('attack', 'key')).toBe(xorCipher('attack', 'key'));
  });

  test('SHA-256 Hash', async () => {
    const hash = await sha256Browser('hello');
    expect(hash).toBe(
      '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    );
  });
});
