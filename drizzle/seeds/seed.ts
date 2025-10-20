import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../schema";

const db = drizzle(process.env.DATABASE_URL as string, { schema });

function uuid() {
  return crypto.randomUUID();
}

// Helper to generate a random date within a range
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Global arrays to hold generated data for linking relationships
let createdUsers: (typeof schema.users.$inferInsert)[] = [];
let createdPosts: (typeof schema.posts.$inferInsert)[] = [];
let createdTags: (typeof schema.tags.$inferInsert)[] = [];

// --- Data Generation Functions ---

function generateUsers(count: number): (typeof schema.users.$inferInsert)[] {
  const usersData = [];
  const avatars = ["AJ", "BS", "CK", "DL", "EM"];
  for (let i = 1; i <= count; i++) {
    const id = uuid();
    const name = `Blogger ${i}`;
    usersData.push({
      id: id,
      name: name,
      email: `user${i}@example.com`,
      emailVerified: i % 3 !== 0, // 2/3 verified
      bio: `This is the detailed bio for ${name}. They write about ${
        i % 2 === 0 ? "technology" : "lifestyle"
      }.`,
      avatarUrl: `https://placehold.co/150x150/${Math.floor(
        Math.random() * 16777215
      ).toString(16)}/ffffff?text=${avatars[i % avatars.length]}`,
    });
  }
  return usersData;
}

function generatePosts(
  count: number,
  users: (typeof schema.users.$inferInsert)[]
): (typeof schema.posts.$inferInsert)[] {
  const postsData = [];
  const titles = [
    "Drizzle ORM Deep Dive: Relations",
    "PostgreSQL Advanced Indexing",
    "Scaling Node.js Backends with Workers",
    "TypeScript Best Practices for Large Projects",
    "The Power of Common Table Expressions (CTEs)",
    "Next.js App Router Pitfalls",
    "Tailwind CSS from Zero to Hero",
    "Database Migration Strategies",
    "Event Sourcing and CQRS Basics",
    "Building Real-Time Apps with WebSockets",
  ];

  for (let i = 0; i < count; i++) {
    const title = titles[i % titles.length] + ` - Topic ${i}`;
    const author = users[i % users.length]; // Cycle authors
    const status: schema.PostStatus = i % 5 === 0 ? "draft" : "published";
    const publishedAt =
      status === "published"
        ? randomDate(new Date(2023, 0, 1), new Date())
        : undefined;

    postsData.push({
      postId: uuid(),
      authorId: author.id,
      title: title,
      subtitle: `An in-depth look at ${title.split(":")[0]}.`,
      content: `This is the comprehensive content for the post titled "${title}". It explores various aspects of modern software development and database design in detail. Reading time: ${
        Math.floor(Math.random() * 15) + 5
      } minutes.`,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 50),
      status: status,
      publishedAt: publishedAt,
    });
  }
  return postsData;
}

function generateTags(): (typeof schema.tags.$inferInsert)[] {
  return [
    { tagId: uuid(), name: "TypeScript" },
    { tagId: uuid(), name: "Drizzle" },
    { tagId: uuid(), name: "PostgreSQL" },
    { tagId: uuid(), name: "Backend" },
    { tagId: uuid(), name: "Frontend" },
    { tagId: uuid(), name: "Scaling" },
    { tagId: uuid(), name: "CSS" },
  ];
}

// --- Main Seeding Logic ---

async function seedDatabase() {
  console.log("Starting large scale database seeding...");

  // Define scale
  const NUM_USERS = 8;
  const NUM_POSTS = 25; // 25 total posts
  const NUM_TAGS = 7;
  const CLAPS_PER_POST_RANGE = 10;
  const COMMENTS_PER_POST_RANGE = 5;
  const FOLLOWS_COUNT = 15;
  const BOOKMARKS_COUNT = 12;

  // 1. Generate Data in memory
  createdUsers = generateUsers(NUM_USERS);
  createdPosts = generatePosts(NUM_POSTS, createdUsers);
  createdTags = generateTags();

  // Quick check for existing data using the first user's email
  const existingUserCheck = await db.query.users.findFirst({
    where: eq(schema.users.email, createdUsers[0].email),
  });

  if (existingUserCheck) {
    console.log(
      "Mock data seems to already exist (based on email check). Skipping insertion."
    );
    return;
  }

  try {
    // --- Insert Mock Users ---
    await db.insert(schema.users).values(createdUsers);
    console.log(`Inserted ${NUM_USERS} mock users.`);

    // --- Insert Mock Posts ---
    await db.insert(schema.posts).values(createdPosts);
    console.log(`Inserted ${NUM_POSTS} mock posts.`);

    // --- Insert Mock Tags ---
    await db.insert(schema.tags).values(createdTags);
    console.log(`Inserted ${NUM_TAGS} mock tags.`);

    // --- Insert Post Tags (Many-to-Many) ---
    const postTagsData: (typeof schema.postTags.$inferInsert)[] = [];
    createdPosts.forEach((post, index) => {
      // Each post gets 1 to 3 random tags
      const numTags = Math.floor(Math.random() * 3) + 1;
      const tagIndices = new Set<number>();
      while (tagIndices.size < numTags) {
        tagIndices.add(Math.floor(Math.random() * createdTags.length));
      }

      tagIndices.forEach((tagIndex) => {
        postTagsData.push({
          id: uuid(),
          postId: post.postId,
          tagId: createdTags[tagIndex].tagId,
        });
      });
    });
    // Filter out duplicates based on postId and tagId before insertion (although Drizzle should handle this if the constraint is set)
    const uniquePostTags = Array.from(
      new Set(postTagsData.map((pt) => `${pt.postId}-${pt.tagId}`))
    ).map(
      (key) => postTagsData.find((pt) => `${pt.postId}-${pt.tagId}` === key)!
    );

    await db.insert(schema.postTags).values(uniquePostTags);
    console.log(`Inserted ${uniquePostTags.length} unique post-tag relations.`);

    // --- Insert Claps ---
    const clapsData: (typeof schema.claps.$inferInsert)[] = [];
    createdPosts
      .filter((p) => p.status === "published")
      .forEach((post) => {
        const numClappers = Math.floor(Math.random() * CLAPS_PER_POST_RANGE);
        const clapperIndices = new Set<number>();
        while (clapperIndices.size < numClappers) {
          clapperIndices.add(Math.floor(Math.random() * createdUsers.length));
        }

        clapperIndices.forEach((userIndex) => {
          clapsData.push({
            clapId: uuid(),
            postId: post.postId,
            userId: createdUsers[userIndex].id,
            clapCount: Math.floor(Math.random() * 50) + 1, // 1 to 50 claps
          });
        });
      });
    await db.insert(schema.claps).values(clapsData);
    console.log(`Inserted ${clapsData.length} claps.`);

    // --- Insert Comments ---
    const commentsData: (typeof schema.comments.$inferInsert)[] = [];
    const publishedPosts = createdPosts.filter((p) => p.status === "published");

    publishedPosts.forEach((post) => {
      const numComments =
        Math.floor(Math.random() * COMMENTS_PER_POST_RANGE) + 1; // 1 to 5 comments
      let parentId: string | undefined;

      for (let i = 0; i < numComments; i++) {
        const commentId = uuid();
        const commentUser =
          createdUsers[Math.floor(Math.random() * createdUsers.length)];
        const content =
          i === 0
            ? "Excellent analysis on this topic!"
            : i === 1
            ? "I have a question about the final section, could you elaborate?"
            : "Thanks for sharing this, it was very helpful.";

        commentsData.push({
          commentId: commentId,
          postId: post.postId,
          userId: commentUser.id,
          content: content,
          parentId: i > 0 && Math.random() < 0.3 ? parentId : undefined, // ~30% chance for a reply
        });
        if (i === 0) {
          parentId = commentId; // Set the first comment as a potential parent for replies
        }
      }
    });
    await db.insert(schema.comments).values(commentsData);
    console.log(`Inserted ${commentsData.length} comments.`);

    // --- Insert Follows ---
    const followsData: (typeof schema.follows.$inferInsert)[] = [];
    while (followsData.length < FOLLOWS_COUNT) {
      const follower = createdUsers[Math.floor(Math.random() * NUM_USERS)];
      const followee = createdUsers[Math.floor(Math.random() * NUM_USERS)];

      // Prevent self-follow and duplicate follow
      if (
        follower.id !== followee.id &&
        !followsData.find(
          (f) => f.followerId === follower.id && f.followeeId === followee.id
        )
      ) {
        followsData.push({
          followId: uuid(),
          followerId: follower.id,
          followeeId: followee.id,
        });
      }
    }
    await db.insert(schema.follows).values(followsData);
    console.log(`Inserted ${followsData.length} follow relations.`);

    // --- Insert Bookmarks ---
    const bookmarksData: (typeof schema.bookmarks.$inferInsert)[] = [];
    while (bookmarksData.length < BOOKMARKS_COUNT) {
      const user = createdUsers[Math.floor(Math.random() * NUM_USERS)];
      const post =
        publishedPosts[Math.floor(Math.random() * publishedPosts.length)];

      // Prevent duplicate bookmark
      if (
        !bookmarksData.find(
          (b) => b.userId === user.id && b.postId === post.postId
        )
      ) {
        bookmarksData.push({
          bookmarkId: uuid(),
          userId: user.id,
          postId: post.postId,
        });
      }
    }
    await db.insert(schema.bookmarks).values(bookmarksData);
    console.log(`Inserted ${bookmarksData.length} bookmarks.`);

    console.log("Large scale database seeding complete!");
  } catch (error) {
    console.error("Database seeding failed:", error);
  } finally {
    // await pool.end();
  }
}

// Example usage of the seeding function (uncomment to run in a script)
seedDatabase();
