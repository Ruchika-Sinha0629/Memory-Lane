"use client";

import { useState } from "react";

interface RecipientInputProps {
  recipients: string[];
  setRecipients: (recipients: string[]) => void;
}

export default function RecipientInput({ recipients, setRecipients }: RecipientInputProps) {
  const [email, setEmail] = useState("");

  const addRecipient = () => {
    if (email && !recipients.includes(email)) {
      setRecipients([...recipients, email]);
      setEmail("");
    }
  };

  const removeRecipient = (emailToRemove: string) => {
    setRecipients(recipients.filter((r) => r !== emailToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="font-semibold">Recipients (emails)</label>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button type="button" onClick={addRecipient} className="bg-blue-500 text-white px-3 rounded">
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        {recipients.map((r) => (
          <span key={r} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1">
            {r}
            <button type="button" onClick={() => removeRecipient(r)} className="text-red-500 font-bold">
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
