import { useCallback } from 'react';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { sendMessage, addRecipients, createNewConversation } from 'src/redux/slices/chat';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// routes
import { paths } from 'src/routes/paths';
// types
import { IChatParticipant } from 'src/types/chat';
// components
import { useRouter } from 'src/routes/hook';

// ----------------------------------------------------------------------

const baseUrl = paths.dashboard.chat;

export default function useChat() {
  const dispatch = useDispatch();

  const router = useRouter();

  const { user } = useMockedUser();

  const currentUserId = user.id;

  const { contacts, recipients, conversations, currentConversationId, conversationsStatus } =
    useSelector((state) => state.chat);

  const currentConversation = useSelector(() => {
    if (currentConversationId) {
      return conversations.byId[currentConversationId];
    }

    return {
      id: '',
      messages: [],
      participants: [],
      unreadCount: 0,
      type: '',
    };
  });

  const participantsInConversation = currentConversation.participants.filter(
    (participant) => participant.id !== currentUserId
  );

  const onClickNavItem = useCallback(
    (conversationId: string) => {
      let _conversationId;

      const conversation = conversations.byId[conversationId];

      if (conversation.type === 'GROUP') {
        _conversationId = conversation.id;
      } else {
        const participantId = conversation.participants.filter(
          (participant) => participant.id !== currentUserId
        )[0].id;

        _conversationId = participantId;
      }

      router.push(`${baseUrl}?id=${_conversationId}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conversations.byId, currentUserId]
  );

  const onSendMessage = useCallback(
    (body: string) => {
      try {
        if (currentConversationId) {
          dispatch(sendMessage(currentConversationId, body));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [currentConversationId, dispatch]
  );

  const onSendCompose = useCallback(
    (body: string) => {
      try {
        dispatch(createNewConversation(recipients, body));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, recipients]
  );

  const onAddRecipients = useCallback(
    (selected: IChatParticipant[]) => {
      dispatch(addRecipients(selected));
    },
    [dispatch]
  );

  return {
    // redux
    contacts,
    recipients,
    conversations,
    conversationsStatus,
    currentConversationId,
    //
    currentConversation,
    participantsInConversation,
    //
    onSendMessage,
    onSendCompose,
    onAddRecipients,
    onClickNavItem,
  };
}
