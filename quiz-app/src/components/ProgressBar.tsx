interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current}>
      <div className="progress-fill" style={{ width: `${(current / total) * 100}%` }} />
    </div>
  );
}
