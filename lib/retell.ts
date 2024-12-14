import Retell from "retell-sdk";

const RetellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY || "",
});

export default RetellClient;
