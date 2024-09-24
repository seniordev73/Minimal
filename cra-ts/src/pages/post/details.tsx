import { Helmet } from 'react-helmet-async';
// sections
import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function PostDetailsHomePage() {
  return (
    <>
      <Helmet>
        <title> Post: Details</title>
      </Helmet>

      <PostDetailsHomeView />
    </>
  );
}
