"use server";

import { and, eq, isNull } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getAuthorName } from "@/app/data/authors";
import { getCurrentUser } from "@/app/data/users";
import type {
  Post,
  PostCreate,
  PostSoftDeleteRequest,
  PostUpdate,
} from "@/app/lib/types";
import { PostCreateSchema } from "@/app/lib/types/models";
import randomStringGenerator from "@/app/lib/utils/random-string-generator";
import { slugify } from "@/app/lib/utils/slugify";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema";

export async function getPosts(): Promise<Post[]> {
  try {
    const session = await getCurrentUser();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const response = await db
      .select()
      .from(posts)
      .where(isNull(posts.deletedAt));
    if (!response) throw new Error("No posts found");

    return response;
  } catch (error) {
    console.error("Database Error Fetching Posts:", error);
    throw new Error("Database Error");
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    const session = await getCurrentUser();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const response = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), isNull(posts.deletedAt)));
    if (response.length === 0) throw new Error("Post not found");

    return response[0];
  } catch (error) {
    console.error("Database Error Fetching Post by Slug:", error);
    throw new Error("Database Error");
  }
}

export async function createPost(data: Omit<PostCreate, "authorId" | "slug">) {
  let response: Post | undefined;
  try {
    const session = await getCurrentUser();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const slug = slugify(data.title);
    const validatedPost = PostCreateSchema.parse({
      ...data,
      authorId: session.user.id,
      slug: `${slug}-${randomStringGenerator(12)}`,
    });

    const result = await db.insert(posts).values(validatedPost).returning();
    if (!result[0]) throw new Error("Failed to create post");
    response = result[0];
  } catch (error) {
    console.error("Database Error Creating Post:", error);
    throw new Error("Database Error");
  }

  const author = await getAuthorName(response.authorId);
  const formattedAuthorName = author.replace(" ", "").toLowerCase();
  redirect(`/@${formattedAuthorName}/${response.slug}`);
}

export async function updatePost(data: PostUpdate) {
  try {
    const session = await getCurrentUser();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const response = await db
      .update(posts)
      .set(data)
      .where(and(eq(posts.id, data.id), eq(posts.authorId, session.user.id)));
    if (!response) throw new Error("Failed to update post");

    return response;
  } catch (error) {
    console.error("Database Error Updating Post:", error);
    throw new Error("Database Error");
  }
}

export async function softDeletePost(id: PostSoftDeleteRequest) {
  try {
    const session = await getCurrentUser();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const response = await db
      .update(posts)
      .set({ deletedAt: new Date() })
      .where(and(eq(posts.id, id.id), eq(posts.authorId, session.user.id)));
    if (!response) throw new Error("Failed to delete post");

    return response;
  } catch (error) {
    console.error("Database Error Deleting Post:", error);
    throw new Error("Database Error");
  }
}

export async function deletePost(id: string) {
  try {
    const session = await getCurrentUser();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const response = await db
      .delete(posts)
      .where(and(eq(posts.id, id), eq(posts.authorId, session.user.id)));
    if (!response) throw new Error("Failed to delete post");

    return response;
  } catch (error) {
    console.error("Database Error Deleting Post:", error);
    throw new Error("Database Error");
  }
}
