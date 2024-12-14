"use client";
export default function Message({
  content,
  role,
}: {
  content: string;
  role: "user" | "agent";
}) {
  if (!content) return null;
  return (
    <div
      className={`p-2 ${
        role === "user" ? "bg-gray-200" : "bg-green-300"
      } rounded-md shadow-sm`}
    >
      {content}
    </div>
  );
}
