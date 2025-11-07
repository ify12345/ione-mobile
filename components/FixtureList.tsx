'use client';

import React from 'react';
import { View, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import RightArrrow from '@/assets/svg/RightArrow';
import Polygon from './Polygon';

type Fixture = {
    id: number;
    time: string;
    teamA: string;
    teamAName: string;
    teamB: string;
    teamBName: string;
    type: string;
};

const fixtures: Fixture[] = [
    {
        id: 1,
        time: '14:00',
        teamA: 'TN',
        teamAName: 'Team Name',
        teamB: 'TN',
        teamBName: 'Team Name',
        type: 'Friendly Match',
    },
    {
        id: 2,
        time: '16:30',
        teamA: 'TN',
        teamAName: 'Team Name',
        teamB: 'TN',
        teamBName: 'Team Name',
        type: 'Friendly Match',
    },
];

const FixtureList: React.FC = () => {
    const renderItem: ListRenderItem<Fixture> = ({ item }) => (
        <TouchableOpacity
            className="dark:bg-gray-800 rounded-[5px] py-[10px] px-[25px] flex-col  justify-between gap-[7px] shadow-xl bg-[#EDFFF8] "
        >
            <View className='flex flex-row justify-between items-center'>

                <ThemedText className="text-xs">{item.time}</ThemedText>

                <View className="items-center">
                    <ThemedText className="text-xs text-gray-600 dark:text-gray-400">
                        {item.type}
                    </ThemedText>
                </View>
               <RightArrrow/>
            </View>

            <View className="flex-row items-center gap-4 justify-center">
                <View className="items-center">
                    <Polygon teamCode={item.teamA} />
                    <ThemedText className="text-xs mt-1 font-semibold">{item.teamAName}</ThemedText>
                </View>

                <ThemedText className="text-xs">VS</ThemedText>

                <View className="items-center">
                    <Polygon teamCode={item.teamB} />
                    <ThemedText className="text-xs mt-1 font-semibold">{item.teamBName}</ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={fixtures}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ gap: 12 }}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default FixtureList;
