import orderBy from 'lodash/orderBy';
import { useEffect, useCallback, useState } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import axios, { API_ENDPOINTS } from 'src/utils/axios';
// types
import { IPostItem, IPostFilters, IPostFilterValue } from 'src/types/blog';
// _mock
import { POST_SORT_OPTIONS } from 'src/_mock';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { useBlog } from '../hooks';
import PostSort from '../post-sort';
import PostSearch from '../post-search';
import PostListHorizontal from '../post-list-horizontal';

// ----------------------------------------------------------------------

const defaultFilters = {
  publish: 'all',
};

// ----------------------------------------------------------------------

export default function PostListView() {
  const settings = useSettingsContext();

  const { posts, getPosts, postsStatus } = useBlog();

  const [sortBy, setSortBy] = useState('latest');

  const [filters, setFilters] = useState(defaultFilters);

  const [search, setSearch] = useState<{ query: string; results: IPostItem[] }>({
    query: '',
    results: [],
  });

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const dataFiltered = applyFilter({
    inputData: posts,
    filters,
    sortBy,
  });

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleFilters = useCallback((name: string, value: IPostFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const handleFilterPublish = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('publish', newValue);
    },
    [handleFilters]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Blog',
            href: paths.dashboard.post.root,
          },
          {
            name: 'List',
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.post.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Post
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <PostSearch
          search={search}
          onSearch={handleSearch}
          hrefItem={(title: string) => paths.dashboard.post.details(title)}
        />

        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      <Tabs
        value={filters.publish}
        onChange={handleFilterPublish}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {['all', 'published', 'draft'].map((tab) => (
          <Tab
            key={tab}
            iconPosition="end"
            value={tab}
            label={tab}
            icon={
              <Label
                variant={((tab === 'all' || tab === filters.publish) && 'filled') || 'soft'}
                color={(tab === 'published' && 'info') || 'default'}
              >
                {tab === 'all' && posts.length}

                {tab === 'published' && posts.filter((post) => post.publish === 'published').length}

                {tab === 'draft' && posts.filter((post) => post.publish === 'draft').length}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      <PostListHorizontal posts={dataFiltered} loading={postsStatus.loading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
}: {
  inputData: IPostItem[];
  filters: IPostFilters;
  sortBy: string;
}) => {
  const { publish } = filters;

  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  if (publish !== 'all') {
    inputData = inputData.filter((post) => post.publish === publish);
  }

  return inputData;
};
