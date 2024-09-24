import keyBy from 'lodash/keyBy';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import axios, { API_ENDPOINTS } from 'src/utils/axios';
// types
import { IChatState, IChatParticipant } from 'src/types/chat';

// ----------------------------------------------------------------------

const initialState: IChatState = {
  contacts: [],
  recipients: [],
  currentConversationId: null,
  conversations: { byId: {}, allIds: [] },
  conversationsStatus: {
    loading: false,
    empty: false,
    error: null,
  },
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // GET CONTACT
    getContactsSuccess(state, action) {
      state.contacts = action.payload;
    },

    // GET CONVERSATIONS
    getConversationsStart(state) {
      state.conversationsStatus.loading = true;
      state.conversationsStatus.empty = false;
      state.conversationsStatus.error = null;
    },
    getConversationsFailure(state, action) {
      state.conversationsStatus.loading = false;
      state.conversationsStatus.empty = false;
      state.conversationsStatus.error = action.payload;
    },
    getConversationsSuccess(state, action) {
      const conversations = action.payload;

      state.conversationsStatus.loading = false;
      state.conversationsStatus.empty = !conversations.length;
      state.conversationsStatus.error = null;

      state.conversations.byId = keyBy(conversations, 'id');
      state.conversations.allIds = Object.keys(state.conversations.byId);
    },

    // GET CONVERSATION
    getConversationSuccess(state, action) {
      const conversation = action.payload;

      if (conversation) {
        state.recipients = [];
        state.currentConversationId = conversation.id;
        state.conversations.byId[conversation.id] = conversation;
        if (!state.conversations.allIds.includes(conversation.id)) {
          state.conversations.allIds.push(conversation.id);
        }
      } else {
        state.currentConversationId = null;
      }
    },

    // ON SEND MESSAGE
    sendMessageSuccess(state, action) {
      const { conversationId, message } = action.payload;

      if (conversationId) {
        state.conversations.byId[conversationId].messages.push(message);
      }
    },

    // MARK THE CONVERSATION AS SEEN
    markAsSeenSuccess(state, action) {
      const { conversationId } = action.payload;
      const conversation = state.conversations.byId[conversationId];

      if (conversation) {
        conversation.unreadCount = 0;
      }
    },

    // RESET ACTIVE CONVERSATION
    resetActiveConversation(state) {
      state.currentConversationId = null;
    },

    // ADD RECIPIENTS WHEN CREATE NEW CONVERSATION
    addRecipients(state, action) {
      state.recipients = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { addRecipients, resetActiveConversation } = slice.actions;

// ----------------------------------------------------------------------

export function getContacts() {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(API_ENDPOINTS.chat, {
        params: {
          endpoint: 'contacts',
        },
      });
      dispatch(slice.actions.getContactsSuccess(response.data.contacts));
    } catch (error) {
      console.error(error);
    }
  };
}

// ----------------------------------------------------------------------

export function getConversations() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.getConversationsStart());
    try {
      const response = await axios.get(API_ENDPOINTS.chat, {
        params: {
          endpoint: 'conversations',
        },
      });
      dispatch(slice.actions.getConversationsSuccess(response.data.conversations));
    } catch (error) {
      dispatch(slice.actions.getConversationsFailure(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getConversation(conversationId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(API_ENDPOINTS.chat, {
        params: {
          conversationId,
          endpoint: 'conversation',
        },
      });
      dispatch(slice.actions.getConversationSuccess(response.data.conversation));
    } catch (error) {
      console.error(error);
    }
  };
}

// ----------------------------------------------------------------------

export function sendMessage(conversationId: string, body: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = {
        conversationId,
        body,
      };
      const response = await axios.put(API_ENDPOINTS.chat, data);
      dispatch(slice.actions.sendMessageSuccess(response.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function createNewConversation(recipients: IChatParticipant[], body: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = {
        recipients,
        body,
      };
      const response = await axios.post(API_ENDPOINTS.chat, data);
      dispatch(slice.actions.getConversationSuccess(response.data.conversation));
    } catch (error) {
      console.error(error);
    }
  };
}

// ----------------------------------------------------------------------

export function markAsSeen(conversationId: string) {
  return async (dispatch: Dispatch) => {
    try {
      await axios.get(API_ENDPOINTS.chat, {
        params: {
          conversationId,
          endpoint: 'mark-as-seen',
        },
      });

      dispatch(slice.actions.markAsSeenSuccess({ conversationId }));
    } catch (error) {
      console.error(error);
    }
  };
}
