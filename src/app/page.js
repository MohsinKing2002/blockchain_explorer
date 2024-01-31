"use client";
import Navbar from "@/components/Navbar";
import OverView from "@/components/OverView";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Index",
    selector: (row) => row.transaction_index,
    sortable: true,
  },
  {
    name: "Block",
    selector: (row) => row.block_number,
  },
  {
    name: "Date",
    selector: (row) => new Date(row.block_timestamp).toLocaleString(),
    sortable: true,
  },
  {
    name: "From Address",
    selector: (row) => row.from_address,
  },
  {
    name: "Amount (eth)",
    selector: (row) => (row.value / 10 ** 18).toFixed(5),
    sortable: true,
  },
  {
    name: "To Address",
    selector: (row) => row.to_address,
  },
];

const DataCard = ({ url, title, subtitle, value }) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full border border-gray-300"
            src={url}
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {title}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {subtitle}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {value}
        </div>
      </div>
    </li>
  );
};

const Loader = () => {
  return (
    <div className="text-center" role="status">
      <svg
        aria-hidden="true"
        className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState({});

  const fetchWalletData = async () => {
    try {
      if (address == "") return alert("Can't search empty address");
      setLoading(true);
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
        }),
      });
      const data = await res.json();
      setWalletData(data?.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("fetch err", error);
    }
  };

  useEffect(() => {
    let data = localStorage.getItem("fb_user");
    if (!data) router.push("/login");
    else {
      setUser(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen flex items-center justify-center flex-col py-8">
        <div className="flex items-center w-11/12 sm:w-[70%] md:w-1/2">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for a address..."
            required
          />
          <button
            onClick={fetchWalletData}
            disabled={loading}
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? (
              <Loader />
            ) : (
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            )}
            <span className="sr-only">Search</span>
          </button>
        </div>

        {Object.keys(walletData).length == 0 ? (
          <div className="w-11/12 sm:w-[70%] mt-4 flex items-center justify-evenly flex-wrap">
            <OverView
              imgUrl={
                "https://static.vecteezy.com/system/resources/previews/010/841/683/original/3d-illustration-ethereum-logo-png.png"
              }
              title={"ETHER PRICE"}
              value={"2238.90 $"}
              growth={"1.30%"}
            />
            <OverView
              imgUrl={
                "https://img.freepik.com/free-vector/digital-asset-nft-blockchain-technology-background_1017-41103.jpg"
              }
              title={"MARKET CAPTURE"}
              value={"281,0 Cr $"}
              growth={"50%"}
            />
            <OverView
              imgUrl={
                "https://media.istockphoto.com/id/1190369461/vector/golden-coin-with-star-vector-illustration.jpg?s=612x612&w=0&k=20&c=oiTaDaruWtNyUWlYlbc4Nojd3H2soyPWhWPeIc5EzPE="
              }
              title={"TRANSACTIONS"}
              value={"2,245 M"}
              growth={"5.30%"}
            />
            <OverView
              imgUrl={
                "https://zebpay.com/in/wp-content/uploads/2023/02/Group-15807.png"
              }
              title={"GAS PRICE"}
              value={"15 Gwei"}
              growth={"0.74 $"}
            />
          </div>
        ) : (
          <>
            <div className="mt-4 w-11/12 sm:w-[70%]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl leading-none text-gray-900 dark:text-white">
                  Wallet Overview
                </h5>
              </div>

              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <DataCard
                    url={
                      "https://static.vecteezy.com/system/resources/previews/010/841/683/original/3d-illustration-ethereum-logo-png.png"
                    }
                    title={"Balance"}
                    subtitle={"Etherium (eth)"}
                    value={(walletData?.balance / 10 ** 18)?.toFixed(4)}
                  />
                  <DataCard
                    url={
                      "https://img.freepik.com/free-vector/digital-asset-nft-blockchain-technology-background_1017-41103.jpg"
                    }
                    title={"NFT"}
                    subtitle={"No of transfers"}
                    value={walletData?.stats?.nft_transfers?.total}
                  />
                  <DataCard
                    url={
                      "https://media.istockphoto.com/id/1190369461/vector/golden-coin-with-star-vector-illustration.jpg?s=612x612&w=0&k=20&c=oiTaDaruWtNyUWlYlbc4Nojd3H2soyPWhWPeIc5EzPE="
                    }
                    title={"Token"}
                    subtitle={"No of transfers"}
                    value={walletData?.stats?.token_transfers?.total}
                  />
                  <DataCard
                    url={
                      "https://zebpay.com/in/wp-content/uploads/2023/02/Group-15807.png"
                    }
                    title={"Transaction"}
                    subtitle={"No of transactions"}
                    value={walletData?.stats?.transactions?.total}
                  />
                </ul>
              </div>
            </div>

            <div className="my-4 w-11/12 sm:w-[70%] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <DataTable
                title="Transactions"
                columns={columns}
                data={walletData?.transactions?.result}
                pagination
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
