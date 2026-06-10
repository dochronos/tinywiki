type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={`rounded-[2rem] border border-border-soft bg-surface p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <div className="mt-4">
        {children}
      </div>
    </section>
  );
}