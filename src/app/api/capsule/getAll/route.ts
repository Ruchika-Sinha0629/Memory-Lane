import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";

export async function GET(req: Request) {
  await dbConnect();

  const url = new URL(req.url);
  const user = url.searchParams.get("user");

  if (!user) return new Response("User email is required", { status: 400 });

  const capsules = await Capsule.find({
    $or: [{ createdBy: user }, { collaborators: user }],
  }).sort({ unlockDate: -1 });

  return new Response(JSON.stringify({ capsules }));
}
