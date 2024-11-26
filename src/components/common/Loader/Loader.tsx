import { classNames } from '@/lib/classNames';
import './Loader.scss';

export function Loader() {
  return (
    <div className={classNames('lds-ellipsis', {})}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
