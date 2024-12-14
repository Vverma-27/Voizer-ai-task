import RetellClient from "@/lib/retell";
import { NextResponse } from "next/server";
import {
  CallCreatePhoneCallParams,
  PhoneCallResponse,
} from "retell-sdk/resources/call.mjs";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Parse the JSON body
    const body: CallCreatePhoneCallParams = await req.json();

    // Perform any logic here, like saving to a database or processing data
    const result: PhoneCallResponse = await RetellClient.call.createPhoneCall(
      body
    );

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
