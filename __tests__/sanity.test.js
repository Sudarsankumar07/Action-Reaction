// Simple test to verify Jest is working
describe('Jest Setup Test', () => {
    test('should run basic test', () => {
        expect(1 + 1).toBe(2);
    });

    test('should have testing library matchers', () => {
        expect(true).toBe(true);
    });
});
