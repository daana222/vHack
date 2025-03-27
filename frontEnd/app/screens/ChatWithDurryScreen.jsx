import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ChatWithDurryScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { id: 1, text: "How's your diet today?", sender: 'durry' }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: inputText, 
      sender: 'user' 
    }]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Thanks for sharing! I'll analyze your diet.", 
        sender: 'durry' 
      }]);
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#A780FF" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/durry.png")}
          style={styles.headerImage}
        />
        <Text style={styles.headerTitle}>Durry</Text>
      </View>

      {/* Chat messages */}
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageBubble, 
              message.sender === 'user' ? styles.userBubble : styles.durryBubble
            ]}
          >
            {message.sender === 'durry' && (
              <Image
                source={require("../../assets/images/durry.png")}
                style={styles.durryAvatar}
              />
            )}
            <View style={[
              styles.messageContent,
              message.sender === 'user' ? styles.userContent : styles.durryContent
            ]}>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input fixed above navigation bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ios: 90, android: 90})}
        style={styles.inputWrapper}
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Tell Durry something..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
          disabled={inputText.trim() === ''}
        >
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4D0F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D9C0F3',
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A780FF',
  },
  messagesContainer: {
    padding: 15,
    paddingBottom: 100, // Space for input
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  durryBubble: {
    justifyContent: 'flex-start',
  },
  userBubble: {
    justifyContent: 'flex-end',
  },
  durryAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageContent: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
  },
  durryContent: {
    backgroundColor: '#CFABF3',
    borderBottomLeftRadius: 5,
  },
  userContent: {
    backgroundColor: '#A780FF',
    borderBottomRightRadius: 5,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    maxHeight: 120,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A780FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default ChatWithDurryScreen;