"use server";

import { neon } from "@neondatabase/serverless";
import type { Post, PostCreate } from "../types/definitions";

const sql = neon(process.env.DATABASE_URL as string);

export async function getPosts(): Promise<Post[]> {
  try {
    const response = (await sql`SELECT * FROM posts`) as Post[];

    if (!response) {
      throw new Error("No posts found");
    }

    return response;
  } catch (error) {
    console.error("Database Error Fetching Posts:", error);
    throw new Error("Database Error");
  }
}

export async function getPostsById(postId: number): Promise<Post> {
  try {
    const response = (
      await sql`SELECT * FROM posts WHERE post_id = ${postId}`
    )[0] as Post;

    if (!response) {
      throw new Error(`Post ${postId} not found`);
    }

    return response;
  } catch (error) {
    console.error("Database Error Fetching Post:", error);
    throw new Error("Database Error Fetching Post");
  }
}

export async function createPost(post: PostCreate): Promise<Post> {
  try {
    const response = (
      await sql`
      INSERT 
      INTO 
      posts (author_id, title, subtitle, content, slug, status) 
      VALUES (${post.authorId}, ${post.title}, ${post.subtitle}, ${post.content}, ${post.slug}, ${post.status})`
    )[0] as Post;

    if (!response) {
      throw new Error("Error creating post");
    }

    return response;
  } catch (error) {
    console.error("Database Error Creating Post:", error);
    throw new Error("Database Error Creating Post");
  }
}

// export async function updatePost()

export async function deletePost(postId: number) {
  try {
    await sql`DELETE FROM posts WHERE post_id = ${postId}`;
  } catch (error) {
    console.error("Database Error Deleting Post:", error);
    throw new Error("Database Error Deleting Post");
  }
}
