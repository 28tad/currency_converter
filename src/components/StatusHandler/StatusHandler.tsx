import { Loader } from '@/components/common/Loader/Loader';
import cls from './StatusHandler.module.scss';

interface StatusHandlerProps {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  children: React.ReactNode;
}

const StatusHandler: React.FC<StatusHandlerProps> = ({ status, error, children }) => {
  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return (
      <div className={cls.error}>
        <p>
          Ошибка:
          {error}
        </p>
      </div>
    );
  }

  if (status === 'succeeded') {
    return <>{children}</>;
  }

  return null;
};

export default StatusHandler;
