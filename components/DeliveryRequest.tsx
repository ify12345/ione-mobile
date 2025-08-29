import { Text,useColorScheme, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import CustomButton from "./ui/CustomButton";


// Sample delivery requests data
export const deliveryRequests = [
    {
        id: 'MA-2024-0892',
        status: 'New',
        pickup: {
            address: '15 Broad Street, Lagos Island'
        },
        dropoff: {
            address: 'Airport road Benin City'
        },
        deliveryWindow: '2 - 3 days',
        distance: '8.2 km',
        amount: '₦8550'
    },
    {
        id: 'MA-2024-0893',
        status: 'New',
        pickup: {
            address: '23 Victoria Island, Lagos'
        },
        dropoff: {
            address: 'Ikeja GRA, Lagos'
        },
        deliveryWindow: '1 - 2 days',
        distance: '12.5 km',
        amount: '₦5200'
    },
    {
        id: 'MA-2024-0894',
        status: 'Urgent',
        pickup: {
            address: '45 Allen Avenue, Ikeja'
        },
        dropoff: {
            address: 'Festac Town, Lagos'
        },
        deliveryWindow: 'Today',
        distance: '15.3 km',
        amount: '₦7800'
    }
];

const DeliveryRequest = ({ item }: { item: typeof deliveryRequests[number] }) => {
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === 'dark' ? '#ffffff' : '#46BB1C';
    return (
        <ThemedView className='border border-stroke rounded-lg p-4 mb-4 gap-4'>
            {/* Header with status and order ID */}
            <View className='flex-row justify-between items-center'>
                <View className={`px-3 py-1 rounded-full ${item.status === 'New' ? 'bg-purpleLight' : 'bg-red-100'}`}>
                    <Text className={`text-xs font-medium ${item.status === 'New' ? 'text-purple' : 'text-red-600'}`}>
                        {item.status}
                    </Text>
                </View>
                <ThemedText type="medium" className='text-sm'>
                    Order #{item.id}
                </ThemedText>
            </View>


            <ThemedView
                lightColor="#F2F2F2"
                darkColor="#1f1f1f"
                className='flex-row items-center gap-3 rounded-lg border border-stroke px-[12px] py-2'>
                <View className='mt-1 border border-stroke rounded-full'>
                    <View className='size-3 rounded-full border-2 border-stroke bg-[#F2F2F2]' />
                </View>
                <View className='flex-1'>
                    <ThemedText type="default" className='text-sm font-semibold mb-1'>
                        Pickup
                    </ThemedText>
                    <ThemedText type="medium" className='text-sm'>
                        {item.pickup.address}
                    </ThemedText>
                </View>
            </ThemedView>

            {/* Drop-off Location */}
            <View className='flex-row items-center gap-3 border border-stroke rounded-lg px-[12px] py-2'>
                <View className='mt-1'>
                    <EvilIcons name="location" size={17} color={iconColor} />
                </View>
                <View className='flex-1'>
                    <ThemedText type="default" className='text-sm font-semibold mb-1'>
                        Drop - off
                    </ThemedText>
                    <ThemedText type="medium" className='text-sm'>
                        {item.dropoff.address}
                    </ThemedText>
                </View>
            </View>

            {/* Delivery Info */}
            <View className='flex-row justify-between w-full items-center'>
                <View>
                    <ThemedText type="default" className='text-xs font-medium'>
                        Delivery Window:
                    </ThemedText>
                </View>
                <ThemedText type="medium" className='text-sm font-medium'>
                    {item.deliveryWindow}
                </ThemedText>
            </View>

            <View className='flex-row justify-between items-center'>
                <ThemedText type="default" className='text-sm'>
                    Distance: {item.distance}
                </ThemedText>
                <View>
                    <ThemedText darkColor="" lightColor="#46BB1C" type="default" className='text-sm font-bold text-right '>
                        {item.amount}
                    </ThemedText>
                </View>
            </View>


            <View className='flex-row gap-3 mt-2'>
                <CustomButton
                    title="View Details"
                    className=''
                />
             
                <CustomButton
                    title="Accept"
                    primary

                />
            </View>
        </ThemedView>
    )
};

export default DeliveryRequest;