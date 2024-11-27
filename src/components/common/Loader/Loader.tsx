import { classNames } from '@/lib/classNames';
import './Loader.scss';

export function Loader() {
  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
