import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";
export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    modelName: "users",
    fields: {
      emailVerified: "email_verified",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },

  session: {
    modelName: "sessions",
    fields: {
      createdAt: "created_at",
      expiresAt: "expires_at",
      userId: "user_id",
      ipAddress: "ip_address",
      updatedAt: "updated_at",
      userAgent: "user_agent",
    },
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },

  account: {
    modelName: "accounts",
    fields: {
      accessToken: "access_token",
      accessTokenExpiresAt: "access_token_expires_at",
      createdAt: "created_at",
      idToken: "id_token",
      providerId: "provider_id",
      accountId: "account_id",
      refreshToken: "refresh_token",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      updatedAt: "updated_at",
      userId: "user_id",
    },
  },

  verification: {
    modelName: "verifications",
    fields: {
      createdAt: "created_at",
      expiresAt: "expires_at",
      identifier: "identifier",
      updatedAt: "updated_at",
    },
  },

  plugins: [nextCookies()],
});
