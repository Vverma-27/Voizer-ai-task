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
          authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InlKVUlHNGJoZjFETFhUVmRzMVk4UiJ9.eyJnaXZlbl9uYW1lIjoiVmloYWFuIiwiZmFtaWx5X25hbWUiOiJWZXJtYSIsIm5pY2tuYW1lIjoidnZlcm1hMjcwNzA1IiwibmFtZSI6IlZpaGFhbiBWZXJtYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLQXZwaFhfYXg3NjUxcnFJaTU0aXdya040RjJvYkJlUFlpVm9OelFUUWZhZ3M4ZVE9czk2LWMiLCJ1cGRhdGVkX2F0IjoiMjAyNC0xMi0xM1QxMTo0OTo0NC41MDNaIiwiZW1haWwiOiJ2dmVybWEyNzA3MDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vYXV0aC5yZXRlbGxhaS5jb20vIiwiYXVkIjoiTG9paTNYbEZiRXRnOUppazFMYkJaT2VZemEyMHJKYUYiLCJpYXQiOjE3MzQwOTA1ODcsImV4cCI6MTc3MDA5MDU4Nywic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTE4NjIyMDA2MzUxNDU2MDA2OTkiLCJzaWQiOiJpNTVUX21tOGlMUXk3Q19ySXhJbzd5cGo1bkI2MWlwOCIsIm5vbmNlIjoiZ2MwQ2l4T0tsdVBRVUlWTlhRMUcyNElHUFdidnUxR2tpQmJSVXdjVWZnayJ9.FI5a1T8y-wtNDSNFJnBFuWXrOVgYNj0jdHrS7Z5ewFiA7fSDeIESe6sJ7skkCjOKlivOMeAg6yVVo8gi8iwSeLmj4AkT9jwyGfhs6imVaIVfEUjN0VfyJjzKB0WQMZj8tWP3kEvSL0vD-YwjsYI6qiuFxoqYxWJYrehPV5Xn6Vz1fxG35Rgk-4tFAoJYJqGPqXd-NChH8ROdBHFkTd1IaNJHOJRDp1ia7OulvJFq4mvpeyxWkNyEuFU3lRAa1UlrMngnug1uMd-LvoU_LXdXvQawogJB9uOikfyQBQn1XgIIzoFIAaGiw_voWC-3JFTD62-TrtxjDsl09rtE9NJW6A",
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
