import { Link } from 'react-router-dom';
import { RoutePath } from '@/app/router/routeConfig';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
  <div className={cls.notFoundPage}>
    <h1>404</h1>
    <p>Страница не найдена</p>
    <Link to={RoutePath.rates}>Вернуться на главную</Link>
  </div>
);
