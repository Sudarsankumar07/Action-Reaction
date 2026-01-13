import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Calculate key size based on screen width to fit all keys
// Row 1 has 13 keys (vowels + aytham), which is the most keys in a row
const MAX_KEYS_IN_ROW = 13;
const HORIZONTAL_PADDING = 8; // Total padding on sides
const KEY_MARGIN = 2; // Margin on each side of key
const TOTAL_KEY_MARGINS = MAX_KEYS_IN_ROW * (KEY_MARGIN * 2);
const AVAILABLE_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING - TOTAL_KEY_MARGINS;
const CALCULATED_KEY_WIDTH = Math.floor(AVAILABLE_WIDTH / MAX_KEYS_IN_ROW);

// Responsive key sizing - ensures keys fit on screen
const getKeySize = () => {
  const baseWidth = Math.min(CALCULATED_KEY_WIDTH, 28); // Cap at 28 for larger screens
  const minWidth = 22; // Minimum readable size
  const keyWidth = Math.max(baseWidth, minWidth);
  
  if (SCREEN_WIDTH < 360) {
    return { width: Math.max(keyWidth - 2, 20), height: 38, fontSize: 16 };
  } else if (SCREEN_WIDTH < 400) {
    return { width: keyWidth, height: 40, fontSize: 17 };
  } else {
    return { width: Math.min(keyWidth + 2, 28), height: 42, fontSize: 18 };
  }
};

const keySize = getKeySize();

// Color scheme matching app theme
export const KEYBOARD_COLORS = {
  // Background
  keyboardBackground: '#1a1a2e',
  
  // Input display
  inputBackground: '#0d0d1a',
  inputText: '#FFFFFF',
  inputBorder: '#00FFC5',
  inputPlaceholder: '#666666',
  cursor: '#00FFC5',
  
  // Key types
  vowel: {
    background: '#1a1a40',
    backgroundPressed: '#2c2c54',
    text: '#FFD93D', // Golden yellow for vowels
  },
  consonant: {
    background: '#16213e',
    backgroundPressed: '#0f3460',
    text: '#FFFFFF',
  },
  vowelSign: {
    background: '#0f3460',
    backgroundPressed: '#1e5f74',
    text: '#00FFC5', // Cyan for vowel signs
  },
  special: {
    background: '#1a1a40',
    backgroundPressed: '#2c2c54',
    text: '#FF6B6B', // Red for special chars
  },
  space: {
    background: '#2c2c54',
    backgroundPressed: '#3d3d6b',
    text: '#888888',
  },
  delete: {
    background: '#ff6b6b',
    backgroundPressed: '#ee5a5a',
    text: '#FFFFFF',
  },
  clear: {
    background: '#ff9f43',
    backgroundPressed: '#e58e3a',
    text: '#FFFFFF',
  },
  submit: {
    background: '#00FFC5',
    backgroundPressed: '#00d4a4',
    text: '#1a1a2e',
  },
};

export const styles = StyleSheet.create({
  // Main container
  container: {
    backgroundColor: KEYBOARD_COLORS.keyboardBackground,
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    width: '100%',
    alignSelf: 'center',
  },
  
  // Input display area
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KEYBOARD_COLORS.inputBackground,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: KEYBOARD_COLORS.inputBorder,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 6,
    marginBottom: 10,
    minHeight: 48,
  },
  inputText: {
    flex: 1,
    fontSize: 22,
    color: KEYBOARD_COLORS.inputText,
    fontFamily: Platform.select({
      ios: 'Tamil Sangam MN',
      android: 'NotoSansTamil-Regular',
      default: 'sans-serif',
    }),
    // Ensure proper text rendering direction
    writingDirection: 'ltr',
    textAlign: 'left',
  },
  placeholder: {
    color: KEYBOARD_COLORS.inputPlaceholder,
    fontStyle: 'italic',
    fontSize: 16,
  },
  cursor: {
    width: 2,
    height: 26,
    backgroundColor: KEYBOARD_COLORS.cursor,
    marginLeft: 2,
  },
  
  // Keyboard rows
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 2,
    flexWrap: 'nowrap',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 6,
    flexWrap: 'nowrap',
  },
  
  // Individual key styles
  key: {
    width: keySize.width,
    minWidth: keySize.width,
    maxWidth: keySize.width,
    height: keySize.height,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: KEY_MARGIN,
    marginVertical: 2,
    paddingHorizontal: 2,
  },
  keyText: {
    fontSize: keySize.fontSize,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Tamil Sangam MN',
      android: 'NotoSansTamil-Regular', 
      default: 'sans-serif',
    }),
  },
  
  // Key type specific styles
  vowelKey: {
    backgroundColor: KEYBOARD_COLORS.vowel.background,
  },
  vowelKeyPressed: {
    backgroundColor: KEYBOARD_COLORS.vowel.backgroundPressed,
  },
  vowelKeyText: {
    color: KEYBOARD_COLORS.vowel.text,
  },
  
  consonantKey: {
    backgroundColor: KEYBOARD_COLORS.consonant.background,
  },
  consonantKeyPressed: {
    backgroundColor: KEYBOARD_COLORS.consonant.backgroundPressed,
  },
  consonantKeyText: {
    color: KEYBOARD_COLORS.consonant.text,
  },
  
  vowelSignKey: {
    backgroundColor: KEYBOARD_COLORS.vowelSign.background,
  },
  vowelSignKeyPressed: {
    backgroundColor: KEYBOARD_COLORS.vowelSign.backgroundPressed,
  },
  vowelSignKeyText: {
    color: KEYBOARD_COLORS.vowelSign.text,
  },
  
  specialKey: {
    backgroundColor: KEYBOARD_COLORS.special.background,
  },
  specialKeyPressed: {
    backgroundColor: KEYBOARD_COLORS.special.backgroundPressed,
  },
  specialKeyText: {
    color: KEYBOARD_COLORS.special.text,
  },
  
  // Action keys
  spaceKey: {
    backgroundColor: KEYBOARD_COLORS.space.background,
    width: SCREEN_WIDTH * 0.25,
    minWidth: SCREEN_WIDTH * 0.25,
    maxWidth: SCREEN_WIDTH * 0.25,
    paddingHorizontal: 8,
  },
  spaceKeyPressed: {
    backgroundColor: KEYBOARD_COLORS.space.backgroundPressed,
  },
  spaceKeyText: {
    color: KEYBOARD_COLORS.space.text,
    fontSize: 12,
    fontWeight: '500',
  },
  
  deleteKey: {
    backgroundColor: KEYBOARD_COLORS.delete.background,
    width: 44,
    minWidth: 44,
    maxWidth: 44,
  },
  deleteKeyPressed: {
    backgroundColor: KEYBOARD_COLORS.delete.backgroundPressed,
  },
  deleteKeyText: {
    color: KEYBOARD_COLORS.delete.text,
    fontSize: 18,
  },
  
  clearKey: {
    backgroundColor: KEYBOARD_COLORS.clear.background,
    width: 50,
    minWidth: 50,
    maxWidth: 50,
  },
  clearKeyPressed: {
    backgroundColor: KEYBOARD_COLORS.clear.backgroundPressed,
  },
  clearKeyText: {
    color: KEYBOARD_COLORS.clear.text,
    fontSize: 11,
    fontWeight: '600',
  },
  
  submitKey: {
    backgroundColor: KEYBOARD_COLORS.submit.background,
    width: 70,
    minWidth: 70,
    maxWidth: 70,
    paddingHorizontal: 8,
  },
  submitKeyPressed: {
    backgroundColor: KEYBOARD_COLORS.submit.backgroundPressed,
  },
  submitKeyText: {
    color: KEYBOARD_COLORS.submit.text,
    fontSize: 11,
    fontWeight: '700',
  },
  
  // Row labels (optional)
  rowLabel: {
    position: 'absolute',
    left: 8,
    fontSize: 10,
    color: '#666666',
    fontWeight: '500',
  },
  
  // Keyboard header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    color: '#888888',
    fontSize: 20,
  },
});

export default styles;
