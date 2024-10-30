interface EmotionStatItemProps {
  emotion: string;
  percentage: number;
  color: string;
}

export function EmotionStatItem({
  emotion,
  percentage,
  color,
}: EmotionStatItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full bg-${color}-200`}></div>
        <span>{emotion}</span>
      </div>
      <div className="flex items-center">
        <div className={`w-24 h-2 bg-${color}-200 rounded-full`}></div>
        <span className="ml-3 text-sm font-medium">{percentage}%</span>
      </div>
    </div>
  );
}
