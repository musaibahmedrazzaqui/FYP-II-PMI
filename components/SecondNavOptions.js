import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: 'Register As A Driver',
    image: require('../assets/register.png'),
    screen: 'RegisterDriverScreen',
  },
];

// const SecondNavOptions = () => {
//   return (
//     <div>SecondNavOptions</div>
//   )
// }

// export default SecondNavOptions
const navOptions = ({uid}) => {
  const Navigation = useNavigation();
  console.log(uid);
  return (
    <View>
      <Text style={tw`m-2 font-bold text-4`}>
        Register as a driver if you haven't already and you'll be able to take
        your vehicle for Carpool!
      </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate({
                name: item.screen,
                params: {
                  userid: uid,
                },
              })
            }
            style={tw`p-3 m-3 w-85 rounded-sm shadow-sm `}>
            <View>
              <Image
                style={{
                  width: 90,
                  height: 50,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={item.image}
              />
              <Text style={[tw`text-black font-bold py-2 text-center`, '']}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default navOptions;
