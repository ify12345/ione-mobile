import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useMatchScore from '@/hooks/useMatchScore';

interface LiveScoreboardProps {
  matchId: string;
  showConnectionStatus?: boolean;
}

const LiveScoreboard: React.FC<LiveScoreboardProps> = ({ 
  matchId, 
  showConnectionStatus = true 
}) => {
  const scoreData = useMatchScore({ matchId });

  return (
    <View style={styles.container}>
      {/* Connection Status */}
      {showConnectionStatus && (
        <View style={styles.statusContainer}>
          <View 
            style={[
              styles.statusIndicator, 
              { backgroundColor: scoreData.connected ? '#10b981' : '#ef4444' }
            ]} 
          />
          <Text style={styles.statusText}>
            {scoreData.connected ? 'LIVE' : 'OFFLINE'}
          </Text>
        </View>
      )}

      {/* Scoreboard */}
      <View style={styles.scoreContainer}>
        {/* Team One */}
        <View style={styles.teamContainer}>
          <Text style={styles.teamName} numberOfLines={1}>
            {scoreData.teamOne.name || 'Team One'}
          </Text>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>{scoreData.teamOneScore}</Text>
          </View>
        </View>

        {/* Separator */}
        <View style={styles.separator}>
          <Text style={styles.separatorText}>VS</Text>
        </View>

        {/* Team Two */}
        <View style={styles.teamContainer}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>{scoreData.teamTwoScore}</Text>
          </View>
          <Text style={styles.teamName} numberOfLines={1}>
            {scoreData.teamTwo.name || 'Team Two'}
          </Text>
        </View>
      </View>

      {/* Error Display */}
      {scoreData.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {scoreData.error}</Text>
        </View>
      )}

      {/* Last Update */}
      {scoreData.timestamp && (
        <Text style={styles.timestamp}>
          Updated: {new Date(scoreData.timestamp).toLocaleTimeString()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  teamContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teamName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  scoreBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  separator: {
    paddingHorizontal: 12,
  },
  separatorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    textAlign: 'center',
  },
  timestamp: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default LiveScoreboard;