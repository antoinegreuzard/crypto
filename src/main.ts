import './styles.scss'
import { caesarCipher, substitutionCipher, vigenereCipher } from './cipher'

// Helper function to safely use elements
function useElement<T extends HTMLElement> (selector: string, callback: (element: T) => void): void {
  const element = document.getElementById(selector) as T | null
  if (element === null) {
    console.error(`Element with selector "${selector}" not found.`)
    return
  }
  callback(element)
}

// Function to perform encryption or decryption
function encryptOrDecrypt (decrypt: boolean): void {
  useElement<HTMLInputElement>('inputText', (inputText) => {
    useElement<HTMLInputElement>('shift', (shift) => {
      useElement<HTMLSelectElement>('algorithm', (algorithmSelect) => {
        useElement<HTMLElement>('result', (result) => {
          const text = inputText.value
          const shiftValue = isNaN(parseInt(shift.value)) ? 0 : parseInt(shift.value)
          let outputText = ''

          switch (algorithmSelect.value) {
            case 'caesar': {
              outputText = caesarCipher(text, shiftValue, decrypt)
              break
            }
            case 'substitution': {
              const alphabet = 'zyxwvutsrqponmlkjihgfedcba'
              outputText = substitutionCipher(text, alphabet, decrypt)
              break
            }
            case 'vigenere': {
              useElement<HTMLInputElement>('key', (keyElement) => {
                const key = keyElement.value
                if (key.length === 0) {
                  console.error('Clé de chiffrement Vigenère manquante.')
                  return
                }
                outputText = vigenereCipher(text, key, decrypt)
              })
              break
            }
            default:
              console.error('Unknown encryption algorithm selected.')
              return
          }

          result.textContent = outputText
        })
      })
    })
  })
}

// Setup event listeners and dynamically show/hide key input for Vigenère cipher
function setupEventListeners (): void {
  useElement<HTMLButtonElement>('encryptBtn', (encryptBtn) => {
    encryptBtn.addEventListener('click', () => { encryptOrDecrypt(false) })
  })

  useElement<HTMLButtonElement>('decryptBtn', (decryptBtn) => {
    decryptBtn.addEventListener('click', () => { encryptOrDecrypt(true) })
  })

  useElement<HTMLSelectElement>('algorithm', (algorithmSelect) => {
    const shiftInputContainer = document.getElementById('shiftContainer')
    const keyInputContainer = document.getElementById('keyContainer')
    algorithmSelect.addEventListener('change', () => {
      if (algorithmSelect.value === 'vigenere') {
        if (keyInputContainer != null) keyInputContainer.style.display = 'block'
        if (shiftInputContainer != null) shiftInputContainer.style.display = 'none'
      } else if (algorithmSelect.value === 'caesar') {
        if (shiftInputContainer != null) shiftInputContainer.style.display = 'block'
        if (keyInputContainer != null) keyInputContainer.style.display = 'none'
      } else {
        if (shiftInputContainer != null) shiftInputContainer.style.display = 'none'
        if (keyInputContainer != null) keyInputContainer.style.display = 'none'
      }
    })
  })
}

// Execute setup function
setupEventListeners()
