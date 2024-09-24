import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
// types
import { IPostItem } from 'src/types/blog';
// components
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hook';
import SearchNotFound from 'src/components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  search: {
    query: string;
    results: IPostItem[];
  };
  onSearch: (inputValue: string) => void;
  hrefItem: (title: string) => string;
};

export default function PostSearch({ search, onSearch, hrefItem }: Props) {
  const router = useRouter();

  const handleClick = (title: string) => {
    router.push(hrefItem(title));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (search.query) {
      if (event.key === 'Enter') {
        handleClick(search.query);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 260 } }}
      autoHighlight
      popupIcon={null}
      options={search.results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.title}
      noOptionsText={<SearchNotFound query={search.query} sx={{ bgcolor: 'unset' }} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: {
          placement: 'bottom-start',
          sx: {
            minWidth: 320,
          },
        },
        paper: {
          sx: {
            [` .${autocompleteClasses.option}`]: {
              pl: 0.75,
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, post, { inputValue }) => {
        const matches = match(post.title, inputValue);
        const parts = parse(post.title, matches);

        return (
          <li {...props} key={post.id}>
            <Avatar
              key={post.id}
              alt={post.title}
              src={post.coverUrl}
              variant="rounded"
              sx={{ width: 48, height: 48, flexShrink: 0, mr: 1.5, borderRadius: 1 }}
            />

            <Link key={inputValue} underline="none" onClick={() => handleClick(post.title)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
