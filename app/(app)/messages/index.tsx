import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_CONVERSATIONS, ConversationItem, MessageBubble } from '../../../src/constants/messagingData';
import { AppIcon } from '../../../src/components/AppIcon';

const BREAKPOINT = 880;

function useIsWide() {
  const dims = useWindowDimensions();
  const getWidth = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return dims.width;
  };

  const [width, setWidth] = useState(getWidth);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    setWidth(window.innerWidth);
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const currentWidth = Platform.OS === 'web' ? width : dims.width;
  return currentWidth >= BREAKPOINT;
}

export default function MessagesIndexScreen() {
  const router = useRouter();
  const isWide = useIsWide();

  const [conversations, setConversations] = useState<ConversationItem[]>(MOCK_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string>('conv-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const selectedConv = conversations.find(c => c.id === selectedId) || conversations[0];

  const filteredConversations = conversations.filter(c =>
    c.freelancerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectConv = (conv: ConversationItem) => {
    setSelectedId(conv.id);
    if (!isWide) {
      router.push(`/messages/${conv.id}` as any);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newBubble: MessageBubble = {
      id: `m-${Date.now()}`,
      sender: 'me',
      text: inputMessage.trim(),
      time: 'Just now',
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === selectedConv.id) {
          return {
            ...c,
            snippet: inputMessage.trim(),
            time: 'Just now',
            messages: [...c.messages, newBubble],
          };
        }
        return c;
      })
    );

    setInputMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerLayout}>
        
        {/* Left Column: Conversation List */}
        <View style={[styles.leftPane, !isWide && styles.fullPane]}>
          
          {/* Header */}
          <View style={styles.listHeader}>
            <Text style={styles.pageTitle}>Messages</Text>
            <Text style={styles.subtitle}>Direct client & freelancer communication</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchIcon}>
                <AppIcon name="search-outline" size={17} color="#93A0B4" />
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="Search messages or people..."
                placeholderTextColor="#93A0B4"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Conversations Scroll List */}
          <ScrollView style={styles.convList} contentContainerStyle={{ paddingBottom: 24 }}>
            {filteredConversations.map(conv => {
              const isSelected = isWide && conv.id === selectedId;
              return (
                <Pressable
                  key={conv.id}
                  onPress={() => handleSelectConv(conv)}
                  style={[
                    styles.convCard,
                    isSelected && styles.convCardSelected,
                  ]}
                >
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{conv.avatar}</Text>
                  </View>

                  <View style={styles.convContent}>
                    <View style={styles.convRowTop}>
                      <Text style={styles.convName}>{conv.freelancerName}</Text>
                      <Text style={styles.convTime}>{conv.time}</Text>
                    </View>
                    <Text style={styles.convRole} numberOfLines={1}>
                      {conv.role}
                    </Text>
                    <Text style={styles.convSnippet} numberOfLines={1}>
                      {conv.snippet}
                    </Text>
                  </View>

                  {conv.unreadCount ? conv.unreadCount > 0 ? (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{conv.unreadCount}</Text>
                    </View>
                  ) : null : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Right Pane: Thread View (Wide screen only) */}
        {isWide && (
          <View style={styles.rightPane}>
            
            {/* Thread Top Header */}
            <View style={styles.threadHeader}>
              <View style={styles.avatarLarge}>
                <Text style={styles.avatarTextLarge}>{selectedConv.avatar}</Text>
              </View>
              <View style={styles.threadHeaderMeta}>
                <Text style={styles.threadName}>{selectedConv.freelancerName}</Text>
                <Text style={styles.threadRole}>{selectedConv.role}</Text>
              </View>
            </View>

            {/* Thread Bubbles */}
            <ScrollView style={styles.threadBody} contentContainerStyle={{ padding: 24, gap: 16 }}>
              {selectedConv.messages.map(m => {
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

            {/* Thread Input Bar */}
            <View style={styles.threadInputBar}>
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
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  innerLayout: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
  },
  leftPane: {
    width: 380,
    borderRightWidth: 1,
    borderRightColor: '#E7E9F1',
    backgroundColor: '#FFFFFF',
  },
  fullPane: {
    width: '100%',
    borderRightWidth: 0,
  },
  rightPane: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  listHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
  },
  pageTitle: {
    fontSize: 26,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F7FB',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E7E9F1',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 38,
    fontSize: 13.5,
    fontFamily: 'Inter_400Regular',
    color: '#10172A',
  },
  convList: {
    flex: 1,
  },
  convCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F7FB',
    gap: 12,
  },
  convCardSelected: {
    backgroundColor: '#FDE8EF',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  convContent: {
    flex: 1,
  },
  convRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  convName: {
    fontSize: 14.5,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
  },
  convTime: {
    fontSize: 11.5,
    color: '#93A0B4',
    fontFamily: 'Inter_400Regular',
  },
  convRole: {
    fontSize: 12,
    color: '#EC1257',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 2,
  },
  convSnippet: {
    fontSize: 12.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  unreadBadge: {
    backgroundColor: '#EC1257',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  threadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E9F1',
    gap: 14,
  },
  avatarLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTextLarge: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  threadHeaderMeta: {
    flex: 1,
  },
  threadName: {
    fontSize: 16,
    fontFamily: 'Manrope_800ExtraBold',
    color: '#10172A',
  },
  threadRole: {
    fontSize: 12.5,
    color: '#5B6472',
    fontFamily: 'Inter_500Medium',
    marginTop: 2,
  },
  threadBody: {
    flex: 1,
  },
  bubbleRow: {
    maxWidth: '75%',
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
    backgroundColor: '#F6F7FB',
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
  threadInputBar: {
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
