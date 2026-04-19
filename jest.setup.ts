// jest.setup.ts
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

// Then mock firebase - use correct path from root
jest.mock("./src/config/firebaseConfig", () => ({
    db: {
        collection: jest.fn(),
        doc: jest.fn(),
    },
}));

// Reset all mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.resetModules();
});