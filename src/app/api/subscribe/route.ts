import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const KIT_API_KEY = process.env.KIT_API_KEY;
  const KIT_FORM_ID = process.env.KIT_FORM_ID;

  if (!KIT_API_KEY || !KIT_FORM_ID) {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }

  const res = await fetch(`https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": KIT_API_KEY,
    },
    body: JSON.stringify({ email_address: email }),
  });

  if (!res.ok) return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  return NextResponse.json({ success: true });
}
