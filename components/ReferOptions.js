import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';

const data = [
  {
    id: '1',
    image:
      'https://img.freepik.com/premium-vector/refer-friend-flat-design-illustration-with-megaphone-screen-mobile-phone-social-media-marketing-friends-via-banner-background-poster_2175-2234.jpg',
    title: 'Invite your Friends',
    desc: 'share this unique code with people in your network to add them to your connections',
    code: 'FASTNU',
  },
];

const ReferOptions = () => {
  const Navigation = useNavigation();
  return (
    <View>
      <Text style={tw`m-2 font-bold text-4`}>
        Invite Friends and Build Your Network
      </Text>
      <FlatList
        data={data}
        style={tw`m-2`}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={tw`w-0.2 my-2`} />}
        horizontal
        renderItem={({item}) => (
          <TouchableOpacity
            style={tw`p-4 w-70 shadow-sm border-[1px] border-gray-200 m-1`}>
            <View>
              <Image
                style={{width: 220, height: 110, resizeMode: 'contain'}}
                source={{uri: item.image}}
              />
              <Text style={tw`font-bold`}>{item.title}</Text>

              <Text style={tw`mt-1`}>{item.desc}</Text>
              <Text style={tw`text-[12px] my-2`}>Share this code</Text>
              <Text
                style={tw`p-2 text-[12px] bg-gray-100 font-bold mb-2 rounded-md`}>
                {item.code}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => Navigation.navigate('ReferScreen')}>
                  <Text
                    style={tw`bg-white text-[12px] m-1 text-center text-blue-600 font-bold py-2 w-30 px-2 border-[1px] border-blue-600 rounded-md`}>
                    Invite
                  </Text>
                </TouchableOpacity>
                <Text
                  style={tw`bg-blue-600 text-[12px] m-1 text-center text-white font-bold py-2 w-30 px-2 border-[1px] border-blue-600 rounded-md`}>
                  Details
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ReferOptions;
