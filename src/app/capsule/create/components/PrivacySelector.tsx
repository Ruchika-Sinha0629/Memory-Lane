"use client";

interface Props {
  privacy: "private" | "collaborators" | "public";
  setPrivacy: (value: "private" | "collaborators" | "public") => void;
}

export default function PrivacySelector({ privacy, setPrivacy }: Props) {
  return (
    <div className="space-y-1">
      <label className="font-semibold">Privacy</label>
      <select
        className="border p-2 rounded w-full"
        value={privacy}
        onChange={(e) =>
          setPrivacy(e.target.value as "private" | "collaborators" | "public")
        }
      >
        <option value="private">Private</option>
        <option value="collaborators">Collaborators</option>
        <option value="public">Public</option>
      </select>
    </div>
  );
}
