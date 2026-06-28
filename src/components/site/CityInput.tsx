import { useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type Suggestion = { code: string; name: string; country: string };

export function CityInput({
  label,
  placeholder,
  value,
  onChange,
  className,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const handleInput = (q: string) => {
    onChange(q);
    clearTimeout(timer.current);
    if (q.length < 2) { setSuggestions([]); return; }
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cities?q=${encodeURIComponent(q)}`);
        if (res.ok) setSuggestions(await res.json());
      } catch { /* ignore */ }
    }, 250);
  };

  const pick = (s: Suggestion) => {
    onChange(`${s.name} (${s.code})`);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <label className="group flex flex-col gap-1 rounded-xl border border-border bg-background/60 px-4 py-3 transition-colors focus-within:border-ocean focus-within:bg-background">
        <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {label}
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="h-7 border-0 bg-transparent p-0 text-base font-medium outline-none placeholder:text-muted-foreground/60"
          autoComplete="off"
        />
      </label>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {suggestions.map((s) => (
            <button
              key={s.code}
              type="button"
              onMouseDown={() => pick(s)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-muted"
            >
              <span className="w-10 shrink-0 rounded-md bg-ocean/10 px-1 py-0.5 text-center text-xs font-bold text-ocean">
                {s.code}
              </span>
              <span className="flex-1 font-medium">{s.name}</span>
              <span className="text-xs text-muted-foreground">{s.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
