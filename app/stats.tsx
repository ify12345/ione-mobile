import SafeAreaScreen from '@/components/SafeAreaScreen'
import { ThemedText } from '@/components/ThemedText'
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, TouchableOpacity, View, ScrollView } from 'react-native'

export default function Stats() {
    const router = useRouter();
    const { width, height } = Dimensions.get('window');
    const [selectedSeason, setSelectedSeason] = useState('23/24');

    return (
        <SafeAreaScreen className='flex-1'>
            <View className='flex-row justify-between items-center w-full px-[35px] mb-9'>
                <ThemedText className='text-2xl font-semibold'>Stats</ThemedText>
                <TouchableOpacity onPress={() => router.back()} className='flex-row items-center gap-1'>
                    <FontAwesome6 name="arrow-left" size={14} color="black" />
                    <ThemedText className='text-sm font-medium'>Profile</ThemedText>
                </TouchableOpacity>
            </View>

            <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <View className='w-full px-[35px] gap-[35px] pb-8'>

                    <View className='gap-4'>

                        <View className='flex-row gap-4'>
                            <View className='flex-1 bg-[#D4F5E9] rounded-[5px] p-6 aspect-square items-center justify-center'>
                                <Image
                                    source={require('@/assets/images/stats.png')}
                                    style={{ width: '100%', height: '100%' }}
                                    contentFit='contain'
                                />
                            </View>
                            <View className='flex-1 bg-[#D4F5E9] rounded-[5px] p-6 aspect-square items-center justify-center'>
                                <Image
                                    source={require('@/assets/images/stats.png')}
                                    style={{ width: '100%', height: '100%' }}
                                    contentFit='contain'
                                />
                            </View>
                        </View>

                        <View className='flex-row gap-4'>
                            <View className='flex-1 bg-[#D4F5E9] rounded-[5px] p-6 aspect-square items-center justify-center'>
                                <Image
                                    source={require('@/assets/images/stats.png')}
                                    style={{ width: '100%', height: '100%' }}
                                    contentFit='contain'
                                />
                            </View>
                            <View className='flex-1 bg-[#D4F5E9] rounded-[5px] p-6 aspect-square items-center justify-center'>
                                <Image
                                    source={require('@/assets/images/stats.png')}
                                    style={{ width: '100%', height: '100%' }}
                                    contentFit='contain'
                                />
                            </View>

                        </View>
                    </View>

                    <View className='gap-6 mt-4'>

                        <View className='flex-row justify-between items-center'>
                            <ThemedText className='text-base font-bold'>Statistics</ThemedText>
                            <TouchableOpacity className='flex-row items-center gap-1'>
                                <ThemedText className='text-sm font-medium'>{selectedSeason}</ThemedText>
                                <Feather name="chevron-down" size={16} color="black" />
                            </TouchableOpacity>
                        </View>


                        <View className='gap-1'>

                            <View className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                                <ThemedText lightColor='#000' className='font-medium text-xs'>Goals</ThemedText>
                                <ThemedText className='font-semibold text-xs'>10</ThemedText>
                            </View>


                            <View className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                                <ThemedText lightColor='#000' className='font-medium text-xs'>Assists</ThemedText>
                                <ThemedText className='font-semibold text-xs'>8</ThemedText>
                            </View>


                            <View className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                                <ThemedText lightColor='#000' className='font-medium text-xs'>Total Matches Played</ThemedText>
                                <ThemedText className='font-semibold text-xs'>15</ThemedText>
                            </View>
                        </View>


                        <ThemedText className='text-black/90 text-xs text-center mt-2'>
                            Other stats depends on player positions
                        </ThemedText>
                    </View>

                </View>
            </ScrollView>

        </SafeAreaScreen>
    )
}