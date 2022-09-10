import { lazy, Suspense } from 'react';
import './app.scss';
const WorkPage = lazy(() => import('../pages/work-page/work-page'));
export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkPage />
    </Suspense>
  );
}
export default App;
