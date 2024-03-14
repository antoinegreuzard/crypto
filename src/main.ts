import { rc4, sha256Browser, xorCipher } from './cipher/modern';
import { vigenereCipher } from './cipher/poly';
import { caesarCipher, substitutionCipher } from './cipher/subs';
import './styles.scss';

function useElement<T extends HTMLElement>(
  selector: string,
  callback: (element: T) => void,
): void {
  const element = document.getElementById(selector) as T | null;
  if (element === null) {
    console.error(`Element with selector "${selector}" not found.`);
    return;
  }
  callback(element);
}

function encryptOrDecrypt(decrypt: boolean): void {
  useElement<HTMLInputElement>('inputText', (inputText) => {
    useElement<HTMLInputElement>('shift', (shift) => {
      useElement<HTMLSelectElement>('algorithm', (algorithmSelect) => {
        useElement<HTMLElement>('result', (result) => {
          const text = inputText.value;
          const shiftValue = isNaN(parseInt(shift.value))
            ? 0
            : parseInt(shift.value);
          let outputText = '';

          void (async () => {
            switch (algorithmSelect.value) {
              case 'caesar': {
                outputText = caesarCipher(text, shiftValue, decrypt);
                break;
              }
              case 'substitution': {
                const alphabet = 'zyxwvutsrqponmlkjihgfedcba';
                outputText = substitutionCipher(text, alphabet, decrypt);
                break;
              }
              case 'vigenere': {
                useElement<HTMLInputElement>('key', (keyElement) => {
                  const key = keyElement.value;
                  if (key.length === 0) {
                    outputText = 'Clé de chiffrement manquante.';
                  } else {
                    outputText = vigenereCipher(text, key, decrypt);
                  }
                });
                break;
              }
              case 'rc4':
                useElement<HTMLInputElement>('key', (keyElement) => {
                  const key = keyElement.value;
                  if (key.length === 0) {
                    outputText = 'Clé de chiffrement RC4 manquante.';
                  } else {
                    outputText = rc4(text, key);
                  }
                });
                break;
              case 'xor': {
                useElement<HTMLInputElement>('key', (keyElement) => {
                  const key = keyElement.value;
                  if (key.length === 0) {
                    outputText = 'Clé de chiffrement manquante.';
                  } else {
                    outputText =
                      algorithmSelect.value === 'rc4'
                        ? rc4(text, key)
                        : xorCipher(text, key);
                  }
                });
                break;
              }
              case 'sha256': {
                outputText = await sha256Browser(text);
                break;
              }
              default: {
                console.error('Unknown encryption algorithm selected.');
                return;
              }
            }

            result.textContent = outputText;
          })();
        });
      });
    });
  });
}

function setupEventListeners(): void {
  useElement<HTMLButtonElement>('encryptBtn', (encryptBtn) => {
    encryptBtn.addEventListener('click', () => {
      encryptOrDecrypt(false);
    });
  });

  useElement<HTMLButtonElement>('decryptBtn', (decryptBtn) => {
    decryptBtn.addEventListener('click', () => {
      encryptOrDecrypt(true);
    });
  });

  useElement<HTMLSelectElement>('algorithm', (algorithmSelect) => {
    const shiftInputContainer = document.getElementById('shiftContainer');
    const keyInputContainer = document.getElementById('keyContainer');
    const keyElement = document.getElementById(
      'key',
    ) as HTMLInputElement | null;

    if (
      shiftInputContainer == null ||
      keyInputContainer == null ||
      keyElement == null
    ) {
      console.error('One or more containers or elements are missing.');
      return;
    }

    algorithmSelect.addEventListener('change', () => {
      const isCipherWithKey = ['vigenere', 'rc4', 'xor'].includes(
        algorithmSelect.value,
      );
      const isCipherWithShift = ['caesar'].includes(algorithmSelect.value);

      shiftInputContainer.style.display = isCipherWithShift ? 'block' : 'none';
      keyInputContainer.style.display = isCipherWithKey ? 'block' : 'none';

      if (algorithmSelect.value === 'xor') {
        keyElement.type = 'number';
        keyElement.placeholder = 'Clé numérique (pour XOR)';
      } else {
        keyElement.type = 'text';
        keyElement.placeholder = 'Clé de chiffrement (pour RC4, Vigenère)';
      }
    });
  });
}

setupEventListeners();
