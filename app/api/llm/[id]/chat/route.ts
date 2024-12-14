import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    // Parse the JSON body
    const body = await req.json();
    console.log("🚀 ~ body:", body);
    // Perform any logic here, like saving to a database or processing data
    const res = await fetch(
      `https://api.retellai.com/playground-completion/${id}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          authorization: `Bearer ${process.env.RETELL_CHAT_AUTHORIZATION_TOKEN}`,
          "content-type": "application/json",
          orgid: "org_FFOJcGlBi9tSuQjG",
        },
        body: JSON.stringify(body),
        method: "POST",
      }
    );
    console.log("🚀 ~ res:", res);
    const result = await res.json();
    console.log("🚀 ~ result:", result);

    // Return the response with a 200 status and the result
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    // Handle errors gracefully
    return NextResponse.json(
      { receivedKey: "", receivedValue: "", message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
