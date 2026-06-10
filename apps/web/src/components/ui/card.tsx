type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-[2rem] border border-border-soft bg-surface-soft p-5 ${className}`}
    >
      {children}
    </div>
  );
}