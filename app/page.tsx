import HomePage from "@/components/HomePage";
import RetellClient from "@/lib/retell";

export default async function Page() {
  const agents = await RetellClient.agent.list();
  const numbers = await RetellClient.phoneNumber.list();
  return <HomePage agents={agents} numbers={numbers} />;
}
