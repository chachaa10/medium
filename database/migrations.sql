CREATE TABLE
  "users" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "email_verified" BOOLEAN NOT NULL,
    "image" TEXT,
    "bio" TEXT,
    "avatar_url" VARCHAR(255),
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL
  );

CREATE TABLE
  "sessions" (
    "session_id" TEXT NOT NULL PRIMARY KEY,
    "expires_at" timestamptz NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamptz NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "user_id" TEXT NOT NULL REFERENCES "users" ("user_id") ON DELETE CASCADE
  );

CREATE TABLE
  "accounts" (
    "account_id" TEXT NOT NULL PRIMARY KEY,
    "provider_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "id_token" TEXT,
    "access_token_expires_at" timestamptz,
    "refresh_token_expires_at" timestamptz,
    "scope" TEXT,
    "password" TEXT,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamptz NOT NULL
  );

CREATE TABLE
  "verifications" (
    "verification_id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expires_at" timestamptz NOT NULL,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL
  );

CREATE TABLE
  Posts (
    post_id SERIAL PRIMARY KEY,
    author_id TEXT NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    content TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE,
    status VARCHAR(10) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMP
    WITH
      TIME ZONE,
      created_at TIMESTAMP
    WITH
      TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  Tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
  );

CREATE TABLE
  Post_Tags (
    post_tag_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES Posts (post_id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES Tags (tag_id) ON DELETE CASCADE,
    UNIQUE (post_id, tag_id)
  );

CREATE TABLE
  Claps (
    clap_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES Posts (post_id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE,
    COUNT SMALLINT NOT NULL CHECK (
      COUNT >= 1
      AND COUNT <= 50
    ),
    created_at TIMESTAMP
    WITH
      TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (post_id, user_id)
  );

CREATE TABLE
  Comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES Posts (post_id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE,
    parent_comment_id INTEGER REFERENCES Comments (comment_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP
    WITH
      TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  Follows (
    follow_id SERIAL PRIMARY KEY,
    follower_id TEXT NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE,
    followee_id TEXT NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE,
    UNIQUE (follower_id, followee_id),
    CHECK (follower_id != followee_id)
  );

CREATE TABLE
  Bookmarks (
    bookmark_id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES Posts (post_id) ON DELETE CASCADE,
    created_at TIMESTAMP
    WITH
      TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, post_id)
  );

CREATE INDEX idx_posts_author_id ON Posts (author_id);

CREATE INDEX idx_comments_post_id ON Comments (post_id);

CREATE INDEX idx_follows_follower_id ON Follows (follower_id);

CREATE INDEX idx_follows_followee_id ON Follows (followee_id);