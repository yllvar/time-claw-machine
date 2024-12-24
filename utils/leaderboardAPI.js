// Mock leaderboard data
const mockLeaderboardData = [
  { name: "Player 1", score: 15 },
  { name: "Player 2", score: 12 },
  { name: "Player 3", score: 10 },
  { name: "Player 4", score: 8 },
  { name: "Player 5", score: 5 },
];

const getLeaderboard = async () => {
  // Simulate an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockLeaderboardData), 500);
  });
};

const updateLeaderboard = async (playerName, score) => {
  // In a real application, this would be an API call to update the leaderboard
  console.log(`Updating leaderboard: ${playerName} - ${score}`);
  // For now, we'll just add the new score to our mock data
  mockLeaderboardData.push({ name: playerName, score });
  mockLeaderboardData.sort((a, b) => b.score - a.score);
  mockLeaderboardData.splice(5); // Keep only top 5 scores
};

export { getLeaderboard, updateLeaderboard };

