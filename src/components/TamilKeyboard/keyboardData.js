/**
 * Tamil Keyboard Data - Traditional Layout (Option B)
 * 
 * Tamil Unicode Range: U+0B80 to U+0BFF
 * 
 * Layout:
 * Row 1: Vowels (அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ) + Aytham (ஃ)
 * Row 2: Consonants Part 1 (க ங ச ஞ ட ண த ந ப ம)
 * Row 3: Consonants Part 2 (ய ர ல வ ழ ள ற ன)
 * Row 4: Vowel Signs (ா ி ீ ு ூ ெ ே ை ொ ோ ௌ) + Pulli (்)
 * Row 5: Action Keys (Space, Backspace, Clear, Submit)
 */

// Row 1: Vowels + Aytham
export const TAMIL_VOWELS = [
  { char: 'அ', code: '\u0B85', label: 'a' },
  { char: 'ஆ', code: '\u0B86', label: 'aa' },
  { char: 'இ', code: '\u0B87', label: 'i' },
  { char: 'ஈ', code: '\u0B88', label: 'ii' },
  { char: 'உ', code: '\u0B89', label: 'u' },
  { char: 'ஊ', code: '\u0B8A', label: 'uu' },
  { char: 'எ', code: '\u0B8E', label: 'e' },
  { char: 'ஏ', code: '\u0B8F', label: 'ee' },
  { char: 'ஐ', code: '\u0B90', label: 'ai' },
  { char: 'ஒ', code: '\u0B92', label: 'o' },
  { char: 'ஓ', code: '\u0B93', label: 'oo' },
  { char: 'ஔ', code: '\u0B94', label: 'au' },
  { char: 'ஃ', code: '\u0B83', label: 'aytham' }, // Aytham
];

// Row 2: Consonants Part 1
export const TAMIL_CONSONANTS_ROW1 = [
  { char: 'க', code: '\u0B95', label: 'ka' },
  { char: 'ங', code: '\u0B99', label: 'nga' },
  { char: 'ச', code: '\u0B9A', label: 'cha' },
  { char: 'ஞ', code: '\u0B9E', label: 'nja' },
  { char: 'ட', code: '\u0B9F', label: 'ta' },
  { char: 'ண', code: '\u0BA3', label: 'Na' },
  { char: 'த', code: '\u0BA4', label: 'tha' },
  { char: 'ந', code: '\u0BA8', label: 'na' },
  { char: 'ப', code: '\u0BAA', label: 'pa' },
  { char: 'ம', code: '\u0BAE', label: 'ma' },
];

// Row 3: Consonants Part 2
export const TAMIL_CONSONANTS_ROW2 = [
  { char: 'ய', code: '\u0BAF', label: 'ya' },
  { char: 'ர', code: '\u0BB0', label: 'ra' },
  { char: 'ல', code: '\u0BB2', label: 'la' },
  { char: 'வ', code: '\u0BB5', label: 'va' },
  { char: 'ழ', code: '\u0BB4', label: 'zha' },
  { char: 'ள', code: '\u0BB3', label: 'La' },
  { char: 'ற', code: '\u0BB1', label: 'Ra' },
  { char: 'ன', code: '\u0BA9', label: 'na' },
];

// Row 4: Vowel Signs + Pulli
// Note: Some vowel signs are composed of multiple Unicode code points
// ொ = ெ (U+0BC6) + ா (U+0BBE)
// ோ = ே (U+0BC7) + ா (U+0BBE)  
// ௌ = ெ (U+0BC6) + ள (U+0BD7) - actually uses AU length mark
export const TAMIL_VOWEL_SIGNS = [
  { char: 'ா', code: '\u0BBE', label: 'aa', combinesWith: 'consonant' },
  { char: 'ி', code: '\u0BBF', label: 'i', combinesWith: 'consonant' },
  { char: 'ீ', code: '\u0BC0', label: 'ii', combinesWith: 'consonant' },
  { char: 'ு', code: '\u0BC1', label: 'u', combinesWith: 'consonant' },
  { char: 'ூ', code: '\u0BC2', label: 'uu', combinesWith: 'consonant' },
  { char: 'ெ', code: '\u0BC6', label: 'e', combinesWith: 'consonant' },
  { char: 'ே', code: '\u0BC7', label: 'ee', combinesWith: 'consonant' },
  { char: 'ை', code: '\u0BC8', label: 'ai', combinesWith: 'consonant' },
  { char: 'ொ', code: '\u0BC6\u0BBE', label: 'o', combinesWith: 'consonant', isCompound: true },
  { char: 'ோ', code: '\u0BC7\u0BBE', label: 'oo', combinesWith: 'consonant', isCompound: true },
  { char: 'ௌ', code: '\u0BC6\u0BD7', label: 'au', combinesWith: 'consonant', isCompound: true },
  { char: '்', code: '\u0BCD', label: 'pulli', combinesWith: 'consonant' }, // Pulli (Virama)
];

// Row 5: Special/Action Keys
export const SPECIAL_KEYS = {
  space: { char: ' ', code: 'SPACE', label: 'space' },
  backspace: { char: '⌫', code: 'BACKSPACE', label: 'delete' },
  clear: { char: '✕', code: 'CLEAR', label: 'clear' },
  submit: { char: '✓', code: 'SUBMIT', label: 'submit' },
};

// Tamil Unicode helper constants
export const TAMIL_UNICODE = {
  VOWEL_START: 0x0B85,
  VOWEL_END: 0x0B94,
  CONSONANT_START: 0x0B95,
  CONSONANT_END: 0x0BB9,
  VOWEL_SIGN_START: 0x0BBE,
  VOWEL_SIGN_END: 0x0BCC,
  PULLI: 0x0BCD,
  AYTHAM: 0x0B83,
};

/**
 * Check if character is a Tamil consonant
 */
export function isConsonant(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return code >= TAMIL_UNICODE.CONSONANT_START && 
         code <= TAMIL_UNICODE.CONSONANT_END;
}

/**
 * Check if character is a Tamil vowel
 */
export function isVowel(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return code >= TAMIL_UNICODE.VOWEL_START && 
         code <= TAMIL_UNICODE.VOWEL_END;
}

/**
 * Check if character is a Tamil vowel sign
 */
export function isVowelSign(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return (code >= TAMIL_UNICODE.VOWEL_SIGN_START && 
          code <= TAMIL_UNICODE.VOWEL_SIGN_END) ||
         code === TAMIL_UNICODE.PULLI;
}

/**
 * Check if the last character can accept a vowel sign
 */
export function canAcceptVowelSign(text) {
  if (!text || text.length === 0) return false;
  const lastChar = text[text.length - 1];
  return isConsonant(lastChar);
}

/**
 * Get the last base character (for vowel sign combination)
 */
export function getLastBaseChar(text) {
  if (!text || text.length === 0) return null;
  
  // Traverse backwards to find the base consonant
  for (let i = text.length - 1; i >= 0; i--) {
    if (isConsonant(text[i])) {
      return { char: text[i], index: i };
    }
  }
  return null;
}
