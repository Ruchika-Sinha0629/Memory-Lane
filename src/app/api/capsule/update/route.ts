import Capsule from "@/models/Capsule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return new Response("Unauthorized", { status: 401 });

  const { id, title, content } = await req.json();

  const capsule = await Capsule.findById(id);
  if (!capsule)
    return new Response("Not found", { status: 404 });

  const canEdit =
    capsule.createdBy === session.user.email ||
    capsule.collaborators.includes(session.user.email);

  if (!canEdit)
    return new Response("Forbidden", { status: 403 });

  capsule.title = title;
  capsule.content = content;
  await capsule.save();

  return Response.json({ success: true });
}
