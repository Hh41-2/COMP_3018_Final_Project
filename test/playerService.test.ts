import * as playerService from "../src/api/v1/services/playerService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

jest.mock('../src/api/v1/repositories/firestoreRepository');

// Mock data
const mockPlayer = {
    name: "test Player",
    position: "midfielder",
    dateOfBirth: "2000-01-01",
    country: "Canada",
    era: "2000s-2010s",
    teams: ["team1", "team2", "team3"],
    goals: 2,
    appearances: 22,
    assists: 1
};

const mockPlayerWithId = {
    id: "player_1",
    ...mockPlayer
};

const mockPlayerWithId2 = {
    id: "player_2",
    name: "Another Player",
    position: "forward",
    dateOfBirth: "1995-05-15",
    country: "Brazil",
    era: "2010s-2020s",
    teams: ["team2", "team3"],
    goals: 50,
    appearances: 100,
    assists: 20
};

const mockQuerySnapshot = {
    docs: [
        { data: () => mockPlayerWithId },
        { data: () => mockPlayerWithId2 }
    ]
};

const mockDocSnapshot = {
    data: () => mockPlayerWithId,
    exists: true
};

describe("Player Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createPlayer", () => {
        it("should create a player with necessary fields", async () => {
            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockPlayerWithId);
            const result = await playerService.createPlayer(mockPlayer);
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith("players", mockPlayer);
            expect(result).toEqual(mockPlayerWithId);
        });
    });

    describe("getPlayer", () => {
        it("should return a player by id", async () => {
            (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDocSnapshot);
            const result = await playerService.getPlayer("player_1");
            expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("players", "player_1");
            expect(result).toEqual(mockPlayerWithId);
        });

        it("should return null if player not found", async () => {
            (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(null);
            const result = await playerService.getPlayer("nonexistent_id");
            expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("players", "nonexistent_id");
            expect(result).toBeNull();
        });
    });

    describe("getAllPlayer", () => {
        it("should return all players", async () => {
            (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockQuerySnapshot);
            const result = await playerService.getAllPlayer();
            expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("players");
            expect(result).toEqual([mockPlayerWithId, mockPlayerWithId2]);
            expect(result).toHaveLength(2);
        });
    });

    describe("updatePlayer", () => {
        it("should update a player and return the updated player", async () => {
            const updatedPlayerData = { goals: 100, appearances: 150 };
            const updatedPlayer = { ...mockPlayerWithId, ...updatedPlayerData };
            (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(updatedPlayer);
            const result = await playerService.updatePlayer("player_1", updatedPlayerData);
            expect(firestoreRepository.updateDocument).toHaveBeenCalledWith("players", "player_1", updatedPlayerData);
            expect(result).toEqual(updatedPlayer);
        });
    });

    describe("deletePlayer", () => {
        it("should delete a player and return the deleted player's id", async () => {
            (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue("player_1");
            const result = await playerService.deletePlayer("player_1");
            expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("players", "player_1");
            expect(result).toBe("player_1");
        });
    });
});