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

const { width } = Dimensions.get('window');
const VIDEO_SIZE = width * 0.85; // 85% of screen width for 1:1 ratio

export default function VideoPlayerModal({ visible, onClose }) {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasVideo, setHasVideo] = useState(false);

    // Check if video file exists (you'll add it later)
    // For now, show placeholder
    useEffect(() => {
        // Try to load video, show placeholder if not available
        setHasVideo(false);
        setIsLoading(false);
    }, []);

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
                    {/* 
                    TODO: Uncomment this section when you add the video file
                    When you're ready:
                    1. Add video file to: assets/videos/how_to_play_multiplayer.mp4
                    2. Change hasVideo to true in useEffect (line 28)
                    3. Uncomment lines 64-86 below
                    
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
                                source={require('../../assets/videos/how_to_play_multiplayer.mp4')}
                                style={styles.video}
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                                isLooping
                                onLoad={() => setIsLoading(false)}
                                onError={(error) => {
                                    console.log('Video error:', error);
                                    setHasVideo(false);
                                    setIsLoading(false);
                                }}
                            />
                        </>
                    ) : ( */}
                    {/* Placeholder - shows instructions until video is added */}
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
                    {/* )} */}
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
        width: VIDEO_SIZE,
        height: VIDEO_SIZE,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        backgroundColor: colors.gray900,
        ...shadows.xl,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray900,
        zIndex: 5,
    },
    loadingText: {
        marginTop: spacing.md,
        fontSize: typography.fontSizeMd,
        color: colors.white,
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
