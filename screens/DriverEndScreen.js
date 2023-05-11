import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import RideDetails from '../components/RideDetails';
import axios from 'axios';
import server from './globals';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
// import {Button} from 'react-native-paper';
import React, {useEffect, useState} from 'react';

export default function ReceiptScreen({navigation, route}) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');

  const handleRating = value => {
    setRating(value);
  };
  const handleComment = text => {
    setComment(text);
  };
  return (
    <Background>
      <View style={styles.container}>
        <Text style={[styles.question, {fontWeight: 'bold', fontSize: 21}]}>
          You have finished your Ride!
        </Text>
        <Text style={[styles.question, {fontWeight: 'bold', fontSize: 21}]}>
          Passengers that came along:
        </Text>
        {console.log('ridesJson', route.params.rides)}
        <RideDetails rides={route.params.rides} />
        <Text style={styles.question}>How was your Experience?</Text>
        <View style={styles.ratingContainer}>
          <TouchableOpacity
            style={
              rating === true ? styles.activeButton : styles.inactiveButton
            }
            onPress={() => handleRating(true)}>
            <Image
              source={require('../assets/face1.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              rating === false ? styles.activeButtonSad : styles.inactiveButton
            }
            onPress={() => handleRating(false)}>
            <Image
              source={require('../assets/surprise.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <TextInput
          value={comment}
          onChangeText={handleComment}
          placeholder="Add a comment (optional)"
          placeholderTextColor="#999"
          style={styles.commentInput}
          multiline
        />
        <Button
          onPress={() => {
            console.log(rating);
            console.log(comment);
            // console.log(route.params.rides[0].RideID);
            axios
              .get(`${server}/rides/updatestatusride/${route.params.rid}`)
              .then(res => {
                console.log(res.data);
                navigation.navigate({
                  name: 'DriverHome',
                });
              });
          }}>
          End Ride!
        </Button>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activeButton: {
    backgroundColor: '#ADD8E6',
    padding: 30,
    borderRadius: 5,
    margin: 10,
  },
  activeButtonSad: {
    backgroundColor: '#Fa8072',
    padding: 30,
    borderRadius: 5,
    margin: 10,
  },
  inactiveButton: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 5,
    margin: 10,
  },
  icon: {
    width: 70,
    height: 70,
  },
  commentInput: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
});
