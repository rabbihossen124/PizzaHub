import { auth, ensureAuthDbConnected } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth.handler);

export async function GET(req: NextRequest) {
  try {
    await ensureAuthDbConnected();
    return await handler.GET(req);
  } catch (err) {
    console.error("[BetterAuth GET Error]:", err);
    return NextResponse.json(
      {
        error: "Authentication service error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureAuthDbConnected();
    return await handler.POST(req);
  } catch (err) {
    console.error("[BetterAuth POST Error]:", err);
    return NextResponse.json(
      {
        error: "Authentication service error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
