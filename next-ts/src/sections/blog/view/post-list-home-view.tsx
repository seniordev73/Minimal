'use client';

import orderBy from 'lodash/orderBy';
import { useEffect, useCallback, useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// utils
import axios, { API_ENDPOINTS } from 'src/utils/axios';
// types
import { IPostItem } from 'src/types/blog';
// _mock
import { POST_SORT_OPTIONS } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
//
import { useBlog } from '../hooks';
import PostList from '../post-list';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function PostListHomeView() {
  const settings = useSettingsContext();

  const { posts, getPosts, postsStatus } = useBlog();

  const [sortBy, setSortBy] = useState('latest');

  const [search, setSearch] = useState<{ query: string; results: IPostItem[] }>({
    query: '',
    results: [],
  });

  const dataFiltered = applyFilter({
    inputData: posts,
    sortBy,
  });

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(async (value: string) => {
    try {
      setSearch((prevState) => ({
        ...prevState,
        query: value,
      }));

      if (value) {
        const response = await axios.get(API_ENDPOINTS.post.search, {
          params: {
            query: value,
          },
        });

        setSearch((prevState) => ({
          ...prevState,
          results: response.data.results,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        Blog
      </Typography>

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <PostSearch
          search={search}
          onSearch={handleSearch}
          hrefItem={(title: string) => paths.post.details(title)}
        />

        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      <PostList posts={dataFiltered} loading={postsStatus.loading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, sortBy }: { inputData: IPostItem[]; sortBy: string }) => {
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(inputData, ['totalViews'], ['desc']);
  }

  return inputData;
};
