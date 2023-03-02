import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import server from './globals';
const DriverBefDest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {
    const response = await fetch(`${server}/mailer/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address:</Text>
      <TextInput
        style={styles.input}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
        <Text style={styles.buttonText}>Send Verification Email</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    marginTop: 20,
    color: 'green',
  },
});

export default DriverBefDest;
