import Head from "next/head";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <header className="h-[667px] ">
        <div className="mt-[100px] ">
          <h2 className="tcs mb-2 text-center text-lg font-semibold">
            SELAMAT DATANG DI
          </h2>
          <h1 className="tcp mb-2 text-center text-3xl font-bold">
            Pemilu Ikatan Alumni Geodesi (IAGD) 2023
          </h1>
          <h2 className="tcp text-center font-semibold">
            Institut Teknologi Bandung
          </h2>
        </div>
        <div className="mx-auto mt-16 w-fit ">
          <button
            type="button"
            className="bgp mr-4 rounded-lg p-3 font-semibold text-white"
          >
            Vote Sekarang
          </button>
          <button
            type="button"
            className="rounded-lg border border-orange-600 p-3 font-semibold text-[#FF5C00]"
          >
            Lihat Kebawah
          </button>
        </div>
      </header>
    </>
  );
}

const Navbar = () => {
  return (
    <nav className="flex justify-between border-2 p-[16px]">
      <Image src={logo} width={113} alt="logo-iagd"></Image>
      <div className="bgp flex rounded-lg border px-3 align-middle">
        <button className="font-semibold text-white" type="button">
          Vote Sekarang
        </button>
      </div>
    </nav>
  );
};

const MiscIAGDIcon = () => {
  return (
    <svg
      width="188"
      height="111"
      viewBox="0 0 188 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M72.3098 74.218C72.3247 78.9585 71.4057 83.6555 69.6054 88.0409C67.805 92.4262 65.1586 96.414 61.8171 99.7765C58.4755 103.139 54.5045 105.811 50.1305 107.638C45.7566 109.466 41.0654 110.415 36.3249 110.43L36.2116 74.3314L72.3098 74.218Z"
        fill="#FF5C00"
      />
      <path
        d="M115.113 36.0983C115.098 40.8387 116.017 45.5357 117.818 49.9211C119.618 54.3064 122.265 58.2942 125.606 61.6568C128.948 65.0193 132.919 67.6908 137.293 69.5187C141.667 71.3465 146.358 72.295 151.098 72.3098L151.212 36.2116L115.113 36.0983Z"
        fill="#FF5C00"
      />
      <path
        d="M36.1133 72.3249C36.0984 67.5844 37.0173 62.8874 38.8177 58.5021C40.6181 54.1168 43.2645 50.129 46.606 46.7664C49.9475 43.4039 53.9186 40.7324 58.2926 38.9045C62.6665 37.0767 67.3577 36.1282 72.0982 36.1133L72.2115 72.2116L36.1133 72.3249Z"
        fill="#DDDED6"
      />
      <path
        d="M109.31 36.0983C109.325 40.8387 108.406 45.5357 106.605 49.9211C104.805 54.3064 102.159 58.2942 98.8171 61.6568C95.4755 65.0193 91.5045 67.6908 87.1305 69.5187C82.7566 71.3465 78.0654 72.295 73.3249 72.3098L73.2116 36.2116L109.31 36.0983Z"
        fill="#18229B"
      />
    </svg>
  );
};
