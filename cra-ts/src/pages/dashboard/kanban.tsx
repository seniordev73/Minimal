import { Helmet } from 'react-helmet-async';
// sections
import { KanbanView } from 'src/sections/kanban/view';

// ----------------------------------------------------------------------

export default function KanbanPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Kanban</title>
      </Helmet>

      <KanbanView />
    </>
  );
}
