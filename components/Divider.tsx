export function Divider({ text }: { text: string }) {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow border-t-2 border-gray-500"></div>
      <span className="mx-2 text-xs font-light text-gray-500">{text}</span>
      <div className="flex-grow border-t-2 border-gray-500"></div>
    </div>
  );
}
