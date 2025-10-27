import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getAuthorName(id: string) {
  try {
    const response = await db.select().from(users).where(eq(users.id, id));
    return response[0].name;
  } catch (error) {
    console.error("Database Error Fetching Author:", error);
    throw new Error("Database Error");
  }
}
