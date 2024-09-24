import { Helmet } from 'react-helmet-async';
// sections
import MegaMenuView from 'src/sections/_examples/extra/mega-menu-view';

// ----------------------------------------------------------------------

export default function MegaMenuPage() {
  return (
    <>
      <Helmet>
        <title> Mega: Mega Menu</title>
      </Helmet>

      <MegaMenuView />
    </>
  );
}
