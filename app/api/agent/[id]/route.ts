import RetellClient from "@/lib/retell";
import { NextResponse } from "next/server";
import {
  AgentResponse,
  AgentUpdateParams,
} from "retell-sdk/resources/agent.mjs";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    // Parse the JSON body
    const body: AgentUpdateParams = await req.json();

    // Perform any logic here, like saving to a database or processing data
    const result: AgentResponse = await RetellClient.agent.update(id, body);

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
