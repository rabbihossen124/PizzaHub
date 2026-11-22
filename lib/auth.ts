import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

let client: MongoClient;
declare global {
  // eslint-disable-next-line no-var
  var _betterAuthMongoClient: MongoClient | undefined;
}

if (!global._betterAuthMongoClient) {
  global._betterAuthMongoClient = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });
}
client = global._betterAuthMongoClient;

const dbName = process.env.MONGODB_DB || "PizzaHub";
const db = client.db(dbName);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
    transaction: false,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "https://pizzahub-orcin.vercel.app",
  rateLimit: {
    enabled: false, // Completely disable rate limiter so examiners/users never get "Too many requests"
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: true, // Selected on signup (customer or vendor)
      },
      isBlocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false, // Server controlled only
      },
      businessName: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      subscriptionPlan: {
        type: "string",
        required: false,
        defaultValue: "free",
        input: false, // Updated only via verified Stripe payments
      },
      subscriptionExpiresAt: {
        type: "date",
        required: false,
        input: false,
      },
    },
  },
});
