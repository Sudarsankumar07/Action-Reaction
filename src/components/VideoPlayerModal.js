import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const { width, height } = Dimensions.get('window');
// Use more screen real estate for better video display
const H_PADDING_TOTAL = spacing.lg * 2;
const MAX_WIDTH = Math.min(width - H_PADDING_TOTAL, 1200);
const MAX_HEIGHT = Math.min(height * 0.9, 1200);
// Use 16:9 as base but allow the video to determine final sizing
let VIDEO_WIDTH = Math.round(MAX_WIDTH);
let VIDEO_HEIGHT = Math.round((VIDEO_WIDTH * 9) / 16);
if (VIDEO_HEIGHT > MAX_HEIGHT) {
    VIDEO_HEIGHT = Math.round(MAX_HEIGHT);
    VIDEO_WIDTH = Math.round((VIDEO_HEIGHT * 16) / 9);
}

export default function VideoPlayerModal({ visible, onClose, source }) {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasVideo, setHasVideo] = useState(false);

    // Enable video if a source prop is provided
    useEffect(() => {
        setHasVideo(!!source);
        setIsLoading(!source);
    }, [source]);

    useEffect(() => {
        if (visible && videoRef.current && hasVideo) {
            // Play video when modal opens
            videoRef.current.playAsync();
        } else if (!visible && videoRef.current && hasVideo) {
            // Pause when modal closes
            videoRef.current.pauseAsync();
            videoRef.current.setPositionAsync(0); // Reset to beginning
        }
    }, [visible, hasVideo]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                {/* Close button */}
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                    activeOpacity={0.8}
                >
                    <View style={styles.closeButtonInner}>
                        <Ionicons name="close" size={24} color={colors.white} />
                    </View>
                </TouchableOpacity>

                {/* Video container */}
                    <View style={styles.videoContainer}>
                    {hasVideo ? (
                        <>
                            {isLoading && (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="large" color={colors.primary} />
                                    <Text style={styles.loadingText}>Loading tutorial...</Text>
                                </View>
                            )}
                                <Video
                                    ref={videoRef}
                                    source={typeof source === 'string' ? { uri: source } : source}
                                    style={{ width: VIDEO_WIDTH, height: VIDEO_HEIGHT }}
                                    useNativeControls
                                    resizeMode={ResizeMode.CONTAIN}
                                    shouldPlay={visible}
                                    isLooping
                                    onLoad={() => setIsLoading(false)}
                                    onError={(error) => {
                                        console.log('Video error:', error);
                                        setHasVideo(false);
                                        setIsLoading(false);
                                    }}
                                />
                        </>
                    ) : (
                    /* Placeholder - shows instructions until video is added */
                    <LinearGradient
                        colors={[colors.primary, colors.primaryDark]}
                        style={styles.placeholder}
                    >
                        <Ionicons name="play-circle" size={64} color={colors.white} />
                        <Text style={styles.placeholderTitle}>How to Play</Text>
                        <Text style={styles.placeholderSubtitle}>Multiplayer Mode</Text>

                        <View style={styles.instructionContainer}>
                            <View style={styles.instructionItem}>
                                <View style={styles.instructionNumber}>
                                    <Text style={styles.instructionNumberText}>1</Text>
                                </View>
                                <Text style={styles.instructionText}>Hold phone to your forehead</Text>
                            </View>

                            <View style={styles.instructionItem}>
                                <View style={styles.instructionNumber}>
                                    <Text style={styles.instructionNumberText}>2</Text>
                                </View>
                                <Text style={styles.instructionText}>Friends act out the word</Text>
                            </View>

                            <View style={styles.instructionItem}>
                                <View style={styles.instructionNumber}>
                                    <Text style={styles.instructionNumberText}>3</Text>
                                </View>
                                <Text style={styles.instructionText}>Tilt DOWN ⬇️ for correct</Text>
                            </View>

                            <View style={styles.instructionItem}>
                                <View style={styles.instructionNumber}>
                                    <Text style={styles.instructionNumberText}>4</Text>
                                </View>
                                <Text style={styles.instructionText}>Tilt UP ⬆️ to skip</Text>
                            </View>

                            <View style={styles.instructionItem}>
                                <View style={styles.instructionNumber}>
                                    <Text style={styles.instructionNumberText}>5</Text>
                                </View>
                                <Text style={styles.instructionText}>Beat the 60-second clock!</Text>
                            </View>
                        </View>

                        <Text style={styles.placeholderNote}>
                            Video tutorial coming soon!
                        </Text>
                    </LinearGradient>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing.lg,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: spacing.lg,
        zIndex: 10,
    },
    closeButtonInner: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
        videoContainer: {
            flex: 1,
            maxWidth: VIDEO_WIDTH,
            maxHeight: VIDEO_HEIGHT,
            borderRadius: borderRadius.lg,
            overflow: 'hidden',
            backgroundColor: colors.black,
            justifyContent: 'center',
            alignItems: 'center',
        },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 5,
    },
    placeholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    placeholderTitle: {
        fontSize: typography.fontSize3xl,
        fontWeight: typography.fontWeightBold,
        color: colors.white,
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },
    placeholderSubtitle: {
        fontSize: typography.fontSizeLg,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: spacing.xl,
    },
    instructionContainer: {
        width: '100%',
        marginTop: spacing.lg,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        paddingHorizontal: spacing.md,
    },
    instructionNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    instructionNumberText: {
        fontSize: typography.fontSizeMd,
        fontWeight: typography.fontWeightBold,
        color: colors.white,
    },
    instructionText: {
        flex: 1,
        fontSize: typography.fontSizeMd,
        color: colors.white,
        lineHeight: 20,
    },
    placeholderNote: {
        marginTop: spacing.xl,
        fontSize: typography.fontSizeSm,
        color: 'rgba(255, 255, 255, 0.7)',
        fontStyle: 'italic',
    },
});
