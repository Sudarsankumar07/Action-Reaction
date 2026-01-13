/**
 * Tamil Keyboard Component
 * 
 * A custom on-screen Tamil keyboard for the Action-Reaction game.
 * Automatically appears when Tamil language is selected, eliminating
 * the need for users to manually switch their device keyboard.
 * 
 * Usage:
 * ```jsx
 * import TamilKeyboard from '../components/TamilKeyboard';
 * 
 * <TamilKeyboard
 *   value={userInput}
 *   onChange={setUserInput}
 *   onSubmit={handleSubmit}
 *   visible={language === 'ta'}
 *   placeholder="தட்டச்சு செய்யவும்..."
 * />
 * ```
 * 
 * Props:
 * - value: string - Current input value
 * - onChange: function - Callback when input changes
 * - onSubmit: function - Callback when submit is pressed
 * - visible: boolean - Whether to show the keyboard
 * - showInput: boolean - Whether to show the input display
 * - maxLength: number - Maximum input length
 * - placeholder: string - Placeholder text
 * - disabled: boolean - Disable all keys
 */

export { default } from './TamilKeyboard';
export * from './keyboardData';
export { styles, KEYBOARD_COLORS } from './styles';
