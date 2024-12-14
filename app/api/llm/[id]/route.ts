import RetellClient from "@/lib/retell";
import { NextResponse } from "next/server";
import { LlmUpdateParams } from "retell-sdk/resources/llm.mjs";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    // Parse the JSON body
    const body: LlmUpdateParams = await req.json();

    // Perform any logic here, like saving to a database or processing data
    const result = await RetellClient.llm.update(id, body);

    // Return the response with a 200 status and the result
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // Handle errors gracefully
    return NextResponse.json(
      { receivedKey: "", receivedValue: "", message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;

    // Perform any logic here, like saving to a database or processing data
    const result = await RetellClient.llm.retrieve(id);

    // Return the response with a 200 status and the result
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // Handle errors gracefully
    return NextResponse.json(
      { receivedKey: "", receivedValue: "", message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
