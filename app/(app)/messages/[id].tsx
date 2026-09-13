import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getConversationById, MessageBubble, ConversationItem } from '../../../src/constants/messagingData';

export default function MessageThreadScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const initialConv = getConversationById(id || 'conv-1');
  const [conv, setConv] = useState<ConversationItem>(initialConv);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newBubble: MessageBubble = {
      id: `m-${Date.now()}`,
      sender: 'me',
      text: inputMessage.trim(),
      time: 'Just now',
    };

    setConv(prev => ({
      ...prev,
      snippet: inputMessage.trim(),
      time: 'Just now',
      messages: [...prev.messages, newBubble],
    }));

    setInputMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        
        {/* Top Navigation Bar */}
        <View style={styles.navBar}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Messages</Text>
          </Pressable>

          <View style={styles.headerProfile}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{conv.avatar}</Text>
            </View>
            <View style={styles.profileMeta}>
              <Text style={styles.name}>{conv.freelancerName}</Text>
              <Text style={styles.role} numberOfLines={1}>{conv.role}</Text>
            </View>
          </View>
        </View>

        {/* Thread History */}
        <ScrollView style={styles.threadBody} contentContainerStyle={{ padding: 20, gap: 16 }}>
          {conv.messages.map(m => {
            const isMe = m.sender === 'me';
            return (
              <View
                key={m.id}
                style={[
                  styles.bubbleRow,
                  isMe ? styles.bubbleRowMe : styles.bubbleRowThem,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    isMe ? styles.bubbleMe : styles.bubbleThem,
                  ]}
                >
                  <Text style={isMe ? styles.bubbleTextMe : styles.bubbleTextThem}>
                    {m.text}
                  </Text>
                </View>
                <Text style={styles.bubbleTime}>{m.time}</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Bottom Input Area */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.messageInput}
            placeholder="Write a message..."
            placeholderTextColor="#93A0B4"
            value={inputMessage}
            onChangeText={setInputMessage}
            onSubmitEditing={handleSendMessage}
          />
          <Pressable style={styles.sendBtn} onPress={handleSendMessage}>
            <Text style={styles.sendBtnText}>Send</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapper: {
    flex: 1,
    maxWidth: 880,
    width: '100%',
    alignSelf: 'center',
  },
  navBar: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    paddingVertical: 6,
    paddingRight: 10,
  },
  backText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#EC1257',
  },
  headerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  profileMeta: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
  },
  role: {
    fontSize: 12,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
  threadBody: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  bubbleRow: {
    maxWidth: '85%',
  },
  bubbleRowMe: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubbleRowThem: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubbleMe: {
    backgroundColor: '#10172A',
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderBottomLeftRadius: 4,
  },
  bubbleTextMe: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  bubbleTextThem: {
    color: '#10172A',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  bubbleTime: {
    fontSize: 11,
    color: '#93A0B4',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E7E9F1',
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  messageInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#F6F7FB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    color: '#10172A',
  },
  sendBtn: {
    backgroundColor: '#EC1257',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
});
