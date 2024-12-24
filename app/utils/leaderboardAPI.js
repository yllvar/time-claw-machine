// Mock leaderboard data
const mockLeaderboardData = [
  { name: "Player 1", score: 15 },
  { name: "Player 2", score: 12 },
  { name: "Player 3", score: 10 },
  { name: "Player 4", score: 8 },
  { name: "Player 5", score: 5 },
];

export const getLeaderboard = async () => {
  try {
    // Simulate an API call with a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Fetched leaderboard data');
    return mockLeaderboardData;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw new Error('Failed to fetch leaderboard data');
  }
};

export const updateLeaderboard = async (playerName, score) => {
  try {
    // Simulate an API call to update the leaderboard
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Updating leaderboard: ${playerName} - ${score}`);
    // For now, we'll just add the new score to our mock data
    mockLeaderboardData.push({ name: playerName, score });
    mockLeaderboardData.sort((a, b) => b.score - a.score);
    mockLeaderboardData.splice(5); // Keep only top 5 scores
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    throw new Error('Failed to update leaderboard');
  }
};

