import { Text,useColorScheme, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import CustomButton from "./ui/CustomButton";


// Sample delivery requests data
export const historyRequests = [
    {
        id: 'MA-2024-0892',
        status: 'New',
        pickup: {
            address: '15 Broad Street, Lagos Island'
        },
        date: '25:05:2025 | 09:00AM',
        dropoff: {
            address: 'Airport road Benin City'
        },
        deliveryWindow: '2 - 3 days',
        distance: '8.2 km',
        amount: '+₦850.00'
    },
   
];

const HistoryRequest = ({ item }: { item: typeof historyRequests[number] }) => {
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === 'dark' ? '#ffffff' : '#46BB1C';
    return (
        <View className='p-4 mb-4 gap-4 border-b border-stroke'>
            {/* Header with status and order ID */}
            <View className='flex-row justify-between items-center'>
                <View className={`px-3 py-1 rounded-full ${item.status === 'New' ? 'bg-purpleLight' : 'bg-red-100'}`}>
                    <Text className={`text-xs font-medium ${item.status === 'New' ? 'text-purple' : 'text-red-600'}`}>
                        {item.status}
                    </Text>
                </View>

                <ThemedText type="medium" className='text-sm'>
                   {item.date}
                </ThemedText>

                 
            </View>




            {/* Delivery Info */}
            <View className='flex-row justify-between w-full items-center'>
                <View>
                    <ThemedText type="default" className='text-xs font-medium'>
                       Delivery Payment
                    </ThemedText>
                </View>
                <ThemedText darkColor="#46BB1C" lightColor="#46BB1C" type="default" className='text-sm font-bold text-right '>
                    {item.amount}
                </ThemedText>
            </View>

            <View className='flex-row justify-between items-center'>
                <ThemedText type="default" className='text-sm'>
                   TRX123456
                </ThemedText>
                <View>
                     <ThemedText type="medium" className='text-sm'>
                    Order #{item.id}
                </ThemedText>
                </View>
            </View>


          
        </View>
    )
};

export default HistoryRequest;