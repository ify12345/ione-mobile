import { useState, useEffect } from 'react';
import EventSource from 'react-native-sse';

interface TeamScore {
  id: string;
  name: string;
}

interface MatchScoreData {
  matchId: string;
  sessionId?: string;
  teamOne: TeamScore;
  teamTwo: TeamScore;
  teamOneScore: number;
  teamTwoScore: number;
  timestamp: number;
  connected: boolean;
  error?: string;
}

interface UseMatchScoreOptions {
  matchId?: string;
  sessionId?: string;
  globalStream?: boolean;
  onScoreUpdate?: (data: MatchScoreData) => void;
  onError?: (error: string) => void;
}

const useMatchScore = (options: UseMatchScoreOptions) => {
  const { matchId, sessionId, globalStream = false, onScoreUpdate, onError } = options;
  
  const [scoreData, setScoreData] = useState<MatchScoreData>({
    matchId: matchId || '',
    teamOne: { id: '', name: 'Team One' },
    teamTwo: { id: '', name: 'Team Two' },
    teamOneScore: 0,
    teamTwoScore: 0,
    timestamp: Date.now(),
    connected: false,
  });

  const [lastHeartbeat, setLastHeartbeat] = useState<number>(Date.now());

  useEffect(() => {
    // Don't connect if no valid stream type is provided
    if (!matchId && !sessionId && !globalStream) {
      return;
    }

    // Build the appropriate URL based on stream type
    let streamUrl = '';
    const baseUrl = 'https://i-one-server-v1.onrender.com';
    
    if (globalStream) {
      streamUrl = `${baseUrl}/i-one/matches/stream`;
    } else if (sessionId) {
      streamUrl = `${baseUrl}/i-one/matches/stream/session/${sessionId}`;
    } else if (matchId) {
      streamUrl = `${baseUrl}/i-one/matches/stream/${matchId}`;
    }

    console.log('🔌 Connecting to SSE:', streamUrl);

    // 🍪 Cookie-based authentication - matches your axios config
    const eventSource = new EventSource(streamUrl, {
      withCredentials: true, // Sends cookies automatically (same as your axios)
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });

    // Connection opened
    eventSource.addEventListener('open', () => {
      console.log('SSE connection established');
      setScoreData(prev => ({ ...prev, connected: true, error: undefined }));
      setLastHeartbeat(Date.now());
    });

    // Message received
    eventSource.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data || '{}');
        console.log('SSE message received:', data.type);

        switch (data.type) {
          case 'connected':
            console.log('Connected to stream:', data.message);
            setLastHeartbeat(Date.now());
            break;

          case 'heartbeat':
            console.log('💓 Heartbeat received');
            setLastHeartbeat(Date.now());
            break;

          case 'score-update':
            console.log('⚽ Score update:', {
              match: data.matchId,
              score: `${data.teamOneScore} - ${data.teamTwoScore}`
            });
            
            const updatedData: MatchScoreData = {
              matchId: data.matchId,
              sessionId: data.sessionId,
              teamOne: data.teamOne,
              teamTwo: data.teamTwo,
              teamOneScore: data.teamOneScore,
              teamTwoScore: data.teamTwoScore,
              timestamp: data.timestamp || Date.now(),
              connected: true,
            };
            
            setScoreData(updatedData);
            setLastHeartbeat(Date.now());
            
            // Call optional callback
            if (onScoreUpdate) {
              onScoreUpdate(updatedData);
            }
            break;

          case 'error':
            console.error('SSE error event:', data.message);
            setScoreData(prev => ({ 
              ...prev, 
              error: data.message,
              connected: false 
            }));
            if (onError) {
              onError(data.message);
            }
            break;

          default:
            console.log('Unknown event type:', data.type);
        }
      } catch (err) {
        console.error('Failed to parse SSE message:', err);
      }
    });

    // Connection error
    eventSource.addEventListener('error', (error) => {
      console.error('SSE connection error:', error);
      setScoreData(prev => ({ 
        ...prev, 
        connected: false,
        error: 'Connection lost'
      }));
      if (onError) {
        onError('Connection error occurred');
      }
    });

    // Cleanup on unmount
    return () => {
      console.log('Closing SSE connection');
      eventSource.close();
    };
  }, [matchId, sessionId, globalStream, onScoreUpdate, onError]);

  // Monitor heartbeat health
  useEffect(() => {
    const heartbeatCheck = setInterval(() => {
      const timeSinceLastHeartbeat = Date.now() - lastHeartbeat;
      
      // If no heartbeat for 60 seconds, mark as disconnected
      if (timeSinceLastHeartbeat > 60000 && scoreData.connected) {
        console.warn('⚠️ No heartbeat received in 60s - connection may be stale');
        setScoreData(prev => ({ 
          ...prev, 
          connected: false,
          error: 'Connection timeout'
        }));
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(heartbeatCheck);
  }, [lastHeartbeat, scoreData.connected]);

  return scoreData;
};

export default useMatchScore;