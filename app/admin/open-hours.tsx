import { getLocation, updateOpenHours } from "@/api/ownerDashboardThunk";
import AdminNotificationIcon from "@/assets/svg/AdminNotificationIcon";
import { ThemedText } from "@/components/ThemedText";
import TimePickerField from "@/components/TimePickerField";
import Loader from "@/components/loader";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useColorScheme } from "nativewind";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Toast } from "toastify-react-native";

export default function AdminOpenHoursScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { location, loadingLocation, loadingOpenHours } = useAppSelector(
    (state) => state.ownerDashboard,
  );

  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  useEffect(() => {
    if (location && !initialized) {
      setOpeningHour(location.openingHour || "");
      setClosingHour(location.closingHour || "");
      setInitialized(true);
    }
  }, [location, initialized]);

  const handleUpdate = async () => {
    if (!location?._id) return;

    if (!openingHour || !closingHour) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select both opening and closing hours",
      });
      return;
    }

    try {
      const res = await dispatch(
        updateOpenHours({
          locationId: location._id,
          openingHour,
          closingHour,
        }),
      ).unwrap();

      Toast.show({
        type: "success",
        text1: "Success",
        text2: res.message || "Opening hours updated successfully",
      });
      router.back();
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.message || "Failed to update opening hours",
      });
    }
  };

  const isLoading = loadingLocation && !initialized;

  const screenBg = isDark ? "#000" : "#FAFAFA";

  return (
    <View style={{ flex: 1, backgroundColor: screenBg }}>
      <Loader visible={loadingOpenHours} />

      <View className="pb-6 pt-16 px-[35px] flex-1">
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <ThemedText
            style={{ fontFamily: "Poppins_600SemiBold", fontSize: 22 }}
            darkColor="#FFFFFF"
            lightColor="#000000"
          >
            Open Hours
          </ThemedText>
          <TouchableOpacity
            style={{
              backgroundColor: "#00FF943B",
              borderRadius: 10,
              width: 38,
              height: 38,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AdminNotificationIcon
              color={isDark ? "#FFFFFF" : "#2D264B"}
              dotColor="#03EA89"
            />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemedText
              lightColor="#999"
              darkColor="#666"
              style={{ fontSize: 14 }}
            >
              Loading current hours...
            </ThemedText>
          </View>
        ) : (
          <>
            {/* Current hours summary */}
            <View
              style={{
                backgroundColor: isDark ? "#111" : "#F9FAFB",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: isDark ? "#222" : "#F0F0F0",
                padding: 20,
                marginBottom: 28,
              }}
            >
              <ThemedText
                lightColor="#888"
                darkColor="#666"
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  marginBottom: 12,
                }}
              >
                Current Schedule
              </ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                  darkColor="#FFFFFF"
                  lightColor="#111"
                >
                  {location?.openingHour || "—"}
                </ThemedText>
                <ThemedText
                  lightColor="#999"
                  darkColor="#666"
                  style={{ fontSize: 16, fontWeight: "400" }}
                >
                  –
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                  darkColor="#FFFFFF"
                  lightColor="#111"
                >
                  {location?.closingHour || "—"}
                </ThemedText>
              </View>
            </View>

            {/* Time pickers */}
            <View style={{ gap: 16 }}>
              <TimePickerField
                label="Opening Hour"
                value={openingHour}
                onChange={setOpeningHour}
                placeholder="Select opening time"
              />
              <TimePickerField
                label="Closing Hour"
                value={closingHour}
                onChange={setClosingHour}
                placeholder="Select closing time"
              />
            </View>

            {/* Save button */}
            <View className="mt-auto mb-[42px]">
              <TouchableOpacity
                onPress={handleUpdate}
                disabled={loadingOpenHours}
                style={{
                  backgroundColor: loadingOpenHours ? "#00FF9499" : "#00FF94",
                  paddingVertical: 16,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 15,
                    color: "#fff",
                  }}
                >
                  {loadingOpenHours ? "Updating..." : "Update Hours"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
