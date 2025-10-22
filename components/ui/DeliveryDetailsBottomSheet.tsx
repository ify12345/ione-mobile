import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import EarningIcon from '@/assets/svg/TournmentIcon';
import { useColorScheme } from 'react-native';
import { ThemedText } from '../ThemedText';
import CustomButton from './CustomButton';


interface DeliveryItem {
    id: string;
    status: string;
    pickup: {
        address: string;
    };
    dropoff: {
        address: string;
    };
    deliveryWindow: string;
    distance: string;
    amount: string;
}

interface DeliveryDetailsBottomSheetProps {
    item: DeliveryItem;
    isVisible: boolean;
    onClose: () => void;
}

const DeliveryDetailsBottomSheet: React.FC<DeliveryDetailsBottomSheetProps> = ({
    item,
    isVisible,
    onClose,
}) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const colorScheme = useColorScheme();
    // Variables for snap points
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    React.useEffect(() => {
        if (isVisible) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [isVisible]);

    const handleSheetChanges = React.useCallback((index: number) => {
        if (index === -1) {
            onClose();
        }
    }, [onClose]);

    // Sample data for the items
    const pickupItems = [
        { name: 'Electronics', size: 'Large', weight: '200kg' },
        { name: 'Clothes', size: 'Medium', weight: '100kg' },
        { name: 'Shoe', size: 'Small', weight: '10kg' },
    ];

    const recipientInfo = {
        name: 'Mrs. Grace Okey',
        phone: '+234 8051234567'
    };
    const iconColor = colorScheme === 'dark' ? '#151718' : '#fff';
      const itemIconColor = colorScheme === 'dark' ? '#ffffff' : '#46BB1C';


    const serviceCharge = '₦8550';

    const additionalInfo = "This is a dummy copy, it is not meant to be read. it has been placed here solely to demonstrate the look and feel of of finished text. Only for show...";

    return (


        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            backgroundStyle={{
                backgroundColor: iconColor,
            }}
            handleIndicatorStyle={{
                backgroundColor: '#D1D5DB',
                width: 100,
                height: 4,
                marginTop: 20
            }}
        >
            <BottomSheetScrollView
                contentContainerStyle={{ paddingTop: 32, paddingBottom: 80, paddingHorizontal: 24 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="">

                    <View className="mb-6 gap-2">
                        <ThemedText className="text-lg font-semibold text-gray-900 mb-1">
                            Pick-up Item Details
                        </ThemedText>
                        <View className="flex-row items-center justify-between">
                            <ThemedText className="text-sm text-gray-600">
                                Delivery ID:
                            </ThemedText>
                            <View className={`px-3 py-1 rounded-full bg-brownLight`}>
                                <Text className={`text-xs font-medium ${item.status === 'In Progress' && 'text-brown'} ${item.status === 'Awaiting Confirmation' && 'text-[#ffa858]'} ${item.status === 'Delivered' && 'text-primaryDark'}`}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                        <ThemedText className="text-sm text-gray-900 font-light">
                            Order #{item.id}
                        </ThemedText>
                    </View>

                    <View className="mb-6">
                        <View className="flex-row items-center gap-3 mb-4">
                            <View className="border-2 border-stroke bg-stroke rounded-full">
                                <View className="w-3 h-3 rounded-full  bg-stroke border-2 border-white" />
                            </View>
                            <View className="flex-1">
                                <ThemedText className="text-sm font-light text-gray-900 mb-1">
                                    {item.pickup.address}
                                </ThemedText>
                            </View>
                        </View>

                        <View className="flex-row items-center gap-3">
                            <View className="border-2 border-primary bg-stroke rounded-full">
                                <View className="w-3 h-3 rounded-full  bg-primary border-2 border-white" />
                            </View>
                            <View className="flex-1">
                                <ThemedText lightColor='#46BB1C' darkColor='' className="text-sm font-light">
                                    {item.dropoff.address}
                                </ThemedText>
                            </View>
                        </View>
                    </View>

                    {/* Items to Pickup */}
                    <View className="mb-6">
                        <ThemedText className="text-base font-semibold text-gray-900 mb-4">
                            Item(s) to Pickup
                        </ThemedText>

                        <View className="border-b border-stroke pb-2 mb-3">
                            <View className="flex-row justify-between">
                                <ThemedText className="text-sm font-medium">Items</ThemedText>

                                <ThemedText lightColor='' className="text-sm font-medium text-center flex-1">Size</ThemedText>
                                <ThemedText className="text-sm font-medium">Weight</ThemedText>

                            </View>
                        </View>

                        {pickupItems.map((pickupItem, index) => (
                            <View key={index} className="flex-row justify-between items-center py-2 w-full border-b-[0.2px] border-stroke">
                                <ThemedText lightColor='#758A96' type="medium" className="text-center">{pickupItem.name}</ThemedText>

                                <ThemedText lightColor='#758A96' type="medium" className="text-center flex-1">
                                    {pickupItem.size}
                                </ThemedText>
                                <ThemedText lightColor='#758A96' type="medium" className="text-sm  text-center ">
                                    {pickupItem.weight}
                                </ThemedText>

                            </View>
                        ))}

                        <TouchableOpacity className="mt-2 flex-row justify-end">
                            <ThemedText lightColor='#46BB1C' darkColor='#46BB1C' className="text-sm font-medium">View more</ThemedText>
                        </TouchableOpacity>
                    </View>


                    <View className="mb-6">
                        <ThemedText className="text-base font-semibold text-gray-900 mb-4">
                            Recipient Info
                        </ThemedText>
                        <View className="flex-row justify-between mb-2">
                            <ThemedText className="text-sm text-gray-600">Name:</ThemedText>
                            <ThemedText className="text-sm text-gray-600">Phone:</ThemedText>
                        </View>
                        <View className="flex-row justify-between">
                            <ThemedText className="text-sm text-gray-900 font-medium">
                                {recipientInfo.name}
                            </ThemedText>
                            <ThemedText className="text-sm text-gray-900 font-medium">
                                {recipientInfo.phone}
                            </ThemedText>
                        </View>
                    </View>

                    {/* Image of Pickup Item */}
                    <View className="mb-6">
                        <ThemedText className="text-base font-semibold text-gray-900 mb-4">
                            Image of Pickup Item
                        </ThemedText>
                        <View className="flex-row gap-3">
                            {[1, 2, 3].map((imageIndex) => (
                                <View
                                    key={imageIndex}
                                    className="w-full flex-1 h-24 bg-gray-100 border border-gray-200 rounded-lg items-center justify-center"
                                >
                                    <View className="w-8 h-6 bg-gray-800 rounded-sm items-center justify-center">
                                        <View className="w-4 h-3 border border-red-500 rounded-sm" />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Service Charge */}
                    <View className="flex-row items-center justify-between mb-6 border-[#EBEBED] pb-3 border-b-4">
                        <View className="flex-row items-center gap-2">
                            <EarningIcon color={itemIconColor}/>
                            <ThemedText className="text-sm font-medium text-gray-900">
                                Service charge
                            </ThemedText>
                        </View>
                        <ThemedText lightColor='#46BB1C' darkColor='#46BB1C' className="text-base font-bold">
                            {serviceCharge}
                        </ThemedText>
                    </View>

                    {/* Additional Information */}
                    <View className="mb-5 border-[#EBEBED] pb-3 border-b-4">
                        <ThemedText className="text-base font-semibold text-gray-900 mb-3">
                            Additional Information
                        </ThemedText>
                        <ThemedText className="text-sm text-gray-600 leading-5">
                            {additionalInfo}
                            <TouchableOpacity>
                                <ThemedText className="text-green-600 font-medium"> Show more</ThemedText>
                            </TouchableOpacity>
                        </ThemedText>
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row gap-3">
                        <View className="flex-1">
                            <CustomButton
                                title="Cancel Trip"
                                onPress={onClose}
                                className=""
                            />
                        </View>
                        <View className="flex-1">
                            <CustomButton
                                title="Start trip"
                                primary
                                onPress={() => {
                                   
                                }}
                            />
                        </View>
                    </View>
                </View>
            </BottomSheetScrollView>
        </BottomSheetModal>

    );
};

export default DeliveryDetailsBottomSheet;