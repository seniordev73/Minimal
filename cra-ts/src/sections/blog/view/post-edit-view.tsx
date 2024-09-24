import { useEffect } from 'react';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// utils
import { paramCase } from 'src/utils/change-case';
// components
import { useParams } from 'src/routes/hook';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { useBlog } from '../hooks';
import PostNewEditForm from '../post-new-edit-form';

// ----------------------------------------------------------------------

export default function PostEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { title } = params;

  const { posts, getPosts } = useBlog();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const currentPost = posts.find((post) => title === paramCase(post.title));

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
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
            name: currentPost?.title,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PostNewEditForm currentPost={currentPost} />
    </Container>
  );
}
