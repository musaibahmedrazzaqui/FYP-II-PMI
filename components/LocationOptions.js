import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

import { Icon } from "react-native-elements";

const data = [
  {
    id: "1",
    title: "Home",
    icon: "home",
  },
  {
    id: "2",
    title: "Work",
    icon: "briefcase",
  },
];

const LocationOptions = () => {
  const Navigation = useNavigation();

  return (
    <View>
      <Text style={tw`m-2 font-bold text-4`}>Take a Ride to</Text>
      <FlatList
        data={data}
        style={tw`m-2 bg-gray-100`}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={tw`w-0.2 bg-gray-500 my-2`} />
        )}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => Navigation.navigate(item.screen)}
            style={tw`p-2 space-between`}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon
                name={item.icon}
                style={tw`p-2 m-2 rounded-full bg-white`}
                color={"black"}
                type="font-awesome"
                size={12}
              />
              <View>
                <Text style={[tw`font-bold`, ""]}>{item.title}</Text>
                <Text style={[tw`mt-1`, ""]}>Set Address</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LocationOptions;
