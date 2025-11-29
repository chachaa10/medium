import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/app/data/users";
import { db } from "@/drizzle/db";
import { claps } from "@/drizzle/schema";

export async function getCountClaps(postId: string) {
  try {
    const session = await getCurrentUser();
    if (!session) throw new Error("Unauthorized");

    const response = await db
      .select()
      .from(claps)
      .where(eq(claps.postId, postId));
    if (!response || response.length === 0) return 0;

    return response[0].clapCount;
  } catch (error) {
    console.error("Database Error Fetching Claps:", error);
    throw new Error("Database Error");
  }
}

export async function clapPost(postId: string) {
  try {
    const session = await getCurrentUser();
    if (!session) throw new Error("Unauthorized");

    const response = await db
      .insert(claps)
      .values({ postId: postId, userId: session.user.id, clapCount: 1 });
    if (!response) throw new Error("Failed to clap post");

    return response;
  } catch (error) {
    console.error("Database Error Clapping Post:", error);
    throw new Error("Database Error");
  }
}
