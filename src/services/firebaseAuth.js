// src/services/firebaseAuth.js
import auth from '@react-native-firebase/auth';

/**
 * Sign in anonymously with Firebase
 * This happens silently without any UI
 * @returns {Promise<object>} User credential with JWT token
 */
export async function signInAnonymously() {
    try {
        const userCredential = await auth().signInAnonymously();
        const user = userCredential.user;

        // Get the Firebase JWT token
        const idToken = await user.getIdToken();

        console.log('✅ Firebase: Signed in anonymously');
        console.log('🔑 User ID:', user.uid);

        return {
            success: true,
            uid: user.uid,
            token: idToken,
        };
    } catch (error) {
        console.error('❌ Firebase sign-in failed:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Get current user's JWT token
 * Automatically signs in if no user is logged in
 * @returns {Promise<string|null>} Firebase JWT token
 */
export async function getCurrentUserToken() {
    try {
        const currentUser = auth().currentUser;

        if (!currentUser) {
            console.log('⚠️ No user signed in, signing in anonymously...');
            const result = await signInAnonymously();
            return result.success ? result.token : null;
        }

        // Refresh token to ensure it's not expired
        const token = await currentUser.getIdToken(true);
        return token;
    } catch (error) {
        console.error('❌ Failed to get user token:', error);
        return null;
    }
}

/**
 * Check if user is signed in
 * @returns {boolean}
 */
export function isUserSignedIn() {
    return auth().currentUser !== null;
}

/**
 * Listen for authentication state changes
 * @param {function} callback - Called when auth state changes
 * @returns {function} Unsubscribe function
 */
export function onAuthStateChanged(callback) {
    return auth().onAuthStateChanged(callback);
}

/**
 * Get current user info
 * @returns {object|null} User information
 */
export function getCurrentUser() {
    const user = auth().currentUser;
    if (user) {
        return {
            uid: user.uid,
            isAnonymous: user.isAnonymous,
            metadata: user.metadata,
        };
    }
    return null;
}
