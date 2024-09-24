'use client';

import { useEffect, useCallback } from 'react';
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// redux
import { useDispatch } from 'src/redux/store';
import {
  markAsSeen,
  getContacts,
  getConversation,
  getConversations,
  resetActiveConversation,
} from 'src/redux/slices/chat';
// routes
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hook';
// components
import { useSettingsContext } from 'src/components/settings';
//
import { useChat } from '../hooks';
import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';
import ChatMessageList from '../chat-message-list';
import ChatMessageInput from '../chat-message-input';
import ChatHeaderDetail from '../chat-header-detail';
import ChatHeaderCompose from '../chat-header-compose';

// ----------------------------------------------------------------------

function useInitial() {
  const dispatch = useDispatch();

  const router = useRouter();

  const searchParams = useSearchParams();

  const conversationParam = searchParams.get('id');

  const getContactsCallback = useCallback(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const getConversationsCallback = useCallback(() => {
    dispatch(getConversations());
  }, [dispatch]);

  const getConversationCallback = useCallback(() => {
    try {
      if (conversationParam) {
        dispatch(getConversation(conversationParam));
        dispatch(markAsSeen(conversationParam));
      } else {
        router.push(paths.dashboard.chat);
        dispatch(resetActiveConversation());
      }
    } catch (error) {
      console.error(error);
      router.push(paths.dashboard.chat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationParam, dispatch]);

  useEffect(() => {
    getContactsCallback();
  }, [getContactsCallback]);

  useEffect(() => {
    getConversationsCallback();
  }, [getConversationsCallback]);

  useEffect(() => {
    getConversationCallback();
  }, [getConversationCallback]);

  return null;
}

export default function ChatView() {
  useInitial();

  const settings = useSettingsContext();

  const {
    contacts,
    recipients,
    conversations,
    conversationsStatus,
    currentConversation,
    currentConversationId,
    participantsInConversation,
    //
    onSendCompose,
    onSendMessage,
    onAddRecipients,
    onClickNavItem,
  } = useChat();

  const details = !!currentConversationId;

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      {details ? (
        <ChatHeaderDetail participants={participantsInConversation} />
      ) : (
        <ChatHeaderCompose contacts={contacts} onAddRecipients={onAddRecipients} />
      )}
    </Stack>
  );

  const renderNav = (
    <ChatNav
      contacts={contacts}
      conversations={conversations}
      onClickConversation={onClickNavItem}
      loading={conversationsStatus.loading}
      currentConversationId={currentConversationId}
    />
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList
        messages={currentConversation.messages}
        participants={participantsInConversation}
      />

      <ChatMessageInput
        recipients={recipients}
        onSendCompose={onSendCompose}
        onSendMessage={onSendMessage}
        currentConversationId={currentConversationId}
      />
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Chat
      </Typography>

      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}

            {details && (
              <ChatRoom
                conversation={currentConversation}
                participants={participantsInConversation}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
