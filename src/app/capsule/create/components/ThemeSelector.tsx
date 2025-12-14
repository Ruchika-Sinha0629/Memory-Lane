"use client";

interface ThemeSelectorProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export default function ThemeSelector({ theme, setTheme }: ThemeSelectorProps) {
  const themes = ["Childhood", "Family History", "College Years", "Travel", "Other"];

  return (
    <div className="space-y-2">
      <label className="font-semibold">Theme</label>
      <select
        className="border p-2 rounded w-full"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="">Select Theme</option>
        {themes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}
