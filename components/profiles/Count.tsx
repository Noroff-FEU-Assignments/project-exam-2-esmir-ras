import { Profile } from 'types';

interface Props {
  label: string;
  count: number;
}

export function Count({ label, count }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <strong className="font-bold text-xl">{count}</strong>
      <span className="text-sm">{label}</span>
    </div>
  );
}
