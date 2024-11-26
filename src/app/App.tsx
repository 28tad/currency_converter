import Navbar from '@/components/Navbar/Navbar';
import AppRouter from './router/AppRouter';
import cls from './App.module.scss';

function App() {
  return (
    <div className={cls.app}>
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
