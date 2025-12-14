"use client";

interface UnlockSelectorProps {
  unlockDate: string;
  setUnlockDate: (date: string) => void;
}

export default function UnlockSelector({ unlockDate, setUnlockDate }: UnlockSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="font-semibold">Unlock Date</label>
      <input
        type="datetime-local"
        value={unlockDate}
        onChange={(e) => setUnlockDate(e.target.value)}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
