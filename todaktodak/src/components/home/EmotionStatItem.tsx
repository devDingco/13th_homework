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
        <img
          src={emotion}
          alt="감정이모지"
          width={0}
          height={0}
          className="w-8 h-8 rounded-full`"
        />
      </div>
      <div className="flex items-center">
        <div className={`w-24 h-2 bg-${color}-200 rounded-full`}></div>
        <span className="ml-3 text-sm font-medium">{percentage}%</span>
      </div>
    </div>
  );
}
