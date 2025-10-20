CREATE TABLE
  "bookmarks" (
    "bookmark_id" text PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL,
    "post_id" text NOT NULL,
    "created_at" TIMESTAMP DEFAULT now () NOT NULL,
    CONSTRAINT "unique_bookmark_user_post" UNIQUE ("user_id", "post_id")
  );

--> statement-breakpoint
CREATE TABLE
  "claps" (
    "clap_id" text PRIMARY KEY NOT NULL,
    "post_id" text NOT NULL,
    "user_id" text NOT NULL,
    "clap_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP DEFAULT now () NOT NULL,
    CONSTRAINT "unique_clap_post_user" UNIQUE ("post_id", "user_id")
  );

--> statement-breakpoint
CREATE TABLE
  "comments" (
    "comment_id" text PRIMARY KEY NOT NULL,
    "post_id" text NOT NULL,
    "user_id" text NOT NULL,
    "parent_id" text,
    "content" text NOT NULL,
    "created_at" TIMESTAMP DEFAULT now () NOT NULL
  );

--> statement-breakpoint
CREATE TABLE
  "follows" (
    "follow_id" text PRIMARY KEY NOT NULL,
    "follower_id" text NOT NULL,
    "followee_id" text NOT NULL,
    CONSTRAINT "unique_follower_followee" UNIQUE ("follower_id", "followee_id")
  );

--> statement-breakpoint
CREATE TABLE
  "post_tags" (
    "id" text PRIMARY KEY NOT NULL,
    "post_id" text NOT NULL,
    "tag_id" text NOT NULL,
    CONSTRAINT "unique_post_tag" UNIQUE ("post_id", "tag_id")
  );

--> statement-breakpoint
CREATE TABLE
  "posts" (
    "post_id" text PRIMARY KEY NOT NULL,
    "author_id" text NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "subtitle" VARCHAR(255),
    "content" text NOT NULL,
    "slug" VARCHAR(255),
    "status" VARCHAR(10) DEFAULT 'draft' NOT NULL,
    "published_at" TIMESTAMP
    WITH
      TIME zone,
      "created_at" TIMESTAMP DEFAULT now () NOT NULL,
      "updated_at" TIMESTAMP DEFAULT now () NOT NULL,
      CONSTRAINT "posts_slug_unique" UNIQUE ("slug")
  );

--> statement-breakpoint
CREATE TABLE
  "tags" (
    "tag_id" text PRIMARY KEY NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    CONSTRAINT "tags_name_unique" UNIQUE ("name")
  );

--> statement-breakpoint
ALTER TABLE "account"
RENAME TO "accounts";

--> statement-breakpoint
ALTER TABLE "session"
RENAME TO "sessions";

--> statement-breakpoint
ALTER TABLE "user"
RENAME TO "users";

--> statement-breakpoint
ALTER TABLE "verification"
RENAME TO "verifications";

--> statement-breakpoint
ALTER TABLE "sessions"
DROP CONSTRAINT "session_token_unique";

--> statement-breakpoint
ALTER TABLE "users"
DROP CONSTRAINT "user_email_unique";

--> statement-breakpoint
ALTER TABLE "accounts"
DROP CONSTRAINT "account_user_id_user_id_fk";

--> statement-breakpoint
ALTER TABLE "sessions"
DROP CONSTRAINT "session_user_id_user_id_fk";

--> statement-breakpoint
ALTER TABLE "users"
ADD COLUMN "bio" text;

--> statement-breakpoint
ALTER TABLE "users"
ADD COLUMN "avatar_url" text;

--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("post_id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "claps" ADD CONSTRAINT "claps_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("post_id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "claps" ADD CONSTRAINT "claps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("post_id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_comments_comment_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."comments" ("comment_id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_users_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_followee_id_users_id_fk" FOREIGN KEY ("followee_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("post_id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_tags_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags" ("tag_id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
CREATE INDEX "idx_claps_post_id" ON "claps" USING btree ("post_id");

--> statement-breakpoint
CREATE INDEX "idx_claps_user_id" ON "claps" USING btree ("user_id");

--> statement-breakpoint
CREATE INDEX "idx_comments_post_id" ON "comments" USING btree ("post_id");

--> statement-breakpoint
CREATE INDEX "idx_comments_user_id" ON "comments" USING btree ("user_id");

--> statement-breakpoint
CREATE INDEX "idx_follows_follower_id" ON "follows" USING btree ("follower_id");

--> statement-breakpoint
CREATE INDEX "idx_follows_followee_id" ON "follows" USING btree ("followee_id");

--> statement-breakpoint
CREATE INDEX "idx_posts_author_id" ON "posts" USING btree ("author_id");

--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE NO action;

--> statement-breakpoint
CREATE UNIQUE INDEX "idx_users_email" ON "users" USING btree ("email");

--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_token_unique" UNIQUE ("token");

--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE ("email");