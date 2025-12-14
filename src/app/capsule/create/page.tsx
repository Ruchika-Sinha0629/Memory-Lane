"use client";

import CapsuleForm from "@/components/CapsuleForm";
import { useSession } from "next-auth/react";

export default function CreateCapsulePage() {
  const { data: session } = useSession();

  if (!session?.user?.email) return <div>Please login first</div>;

  return (
    <div className="mt-10">
      <CapsuleForm userId={session.user.email} /> {/* pass creator */}
    </div>
  );
}
