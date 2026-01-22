/**
 * 🧪 Component Tests: CommonComponents
 * ====================================
 * 
 * Testing React Components is different from unit tests.
 * We test how components RENDER and INTERACT with users.
 * 
 * Key Concepts:
 * - render() - Display component
 * - fireEvent - Simulate user actions (press, type, etc.)
 * - screen queries - Find elements by text, role, etc.
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Button, TopicCard } from '../../src/components/CommonComponents';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BUTTON COMPONENT TESTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

describe('Button Component', () => {
    // ✅ Test: Basic Rendering
    test('should render with title text', () => {
        // ARRANGE & ACT: Render the button
        render(<Button title="Click Me" onPress={() => { }} />);

        // ASSERT: Check if text appears
        expect(screen.getByText('Click Me')).toBeTruthy();
    });

    // ✅ Test: onPress Handler
    test('should call onPress when pressed', () => {
        // ARRANGE: Create a mock function (fake function to track calls)
        const mockOnPress = jest.fn();

        // ACT: Render and press the button
        render(<Button title="Press Me" onPress={mockOnPress} />);
        const button = screen.getByText('Press Me');
        fireEvent.press(button);

        // ASSERT: Check if function was called
        expect(mockOnPress).toHaveBeenCalled();
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    // ✅ Test: Disabled State
    test('should not call onPress when disabled', () => {
        const mockOnPress = jest.fn();

        render(<Button title="Disabled" onPress={mockOnPress} disabled={true} />);
        const button = screen.getByText('Disabled');
        fireEvent.press(button);

        // Should NOT be called when disabled
        expect(mockOnPress).not.toHaveBeenCalled();
    });

    // ✅ Test: Primary Variant (default)
    test('should render primary variant by default', () => {
        const { getByTestId } = render(
            <Button title="Primary" onPress={() => { }} testID="primary-button" />
        );

        const button = getByTestId('primary-button');
        expect(button).toBeTruthy();
    });

    // ✅ Test: Outline Variant
    test('should render outline variant when specified', () => {
        const { getByTestId } = render(
            <Button
                title="Outline"
                onPress={() => { }}
                variant="outline"
                testID="outline-button"
            />
        );

        const button = getByTestId('outline-button');
        expect(button).toBeTruthy();
    });

    // ✅ Test: Ghost Variant
    test('should render ghost variant when specified', () => {
        const { getByTestId } = render(
            <Button
                title="Ghost"
                onPress={() => { }}
                variant="ghost"
                testID="ghost-button"
            />
        );

        const button = getByTestId('ghost-button');
        expect(button).toBeTruthy();
    });

    // ✅ Test: With Icon
    test('should render with icon when provided', () => {
        const MockIcon = () => <></>;

        const { getByText } = render(
            <Button title="With Icon" onPress={() => { }} icon={<MockIcon />} />
        );

        expect(getByText('With Icon')).toBeTruthy();
    });

    // ✅ Test: Custom Gradient
    test('should accept custom gradient colors', () => {
        const customGradient = ['#FF0000', '#00FF00'];

        const { getByText } = render(
            <Button
                title="Custom"
                onPress={() => { }}
                gradient={customGradient}
            />
        );

        expect(getByText('Custom')).toBeTruthy();
    });

    // ✅ Test: Multiple Presses
    test('should handle multiple presses correctly', () => {
        const mockOnPress = jest.fn();

        render(<Button title="Multi Press" onPress={mockOnPress} />);
        const button = screen.getByText('Multi Press');

        // Press 3 times
        fireEvent.press(button);
        fireEvent.press(button);
        fireEvent.press(button);

        expect(mockOnPress).toHaveBeenCalledTimes(3);
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOPICCARD COMPONENT TESTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

describe('TopicCard Component', () => {
    const mockTopic = {
        id: 'food',
        name: 'Food',
        icon: 'fast-food',
        gradient: ['#FF6B6B', '#FE8B8B'],
        wordCount: 50
    };

    // ✅ Test: Render Topic Name
    test('should display topic name', () => {
        render(<TopicCard topic={mockTopic} onPress={() => { }} />);

        expect(screen.getByText('Food')).toBeTruthy();
    });

    // ✅ Test: Render Word Count
    test('should display word count', () => {
        render(<TopicCard topic={mockTopic} onPress={() => { }} />);

        // Word count should be displayed
        expect(screen.getByText(/50/)).toBeTruthy();
    });

    // ✅ Test: onPress with Topic
    test('should call onPress with topic when pressed', () => {
        const mockOnPress = jest.fn();

        render(<TopicCard topic={mockTopic} onPress={mockOnPress} />);
        const card = screen.getByText('Food');
        fireEvent.press(card);

        expect(mockOnPress).toHaveBeenCalledWith(mockTopic);
    });

    // ✅ Test: Different Topics
    test('should render different topics correctly', () => {
        const sportsTopic = {
            id: 'sports',
            name: 'Sports',
            icon: 'football',
            gradient: ['#4ECDC4', '#4E9DCC'],
            wordCount: 35
        };

        const { rerender } = render(
            <TopicCard topic={mockTopic} onPress={() => { }} />
        );
        expect(screen.getByText('Food')).toBeTruthy();

        // Change to sports topic
        rerender(<TopicCard topic={sportsTopic} onPress={() => { }} />);
        expect(screen.getByText('Sports')).toBeTruthy();
    });

    // ✅ Test: Zero Word Count
    test('should handle zero word count', () => {
        const emptyTopic = {
            ...mockTopic,
            wordCount: 0
        };

        render(<TopicCard topic={emptyTopic} onPress={() => { }} />);
        expect(screen.getByText('0')).toBeTruthy();
    });

    // ✅ Test: Long Topic Names
    test('should handle long topic names', () => {
        const longTopic = {
            ...mockTopic,
            name: 'Very Long Topic Name That Should Be Displayed'
        };

        render(<TopicCard topic={longTopic} onPress={() => { }} />);
        expect(screen.getByText(/Very Long Topic Name/)).toBeTruthy();
    });
});

/**
 * 🎓 COMPONENT TESTING CONCEPTS LEARNED:
 * ======================================
 * 
 * 1. render() - Displays component for testing
 * 2. screen - Query rendered elements
 * 3. getByText() - Find element by its text content
 * 4. getByTestID() - Find element by testID prop
 * 5. fireEvent.press() - Simulate pressing a button
 * 6. jest.fn() - Create mock function
 * 7. toHaveBeenCalled() - Check if function was called
 * 8. toHaveBeenCalledTimes(n) - Check call count
 * 9. toHaveBeenCalledWith(arg) - Check arguments
 * 10. rerender() - Update component with new props
 * 
 * 💡 TESTING STRATEGY:
 * ===================
 * - Test what users SEE (text, images)
 * - Test what users DO (press, type)
 * - Test different STATES (disabled, variants)
 * - Test edge cases (empty, long text)
 * 
 * ⚠️ DON'T TEST:
 * - Internal implementation details
 * - Styling (unless it affects behavior)
 * - Third-party library internals
 */
