import { useLenis } from '@/hooks/useLenis';
import AppRoutes from './routes';

export default function App() {
  useLenis();
  return <AppRoutes />;
}
