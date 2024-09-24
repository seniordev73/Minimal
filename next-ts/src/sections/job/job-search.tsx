import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
// types
import { IJobItem } from 'src/types/job';
// components
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hook';
import SearchNotFound from 'src/components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  search: {
    query: string;
    results: IJobItem[];
  };
  onSearch: (inputValue: string) => void;
  hrefItem: (id: string) => string;
};

export default function JobSearch({ search, onSearch, hrefItem }: Props) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(hrefItem(id));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (search.query) {
      if (event.key === 'Enter') {
        const selectProduct = search.results.filter((job) => job.title === search.query)[0];

        handleClick(selectProduct.id);
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
      renderOption={(props, job, { inputValue }) => {
        const matches = match(job.title, inputValue);
        const parts = parse(job.title, matches);

        return (
          <Box component="li" {...props} onClick={() => handleClick(job.id)} key={job.id}>
            <div>
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
            </div>
          </Box>
        );
      }}
    />
  );
}
