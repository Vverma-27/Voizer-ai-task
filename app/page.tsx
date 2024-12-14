import HomePage from "@/components/HomePage";
import RetellClient from "@/lib/retell";

export default async function Page() {
  const agents = await RetellClient.agent.list();
  const numbers = await RetellClient.phoneNumber.list();
  return <HomePage agents={agents} numbers={numbers} />;
}
// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
