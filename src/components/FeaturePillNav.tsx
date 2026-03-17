import type { LucideIcon } from "lucide-react";

interface PillItem {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

interface FeaturePillNavProps {
  items: PillItem[];
}

export default function FeaturePillNav({ items }: FeaturePillNavProps) {
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const row1 = items.slice(0, 3);
  const row2 = items.slice(3);

  return (
    <div className="md:hidden mt-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-4 shadow-sm">
      <div className="flex flex-col gap-2.5">
        <div className="grid grid-cols-3 gap-2.5">
          {row1.map((item) => (
            <Pill key={item.id} item={item} onClick={handleClick} />
          ))}
        </div>
        {row2.length > 0 && (
          <div className="grid grid-cols-3 gap-2.5">
            {row2.map((item) => (
              <Pill key={item.id} item={item} onClick={handleClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({ item, onClick, className = "" }: { item: PillItem; onClick: (id: string) => void; className?: string }) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`flex flex-col items-center gap-1.5 rounded-xl border border-border/40 bg-background p-4 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md active:scale-95 ${className}`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <span className="text-xs font-bold leading-tight">{item.label}</span>
      {item.description && (
        <span className="text-[10px] leading-tight text-muted-foreground line-clamp-1">{item.description}</span>
      )}
    </button>
  );
}
