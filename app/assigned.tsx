import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, useColorScheme, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { createSets, getSessionSets } from '@/api/sessions';
import Toast from 'react-native-toast-message';
import OpenIcon from '@/assets/svg/OpenIcon';
import PitchIcon from '@/assets/svg/PitchSvg';
import PlayerInfoCard from './playerinfocard';
import BackIcon from '@/assets/svg/BackIcon';
import TeamBoxes from './teamboxes';
import { useAppDispatch, useAppSelector } from '@/redux/store';

interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  position: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  height: number;
  [key: string]: any;
}

interface Player {
  _id: string;
  firstName: string;
  nickname?: string;
  position: string;
  [key: string]: any;
}

interface Set {
  _id: string;
  name: string;
  players: Player[];
  session: string;
  createdAt: string;
  updatedAt: string;
}

interface SessionData {
  _id: string;
  matchType: string;
  location: {
    name: string;
    address: string;
    [key: string]: any;
  };
  members: Member[];
  setNumber: number;
  playersPerTeam: number;
  winningDecider: string;
  [key: string]: any;
}

export default function Assigned() {
  const params = useLocalSearchParams();
  const data: SessionData | null = params.session ? JSON.parse(params.session as string) : null;
  const dispatch = useAppDispatch();

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('lineups');
  const [selectedSet, setSelectedSet] = useState<string | null>(null);

  // Select sets from Redux
  const { sets, loadingSets, errorSets, creatingSet } = useAppSelector(
    (state) => state.sessions
  );
  console.log('sets', sets);

  // ⭐️ Extract dynamic data
  const pitchName = data?.location?.name ?? 'Unknown Pitch';
  const pitchAddress = data?.location?.address ?? 'Unknown Address';
  const sessionId = data?._id;

  const members = data?.members || [];

  // Fetch sets when component mounts
  useEffect(() => {
    if (sessionId) {
      dispatch(getSessionSets({ sessionId }));
    }
  }, [dispatch, sessionId]);

  // Handle creating sets
  const handleCreateSets = async () => {
    if (!sessionId) {
      Toast.show({
        type: 'error',
        props: {
          title: 'Error',
          message: 'Session ID not found',
        },
      });
      return;
    }

    dispatch(createSets({ sessionId }))
      .unwrap()
      .then((response) => {
        console.log('Sets created:', response);
        Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            message: 'Sets created successfully',
          },
        });
        dispatch(getSessionSets({ sessionId }));
      })
      .catch((err) => {
        console.log('Error creating sets:', err);
        const message = err?.msg?.message || err?.msg || 'Failed to create sets';
        Toast.show({
          type: 'error',
          props: {
            title: 'Error',
            message: message,
          },
        });
      });
  };

  // Filter players by selected set
  const getFilteredPlayers = (): Member[] => {
    if (!selectedSet || sets.length === 0) {
      return members;
    }

    const currentSet = sets.find((s: Set) => s._id === selectedSet);
    if (!currentSet) return [];

    // Get player IDs from the selected set
    const playerIdsInSet = currentSet.players.map((player: Player) => player._id);

    // Filter members who are in the selected set's players array
    return members.filter((member: Member) => 
      playerIdsInSet.includes(member._id)
    );
  };

  const filteredMembers = getFilteredPlayers();

  // Group filtered players by position
  const goalkeepers = filteredMembers.filter((p: Member) => p.position === 'GK');
  const defenders = filteredMembers.filter((p: Member) => p.position === 'DF');
  const midfielders = filteredMembers.filter((p: Member) => p.position === 'MF');
  const strikers = filteredMembers.filter((p: Member) => p.position === 'ST');

  // Get current set name
  const currentSetName = selectedSet 
    ? sets.find((s: Set) => s._id === selectedSet)?.name 
    : null;

  return (
    <SafeAreaScreen>
      <ScrollView
        className="mb-[40px] h-full flex-1 py-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}>
        
        <View className="flex flex-col gap-[31px]">
          <View className="mx-[32px] flex flex-col gap-[31px]">
            <View>
              <View className="flex flex-row items-center justify-between">
                <TouchableOpacity onPress={() => router.back()}>
                  <BackIcon />
                </TouchableOpacity>

                <View>
                  <ThemedText
                    lightColor={theme.text}
                    darkColor={theme.text}
                    className="text-[20px] font-[600]">
                    {data?.matchType?.toUpperCase() ?? 'Match'}
                  </ThemedText>
                </View>

                <TouchableOpacity onPress={() => setShowDetails(true)} activeOpacity={0.6}>
                  <OpenIcon />
                </TouchableOpacity>
              </View>

              <View className="mt-[5px] flex w-full flex-col items-center justify-center gap-[2px] text-center">
                <ThemedText className="text-[13px] font-[400] text-black">
                  {pitchName}
                </ThemedText>
                <ThemedText className="text-[13px] font-[400] text-black">
                  {pitchAddress}
                </ThemedText>
              </View>
            </View>

            {/* Create Sets Button */}
            {sets.length === 0 && !loadingSets && (
              <TouchableOpacity
                onPress={handleCreateSets}
                disabled={creatingSet}
                className="bg-[#00FF94] rounded-lg py-3 px-4 items-center"
                activeOpacity={0.7}>
                {creatingSet ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text className="text-black font-[600] text-[16px]">
                    Create Sets
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          <View className="flex flex-row items-center justify-between border-b-[1px] border-t-[1px] border-[#5c5a5a8a] px-[31px] py-[21px]">
            <View className="flex flex-row gap-[17px]">
              <Pressable onPress={() => setActiveTab('lineups')}>
                <ThemedText
                  lightColor={activeTab === 'lineups' ? '#000' : '#00000080'}
                  className={`py-2 text-[15px] ${
                    activeTab === 'lineups' ? 'border-b-[3px] border-[#00FF94]' : ''
                  } font-[500]`}>
                  Lineups
                </ThemedText>
              </Pressable>

              <Pressable onPress={() => setActiveTab('squad')}>
                <ThemedText
                  lightColor={activeTab === 'squad' ? '#000' : '#00000080'}
                  className={`py-2 text-[15px] ${
                    activeTab === 'squad' ? 'border-b-[3px] border-[#00FF94]' : ''
                  } font-[500]`}>
                  Squad List
                </ThemedText>
              </Pressable>
            </View>

            <PitchIcon />
          </View>

          {/* Display Sets Loading */}
          {loadingSets && (
            <View className="items-center py-4">
              <ActivityIndicator size="large" color="#00FF94" />
              <Text className="mt-2 text-[14px] text-[#2A2A2A]">Loading sets...</Text>
            </View>
          )}

          <View>
            {activeTab === 'lineups' && (
              <>
                {/* Team Filter Boxes */}
                {sets.length > 0 && (
                  <View className="mb-[20px]">
                    <TeamBoxes 
                      sets={sets} 
                      selectedSet={selectedSet}
                      onSelectSet={setSelectedSet}
                    />
                    {selectedSet && currentSetName && (
                      <View className="px-[32px] mt-3">
                        <Text className="text-[14px] font-[600] text-[#2A2A2A] text-center">
                          {currentSetName}
                        </Text>
                        <Text className="text-[12px] text-[#2A2A2A] text-center mt-1">
                          {filteredMembers.length} {filteredMembers.length === 1 ? 'player' : 'players'}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Show message if no sets created yet */}
                {sets.length === 0 && !loadingSets && (
                  <View className="px-[32px] py-8 items-center">
                    <Text className="text-[16px] text-[#2A2A2A] text-center">
                      No sets created yet. Create sets to organize teams.
                    </Text>
                  </View>
                )}

                {/* Show message if set is selected but has no players */}
                {selectedSet && filteredMembers.length === 0 && (
                  <View className="px-[32px] py-8 items-center">
                    <Text className="text-[16px] text-[#2A2A2A] text-center">
                      No players assigned to {currentSetName} yet.
                    </Text>
                  </View>
                )}

                {/* ⭐ GOALKEEPERS */}
                {goalkeepers.length > 0 && (
                  <View className="mt-[30px] flex flex-col gap-[10px]">
                    <Text className="mb-2 px-[32px] text-[16px] font-[700]">
                      Goalkeeper ({goalkeepers.length})
                    </Text>
                    {goalkeepers.map((p: Member) => (
                      <PlayerInfoCard key={p._id} name={p.nickname || p.firstName} />
                    ))}
                  </View>
                )}

                {/* ⭐ DEFENDERS */}
                {defenders.length > 0 && (
                  <View className="mt-[30px] flex flex-col gap-[10px]">
                    <Text className="mb-2 px-[32px] text-[16px] font-[700]">
                      Defenders ({defenders.length})
                    </Text>
                    {defenders.map((p: Member) => (
                      <PlayerInfoCard key={p._id} name={p.nickname || p.firstName} />
                    ))}
                  </View>
                )}

                {/* ⭐ MIDFIELDERS */}
                {midfielders.length > 0 && (
                  <View className="mt-[30px] flex flex-col gap-[10px]">
                    <Text className="mb-2 px-[32px] text-[16px] font-[700]">
                      Midfielders ({midfielders.length})
                    </Text>
                    {midfielders.map((p: Member) => (
                      <PlayerInfoCard key={p._id} name={p.nickname || p.firstName} />
                    ))}
                  </View>
                )}

                {/* ⭐ STRIKERS */}
                {strikers.length > 0 && (
                  <View className="mt-[30px] flex flex-col gap-[10px]">
                    <Text className="mb-2 px-[32px] text-[16px] font-[700]">
                      Strikers ({strikers.length})
                    </Text>
                    {strikers.map((p: Member) => (
                      <PlayerInfoCard key={p._id} name={p.nickname || p.firstName} />
                    ))}
                  </View>
                )}

                {/* Show all players if no set is selected */}
                {!selectedSet && sets.length > 0 && filteredMembers.length > 0 && (
                  <View className="px-[32px] mt-4">
                    <Text className="text-[14px] text-[#2A2A2A] text-center">
                      Select a team above to view players by set
                    </Text>
                  </View>
                )}
              </>
            )}

            {/* ⭐ SQUAD LIST */}
            {activeTab === 'squad' && (
              <View className="flex flex-col gap-[20px] w-full">
                {/* Team Filter for Squad List */}
                {sets.length > 0 && (
                  <View className="mb-[10px]">
                    <TeamBoxes 
                      sets={sets} 
                      selectedSet={selectedSet}
                      onSelectSet={setSelectedSet}
                    />
                    {selectedSet && currentSetName && (
                      <View className="px-[32px] mt-3">
                        <Text className="text-[14px] font-[600] text-[#2A2A2A] text-center">
                          {currentSetName}
                        </Text>
                        <Text className="text-[12px] text-[#2A2A2A] text-center mt-1">
                          {filteredMembers.length} {filteredMembers.length === 1 ? 'player' : 'players'}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                {filteredMembers.length > 0 ? (
                  filteredMembers.map((player: Member) => {
                    // Find which set this player belongs to
                    const playerSet = sets.find((s: Set) => 
                      s.players.some((p: Player) => p._id === player._id)
                    );

                    return (
                      <View key={player._id} className="flex flex-col gap-[10px] px-[32px]">
                        <PlayerInfoCard name={player.nickname || player.firstName} />
                        <View className="flex flex-row justify-between items-center">
                          <Text className="text-[12px] text-[#2A2A2A]">
                            Position: {player.position}
                          </Text>
                          {sets.length > 0 && (
                            <Text className="text-[12px] text-[#2A2A2A]">
                              Team: {playerSet?.name || 'Unassigned'}
                            </Text>
                          )}
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <View className="px-[32px] py-8 items-center">
                    <Text className="text-[16px] text-[#2A2A2A] text-center">
                      {selectedSet 
                        ? `No players in ${currentSetName}`
                        : 'No players available'
                      }
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {showDetails && (
        <>
          <Pressable
            onPress={() => setShowDetails(false)}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}
          />

          {/* DROPDOWN PANEL */}
          <View
            style={{ position: 'absolute', top: 250, left: 0, right: 0, zIndex: 300 }}
            className="rounded-[10px] bg-[#F2F2F2] px-[31px] py-[40px] shadow-lg mx-[20px]">
            
            <View className="mb-2 flex flex-row justify-between">
              <Text className="text-[14px] text-[#2A2A2A]">Sets:</Text>
              <Text className="text-[14px] font-[600] text-primary">{data?.setNumber}</Text>
            </View>

            <View className="mb-2 flex flex-row justify-between">
              <Text className="text-[14px] text-[#2A2A2A]">Players per team:</Text>
              <Text className="text-[14px] font-[600] text-primary">{data?.playersPerTeam}</Text>
            </View>

            <View className="mb-2 flex flex-row justify-between">
              <ThemedText className="text-[14px] text-[#2A2A2A]">Winning decider:</ThemedText>
              <ThemedText className="text-[14px] font-[600] text-primary">{data?.winningDecider}</ThemedText>
            </View>

            {sets.length > 0 && (
              <View className="mt-[10px] pt-[10px] border-t-[1px] border-[#D0D0D0]">
                <Text className="text-[14px] text-[#2A2A2A] mb-2">Created Sets:</Text>
                {sets.map((set: Set) => (
                  <Text key={set._id} className="text-[13px] text-black mb-1">
                    • {set.name} ({set.players.length} players)
                  </Text>
                ))}
              </View>
            )}
          </View>
        </>
      )}
    </SafeAreaScreen>
  );
}