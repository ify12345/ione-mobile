import { useColorScheme, View } from 'react-native'
import React from 'react'
import BackButton from '@/components/BackButton'
import SafeAreaScreen from '@/components/SafeAreaScreen'
import ChatIcon from '@/assets/svg/ChatIcon'
import CallIcon from '@/assets/svg/CallIcon'
import { ThemedText } from '@/components/ThemedText'
import { Collapsible } from '@/components/Collapsible'
import { ThemedView } from '@/components/ThemedView'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';


const box = [
    {
        id: 1,
        title: "Live Chat",
        icon: <ChatIcon />
    },
    {
        id: 2,
        title: 'Call Support',
        icon: <CallIcon />
    },

]

export default function Support() {
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === 'dark' ? '#0E5617' : "#45BC1B";
    const IconTheme = colorScheme === 'dark' ? '#46BB1C' : "#1C1C1C";

    return (
        <SafeAreaScreen className='py-6 px-4 gap-5'>
            <BackButton title="Support" />

            <View className='flex-row items-center gap-2 justify-between'>
                {box.map(item => (
                    <View key={item.id} className='flex-1 items-center shadow-sm rounded-md p-4 justify-center border border-stroke dark:border-primary bg-white dark:bg-primaryDark'>
                        {React.cloneElement(item.icon, { color: iconColor })}
                        <ThemedText className='mt-2 text-center'>{item.title}</ThemedText>
                    </View>
                ))}
            </View>

            <View className='mt-4 gap-4'>
                <ThemedText className='text-lg font-semibold'>Frequently Asked Questions</ThemedText>
                <Collapsible
                    title="How do I update my bank details?"
                >
                    <ThemedView className="p-4">
                        <ThemedText className="text-lg font-bold">$1,250.00</ThemedText>
                        <ThemedText className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            This is your total earnings for the month.
                        </ThemedText>

                    </ThemedView>
                </Collapsible>
                <Collapsible
                    title="How are delivery fees calculated?"
                >
                    <ThemedView className="p-4">
                        <ThemedText className="text-lg font-bold">$1,250.00</ThemedText>
                        <ThemedText className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            This is your total earnings for the month.
                        </ThemedText>

                    </ThemedView>
                </Collapsible>
                <Collapsible
                    title="How are delivery fees calculated?"
                >
                    <ThemedView className="p-4">
                        <ThemedText className="text-lg font-bold">$1,250.00</ThemedText>
                        <ThemedText className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            This is your total earnings for the month.
                        </ThemedText>

                    </ThemedView>
                </Collapsible>
            </View>

            <ThemedView
            lightColor='#F8FFF6'
            className='p-4 rounded-lg gap-3'
            >
                <ThemedText className='text-lg font-semibold'>Contact Information</ThemedText>
                <ThemedText type="medium" className='text-lg font-semibold'>You are now en route. Please follow the directions to complete the delivery</ThemedText>

              

            </ThemedView>

        </SafeAreaScreen>
    )
}



