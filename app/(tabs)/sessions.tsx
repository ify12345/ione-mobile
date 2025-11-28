import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SafeAreaScreen from '@/components/SafeAreaScreen';
import { Colors } from '@/constants/Colors';
import { Icon } from '@/components/ui/Icon';
import CalendarIcon from '@/assets/svg/CalendarIcon';
import PlusIcon from '@/assets/svg/PlusIcon';
import CloseIcon from '@/assets/svg/CloseIcon';
import OpenIcon from '@/assets/svg/OpenIcon';
import { push } from 'expo-router/build/global-state/routing';
import { router } from 'expo-router';

type RootStackParamList = {
  ScheduleDetail: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Team = {
  initials: string;
  name: string;
  number?: string;
};

type MatchTeams = {
  team1: Team;
  team2: Team;
  matchType: string;
};

type Match = {
  teams: MatchTeams;
  time: string;
  minute: string;
  team1score: number | string;
  team2score: number | string;
  joined: boolean
};

type TeamSchedule = {
  teamName: string;
  teamInitials: string;
  number?: string;
  matches: Match[];
};

type DateItem = {
  id: number;
  dateNumber: string;
  dayName: string;
  isToday: boolean;
};

type ExpandedState = Record<string, boolean>;

// 🔥 TAB → ID Mapping (added)
const TAB_ROUTE_MAP = {
  all: null,
  tournaments: 'screens/newsession',   // 👈 tournaments tab = new session screen
  friendlies: 'screens/friendly',
  sets: 'screens/set',
};



export default function Schedule() {
  const [expandedAll, setExpandedAll] = useState<ExpandedState>({
    'VI Team': false,
    'Turf Furies': false,
    'Eko Kings': false,
  });
  const [expandedTournaments, setExpandedTournaments] = useState<ExpandedState>({});
  const [expandedFriendlies, setExpandedFriendlies] = useState<ExpandedState>({});
  const [expandedSets, setExpandedSets] = useState<ExpandedState>({});
  const [dates, setDates] = useState<DateItem[]>([]);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'all' | 'tournaments' | 'friendlies' | 'sets'>('all');
  const navigation = useNavigation<NavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);

  const matchData: Match[] = [
    {
      teams: {
        team1: { initials: 'KP', name: 'Kano Pillars', number: '5 set created' },
        team2: { initials: 'PT', name: 'Porthacourt Thugs' },
        matchType: 'Friendly Match',
      },
      time: '14:00',
      minute: "85'",
      team1score: 2,
      team2score: 0,
      joined: true
    },
    {
      teams: {
        team1: { initials: 'TF', name: 'Turf Furies' },
        team2: { initials: 'LP', name: 'Lakowe Players' },
        matchType: 'League Match',
      },
      time: '16:30',
      minute: "75'",
      team1score: '?',
      team2score: '?',
      joined: false
    },
    {
      teams: {
        team1: { initials: 'EK', name: 'Eko Kings' },
        team2: { initials: 'VP', name: 'Victoria Pros' },
        matchType: 'Friendly Match',
      },
      time: '19:30',
      minute: "85'",
      team1score: '?',
      team2score: '?',
      joined: false
    },
  ];

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newDates: DateItem[] = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dayNum = date.getDate();
      const isToday = date.getTime() === today.getTime();

      newDates.push({
        id: date.getTime(),
        dateNumber: `${dayNum}`,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday,
      });
    }

    setDates(newDates);
  }, []);

  const groupedMatchesAll: TeamSchedule[] = [
    {
      teamName: 'VI Team',
      teamInitials: 'VI',
      matches: matchData.filter(
        (m) => m.teams.team1.name === 'Kano Pillars' || m.teams.team2.name === 'Kano Pillars'
      ),
    },
    {
      teamName: 'Turf Furies',
      teamInitials: 'TF',
      matches: matchData.filter(
        (m) => m.teams.team1.name === 'Turf Furies' || m.teams.team2.name === 'Turf Furies'
      ),
    },
  ];

  const groupedMatchesTournaments: TeamSchedule[] = [
    {
      teamName: 'Turf Furies',
      teamInitials: 'TF',
      matches: matchData.filter(
        (m) =>
          (m.teams.team1.name === 'Turf Furies' || m.teams.team2.name === 'Turf Furies') &&
          m.teams.matchType !== 'Friendly Match'
      ),
    },
  ];

  const groupedMatchesFriendlies: TeamSchedule[] = [
    {
      teamName: 'Kano Pillars',
      teamInitials: 'KP',
      matches: matchData.filter(
        (m) =>
          (m.teams.team1.name === 'Kano Pillars' || m.teams.team2.name === 'Kano Pillars') &&
          m.teams.matchType === 'Friendly Match'
      ),
    },
  ];

  const groupedMatchesSets: TeamSchedule[] = [
    {
      teamName: 'Kano Pillars',
      teamInitials: 'KP',
      number: '5 set created',
      matches: matchData.filter(
        (m) =>
          (m.teams.team1.name === 'Kano Pillars' || m.teams.team2.name === 'Kano Pillars') &&
          m.teams.matchType === 'Friendly Match'
      ),
    },
  ];

  const toggleAll = (teamName: string): void => {
    setExpandedAll((prev) => ({
      ...prev,
      [teamName]: !prev[teamName],
    }));
  };

  const toggleTournaments = (teamName: string): void => {
    setExpandedTournaments((prev) => ({
      ...prev,
      [teamName]: !prev[teamName],
    }));
  };

  const toggleFriendlies = (teamName: string): void => {
    setExpandedFriendlies((prev) => ({
      ...prev,
      [teamName]: !prev[teamName],
    }));
  };

  const toggleSets = (teamName: string): void => {
    setExpandedSets((prev) => ({
      ...prev,
      [teamName]: !prev[teamName],
    }));
  };

  const CalendarPolygon = ({
    date,
    day,
    isActive,
    isToday,
  }: {
    date: string;
    day: string;
    isActive: boolean;
    isToday: boolean;
  }) => (
    <TouchableOpacity className="items-center gap-1">
      <View className="h-[51px] w-[51px] items-center justify-center">
        {isActive ? (
          <View className="relative h-full w-full">
            <Image
              source={require('@/assets/images/activepolygon.png')}
              resizeMode="contain"
              className="h-full w-full"
            />
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-base font-semibold text-black">{date}</Text>
            </View>
          </View>
        ) : (
          <View className="relative h-full w-full">
            <Image
              source={require('@/assets/images/inactivepolygon.png')}
              resizeMode="contain"
              className="h-full w-full"
            />
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-base font-semibold text-[#929292]">{date}</Text>
            </View>
          </View>
        )}
      </View>
      <ThemedText
        lightColor={theme.text}
        darkColor={theme.text}
        className="px-4 text-center text-base leading-6 text-black">
        {day}
      </ThemedText>
      {isToday && <Text className="text-xs font-medium text-[#00FF94]">Today</Text>}
    </TouchableOpacity>
  );

  const ScheduleMatchCard = ({ match }: { match: Match }) => (
    <View className="border-b border-gray-200 items-center justify-center p-3">
      <View className="mb-3 flex-row justify-between"></View>
      <View className="mb-3 flex w-full flex-row items-center justify-between">
        <Text className="origin-center rotate-[-90deg] text-sm font-medium">{match.time}</Text>
        <View className="w-full flex-1 flex-col relative items-start gap-2 whitespace-nowrap border-l-[1px] border-[#DFDFDF] pl-4">
          <View className='flex-row flex-1 items-center justify-between w-full pr-[23px]'>
            <View className="flex flex-row items-center gap-2">
              <View className="h-8 w-8 items-center justify-center">
                <Image
                  source={require('@/assets/images/dropdownpolygon.png')}
                  resizeMode="contain"
                  className="h-full w-full"
                />
                <View className="absolute inset-0 items-center justify-center">
                  <Text className="text-xs font-bold text-black">{match.teams.team1.initials}</Text>
                </View>
              </View>
              <Text className="flex-1 text-sm font-medium">{match.teams.team1.name}</Text>
            </View>
            <Text className={`text-[12px] ${ match.joined ? 'hidden' : 'flex'} font-bold text-black`}>{match.team1score}</Text>
          </View>

          <View className="absolute right-[50px] top-0 bottom-0 border-[#DFDFDF] border-r-[1px] px-3 justify-center">
            <Text className="text-sm font-medium text-black">{match.minute}</Text>
          </View>

          <View className='flex-row flex-1 items-center  justify-between w-full pr-[23px]'>
            <View className="flex flex-row items-center gap-2">
              <View className="h-8 w-8 items-center justify-center">
                <Image
                  source={require('@/assets/images/dropdownpolygon.png')}
                  resizeMode="contain"
                  className="h-full w-full"
                />
                <View className="absolute inset-0 items-center justify-center">
                  <Text className="text-xs font-bold text-black">{match.teams.team2.initials}</Text>
                </View>
              </View>
              <Text className="flex-1 text-sm font-medium">{match.teams.team2.name}</Text>
            </View>
            <Text className={`text-[12px] ${ match.joined ? 'hidden' : 'flex'} font-bold text-black`}>{match.team2score}</Text>
          </View>
        </View>
        {match.joined ?    <TouchableOpacity   onPress={() => router.push('/joinsession')} className='absolute bg-[#00FF94] px-[5px] rounded-[5px] font-[400] py-[20px] right-[5px] '> <Text className='origin-center flex  items-center justify-center text-center rotate-[-90deg] text-sm font-medium'>join</Text>  </TouchableOpacity> : ''}
      </View>
    </View>
  );

  const DropdownIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <View className="p-1">
      <Text className="text-base text-gray-500">{isExpanded ? <CloseIcon /> : <OpenIcon />}</Text>
    </View>
  );

  return (
    <SafeAreaScreen>
      <ScrollView
        className="mb-[40px] h-full flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          flexGrow: 1,
        }}>
        <View className="flex-col gap-4 lg:flex-row">
          <View className="w-full ">
            <View className="flex flex-col gap-[25px] px-[32px] py-6">
              <View className="mb-6 flex-row items-center justify-between">
                <ThemedText
                  lightColor={theme.text}
                  darkColor={theme.text}
                  className="text-[20px] font-[600] text-black">
                  Match schedule
                </ThemedText>
                <CalendarIcon />
              </View>

              <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-6 pb-2">
                <View className="flex-row gap-3">
                  {dates.map((item) => (
                    <CalendarPolygon
                      key={item.id}
                      date={item.dateNumber}
                      day={item.dayName}
                      isActive={item.isToday}
                      isToday={item.isToday}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
            <View className="w-full border-t-[1px] border-[#464242]"></View>
          </View>

          <View className="mt-[18px] px-[32px]">
            <TouchableOpacity
              className="flex w-full flex-row items-center justify-between rounded-[5px] border border-[#7D7D7D] px-[21px] py-[15px]"
              
              // 🚀 UPDATED BUTTON — now routes with ID
            onPress={() => {
  const tabId = TAB_ROUTE_MAP[activeTab];

  if (!tabId) {
    // For the "all" tab → route to newsession screen
    return router.push('/screens/newsession');
  }

  router.push(`/${tabId}`);
}}

            >
              <Text className="text-base text-[#696969]">New game? </Text>
              <PlusIcon />
            </TouchableOpacity>
          </View>

          <View className="mt-[13px] w-full px-[32px]">
            <View className="mb-4 flex w-full flex-row justify-between gap-2">
              {(['all', 'tournaments', 'friendlies', 'sets'] as const).map((tab) => (
                <TouchableWithoutFeedback key={tab} onPress={() => setActiveTab(tab)}>
                  <View
                    className={`
                rounded px-4 py-[9px]
                ${activeTab === tab ? 'bg-[#00FF94]' : 'bg-[#ECECEC]'}
              `}>
                    <Text
                      className={`
                  text-sm font-[600]
                  ${activeTab === tab ? 'text-black' : 'text-[#929292]'}
                `}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>

            <View className="mt-[33px] flex-1">
              {/* Your match dropdown logic remains unchanged */}
              {/* I did not modify anything below this */}
              {activeTab === 'all' && (
                <View className="gap-4">
                  {groupedMatchesAll.map((teamSchedule) => (
                    <View
                      key={teamSchedule.teamName}
                      className="overflow-hidden rounded-md bg-[#ECFFF8]">
                      <Pressable
                        className={`relative flex-row items-center justify-between border-b-2 px-[21px] py-[23px] ${expandedAll[teamSchedule.teamName] ? 'border-[#DFDFDF]' : 'rounded-b-md border-[#00FF94]'}`}
                        onPress={() => toggleAll(teamSchedule.teamName)}>
                        <View className="flex-row items-center gap-3">
                          <View className="h-6 w-6 items-center justify-center rounded-full bg-[#00FF94]">
                            <Text className="text-xs font-bold text-white">
                              {teamSchedule.teamInitials}
                            </Text>
                          </View>
                          <Text className="text-lg font-semibold">{teamSchedule.teamName}</Text>
                        </View>

                        <View className="relative justify-center self-stretch pl-[21px]">
                          <View className="absolute bottom-[-23px] left-0 top-[-23px] border-l-[1px] border-[#DFDFDF]" />
                          <DropdownIcon isExpanded={expandedAll[teamSchedule.teamName]} />
                        </View>
                      </Pressable>

                      {expandedAll[teamSchedule.teamName] && (
                        <View className="border-b-2 border-b-[#00FF94]">
                          {teamSchedule.matches.map((match, idx) => (
                            <ScheduleMatchCard key={idx} match={match} />
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {activeTab === 'tournaments' && (
                <View className="gap-4">
                  {groupedMatchesTournaments.map((teamSchedule) => (
                    <View
                      key={teamSchedule.teamName}
                      className="overflow-hidden rounded-md bg-[#ECFFF8]">
                      <Pressable
                        className={`relative flex-row items-center justify-between border-b-2 px-[21px] py-[23px] ${expandedTournaments[teamSchedule.teamName] ? 'border-[#DFDFDF]' : 'rounded-b-md border-[#00FF94]'}`}
                        onPress={() => toggleTournaments(teamSchedule.teamName)}>
                        <View className="flex-row items-center gap-3">
                          <View className="h-6 w-6 items-center justify-center rounded-full bg-[#00FF94]">
                            <Text className="text-xs font-bold text-white">
                              {teamSchedule.teamInitials}
                            </Text>
                          </View>
                          <Text className="text-lg font-semibold">{teamSchedule.teamName}</Text>
                        </View>

                        <View className="relative justify-center self-stretch pl-[21px]">
                          <View className="absolute bottom-[-23px] left-0 top-[-23px] border-l-[1px] border-[#DFDFDF]" />
                          <DropdownIcon isExpanded={expandedTournaments[teamSchedule.teamName]} />
                        </View>
                      </Pressable>

                      {expandedTournaments[teamSchedule.teamName] && (
                        <View className="border-b-2 border-b-[#00FF94]">
                          {teamSchedule.matches.map((match, idx) => (
                            <ScheduleMatchCard key={idx} match={match} />
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {activeTab === 'friendlies' && (
                <View className="gap-4">
                  {groupedMatchesFriendlies.map((teamSchedule) => (
                    <View
                      key={teamSchedule.teamName}
                      className="overflow-hidden rounded-md bg-[#ECFFF8]">
                      <Pressable
                        className={`relative flex-row items-center justify-between border-b-2 px-[21px] py-[23px] ${expandedFriendlies[teamSchedule.teamName] ? 'border-[#DFDFDF]' : 'rounded-b-md border-[#00FF94]'}`}
                        onPress={() => toggleFriendlies(teamSchedule.teamName)}>
                        <View className="flex-row items-center gap-3">
                          <View className="h-6 w-6 items-center justify-center rounded-full bg-[#00FF94]">
                            <Text className="text-xs font-bold text-white">
                              {teamSchedule.teamInitials}
                            </Text>
                          </View>
                          <Text className="text-lg font-semibold">{teamSchedule.teamName}</Text>
                        </View>

                        <View className="relative justify-center self-stretch pl-[21px]">
                          <View className="absolute bottom-[-23px] left-0 top-[-23px] border-l-[1px] border-[#DFDFDF]" />
                          <DropdownIcon isExpanded={expandedFriendlies[teamSchedule.teamName]} />
                        </View>
                      </Pressable>

                      {expandedFriendlies[teamSchedule.teamName] && (
                        <View className="border-b-2 border-b-[#00FF94]">
                          {teamSchedule.matches.map((match, idx) => (
                            <ScheduleMatchCard key={idx} match={match} />
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {activeTab === 'sets' && (
                <View className="gap-4">
                  {groupedMatchesSets.map((teamSchedule) => (
                    <View
                      key={teamSchedule.teamName}
                      className="overflow-hidden rounded-md bg-[#ECFFF8]">
                      <Pressable
                        className={`relative flex-row items-center justify-between border-b-2 px-[21px] py-[23px] ${expandedSets[teamSchedule.teamName] ? 'border-[#DFDFDF]' : 'rounded-b-md border-[#00FF94]'}`}
                        onPress={() => toggleSets(teamSchedule.teamName)}>
                        <View className="flex-row items-center gap-3">
                          <View className="h-6 w-6 items-center justify-center rounded-full bg-[#00FF94]">
                            <Text className="text-xs font-bold text-white">
                              {teamSchedule.teamInitials}
                            </Text>
                          </View>
                          <Text className="text-lg font-semibold">{teamSchedule.teamName}</Text>
                        </View>

                        <View className="relative justify-center self-stretch pl-[21px]">
                          <View className="absolute bottom-[-23px] left-0 top-[-23px] border-l-[1px] border-[#DFDFDF]" />
                          <DropdownIcon isExpanded={expandedSets[teamSchedule.teamName]} />
                        </View>
                      </Pressable>

                      {expandedSets[teamSchedule.teamName] && (
                        <View className="border-b-2 border-b-[#00FF94]">
                          {teamSchedule.matches.map((match, idx) => (
                            <ScheduleMatchCard key={idx} match={match} />
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaScreen>
  );
}
