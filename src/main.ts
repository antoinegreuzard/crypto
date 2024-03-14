import './styles.scss'
import { caesarCipher, substitutionCipher } from './cipher'

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
              // Example substitution alphabet, should be customized for actual use
              const alphabet = 'zyxwvutsrqponmlkjihgfedcba'
              outputText = substitutionCipher(text, alphabet, decrypt)
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

// Setup event listeners
function setupEventListeners (): void {
  useElement<HTMLButtonElement>('encryptBtn', (encryptBtn) => {
    encryptBtn.addEventListener('click', () => { encryptOrDecrypt(false) })
  })

  useElement<HTMLButtonElement>('decryptBtn', (decryptBtn) => {
    decryptBtn.addEventListener('click', () => { encryptOrDecrypt(true) })
  })
}

// Execute setup function
setupEventListeners()
