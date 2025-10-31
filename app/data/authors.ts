import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";

export async function getAuthorName(foreignKey: string) {
  try {
    const response = await db
      .select()
      .from(users)
      .where(eq(users.id, foreignKey));
    if (!response) throw new Error("Author not found");
    return response[0].name;
  } catch (error) {
    console.error("Database Error Fetching Author:", error);
    throw new Error("Database Error");
  }
}

export async function getAuthorId(foreignKey: string) {
  try {
    const response = await db
      .select()
      .from(users)
      .where(eq(users.id, foreignKey));

    if (response.length === 0) throw new Error("Author not found");

    return response[0].id;
  } catch (error) {
    console.error("Database Error Fetching Author:", error);
    throw new Error("Database Error");
  }
}
