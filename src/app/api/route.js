import Moralis from "moralis";

export async function POST(req) {
  const body = await req.json();

  await Moralis.start({
    apiKey: process.env.NEXT_PUBLIC_Moralis,
  });

  //fetch wallet balance
  const response = await Moralis.EvmApi.balance.getNativeBalance({
    chain: "0x1",
    address: body?.address,
  });
  let result = response.raw;

  //fetch wallet stats
  const stats = await Moralis.EvmApi.wallets.getWalletStats({
    chain: "0x1",
    address: body?.address,
  });

  //fetch wallet transactions
  const transactions = await Moralis.EvmApi.transaction.getWalletTransactions({
    chain: "0x1",
    address: body?.address,
  });

  result = { ...result, stats, transactions };

  return Response.json({ result });
}
