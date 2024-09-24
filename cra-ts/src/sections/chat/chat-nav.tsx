import { useState, useEffect, useCallback } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// routes
import { paths } from 'src/routes/paths';
// types
import { IChatParticipant, IChatConversationsState } from 'src/types/chat';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useRouter } from 'src/routes/hook';
//
import { useCollapseNav } from './hooks';
import ChatNavItem from './chat-nav-item';
import ChatNavSearch from './chat-nav-search';
import ChatNavAccount from './chat-nav-account';
import { ChatNavItemSkeleton } from './chat-skeleton';
import ChatNavSearchResults from './chat-nav-search-results';

// ----------------------------------------------------------------------

const NAV_WIDTH = 320;

const NAV_COLLAPSE_WIDTH = 96;

type Props = {
  loading: boolean;
  contacts: IChatParticipant[];
  currentConversationId: string | null;
  conversations: IChatConversationsState;
  onClickConversation: (id: string) => void;
};

export default function ChatNav({
  loading,
  contacts,
  conversations,
  onClickConversation,
  currentConversationId,
}: Props) {
  const theme = useTheme();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const {
    collapseDesktop,
    onCloseDesktop,
    onCollapseDesktop,
    //
    openMobile,
    onOpenMobile,
    onCloseMobile,
  } = useCollapseNav();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState<IChatParticipant[]>([]);

  useEffect(() => {
    if (!mdUp) {
      onCloseDesktop();
    }
  }, [onCloseDesktop, mdUp]);

  const handleToggleNav = useCallback(() => {
    if (mdUp) {
      onCollapseDesktop();
    } else {
      onCloseMobile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdUp]);

  const handleClickCompose = useCallback(() => {
    if (!mdUp) {
      onCloseMobile();
    }
    router.push(paths.dashboard.chat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdUp]);

  const handleSearchContact = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setSearchQuery(value);

      if (value) {
        const results = contacts.filter((contact) => contact.name.toLowerCase().includes(value));

        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    },
    [contacts]
  );

  const handleClickResult = useCallback((result: IChatParticipant) => {
    setSearchQuery('');
    router.push(`${paths.dashboard.chat}?id=${result.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickConversation = useCallback(
    (id: string) => {
      if (!mdUp) {
        onCloseMobile();
      }
      onClickConversation(id);
    },

    [onCloseMobile, mdUp, onClickConversation]
  );

  const handleClickAwaySearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  const renderMobileBtn = (
    <IconButton
      onClick={onOpenMobile}
      sx={{
        left: 0,
        top: 84,
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        borderRadius: `0 12px 12px 0`,
        bgcolor: theme.palette.primary.main,
        boxShadow: theme.customShadows.primary,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          bgcolor: theme.palette.primary.darker,
        },
      }}
    >
      <Iconify width={16} icon="solar:users-group-rounded-bold" />
    </IconButton>
  );

  const renderList = (
    <>
      {(loading ? [...Array(12)] : conversations.allIds).map((conversationId, index) =>
        conversationId ? (
          <ChatNavItem
            key={conversationId}
            collapse={collapseDesktop}
            conversation={conversations.byId[conversationId]}
            onClickConversation={() => handleClickConversation(conversationId)}
            selected={conversationId === currentConversationId}
          />
        ) : (
          <ChatNavItemSkeleton key={index} />
        )
      )}
    </>
  );

  const renderListResults = (
    <ChatNavSearchResults
      searchQuery={searchQuery}
      searchResults={searchResults}
      onClickResult={handleClickResult}
    />
  );

  const renderContent = (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 2.5, pb: 0 }}>
        {!collapseDesktop && (
          <>
            <ChatNavAccount />
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}

        <IconButton onClick={handleToggleNav}>
          <Iconify
            icon={collapseDesktop ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
          />
        </IconButton>

        {!collapseDesktop && (
          <IconButton onClick={handleClickCompose}>
            <Iconify width={24} icon="solar:user-plus-bold" />
          </IconButton>
        )}
      </Stack>

      <Box sx={{ p: 2.5, pt: 0 }}>
        {!collapseDesktop && (
          <ChatNavSearch
            value={searchQuery}
            onSearchContact={handleSearchContact}
            onClickAway={handleClickAwaySearch}
          />
        )}
      </Box>

      <Scrollbar sx={{ pb: 1 }}>{!searchQuery ? renderList : renderListResults}</Scrollbar>
    </>
  );

  return (
    <>
      {!mdUp && renderMobileBtn}

      {mdUp ? (
        <Stack
          sx={{
            height: 1,
            flexShrink: 0,
            width: NAV_WIDTH,
            borderRight: `solid 1px ${theme.palette.divider}`,
            transition: theme.transitions.create(['width'], {
              duration: theme.transitions.duration.shorter,
            }),
            ...(collapseDesktop && {
              width: NAV_COLLAPSE_WIDTH,
            }),
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openMobile}
          onClose={onCloseMobile}
          slotProps={{
            backdrop: { invisible: true },
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
