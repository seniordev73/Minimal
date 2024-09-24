import { Helmet } from 'react-helmet-async';
// sections
import { PostEditView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function PostEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Post Edit</title>
      </Helmet>

      <PostEditView />
    </>
  );
}
