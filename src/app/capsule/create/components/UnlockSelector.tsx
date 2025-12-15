"use client";

interface UnlockSelectorProps {
  unlockDate: string;
  setUnlockDate: (date: string) => void;
}

export default function UnlockSelector({ unlockDate, setUnlockDate }: UnlockSelectorProps) {
  const localValue = unlockDate
    ? new Date(unlockDate).toISOString().slice(0, 16)
    : "";

  return (
    <div className="space-y-2">
      <input
        type="datetime-local"
        value={localValue}
        onChange={(e) => setUnlockDate(e.target.value)}
        className="border p-2 rounded w-full text-gray-700"
      />
    </div>
  );
}