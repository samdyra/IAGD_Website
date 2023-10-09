import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function Vote() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-100 via-[#b6bfcb] to-white">
        <main className="flex min-h-screen flex-col items-center justify-center bg-opacity-20 bg-[url('../../public/gridbg.png')]">
          <div className="flex shadow-md hover:cursor-pointer hover:opacity-75 hover:shadow-xl">
            <div className="rounded-l-xl border-2 border-black px-7 py-2">
              <h1 className="">Ready to vote?</h1>
            </div>
            <div className="bgp rounded-r-xl border-2 border-l-0 border-black px-7 py-2">
              <h1 className="">Click here!</h1>
            </div>
          </div>
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-5">
            <h1 className="max-w-4xl text-center text-5xl font-extrabold leading-tight tracking-tight text-gray-800	drop-shadow-2xl sm:text-[5rem]">
              Welcome Kamerads, to
              <span className="text-[#FF5C00]"> IAGD</span> Election
            </h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl border-2 border-[#575757] bg-[#d2daf43f] p-4 text-gray-800 shadow-2xl hover:bg-[#a3b3e43f]"
                href="/"
                target="_blank"
              >
                <h3 className="text-xl font-bold">
                  Haven&apos;t receive token yet? →
                </h3>
                <div className="text-lg">
                  Do you want to vote, but dont have voter token yet? Click here
                  to contact Felia!
                </div>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl border-2 border-[#FF5C00] bg-[#d2daf43f] p-4 text-gray-800 shadow-2xl  hover:bg-[#a3b3e43f]"
                href="/"
                target="_blank"
              >
                <h3 className="text-xl font-bold">Study the candidates →</h3>
                <div className="text-lg">
                  Learn more about all the candidates to make sure you chose the
                  best candidate.
                </div>
              </Link>
            </div>
          </div>
        </main>
        {/* <section className="flex h-[560px]  justify-center">
          <FormInputValidation />
        </section>
        <section className="flex h-[1024px] justify-center">
          <FormInputVoting />
        </section> */}
      </div>
    </>
  );
}

const FormInputValidation = () => {
  const [voterToken, setVoterToken] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const isFormInvalid = voterToken === "" || !phoneNumber;

  const { mutate, isLoading: isLoadingVerify } =
    api.vote.validateVoterToken.useMutation({
      onSuccess: () => {
        toast.success("Welcome!");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const handleClickVerify = () => {
    setVoterToken("");
    setPhoneNumber("");
    setIsChecked(false);

    mutate({ voterToken, phoneNumber });
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoterToken(event.currentTarget.value);
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <form className="w-screen ">
      <div className="mx-auto max-w-[520px] px-5  sm:w-[620px] md:w-[620px] lg:max-w-[920px]">
        <label className="mb-6 block text-2xl font-bold text-gray-900 dark:text-gray-800 md:mb-8 md:text-2xl lg:text-4xl">
          Please enter your phone number and voter token
        </label>
        <label className="text-md my-2 block font-semibold text-gray-900 dark:text-gray-800 md:text-lg ">
          Phone Number
        </label>
        <PhoneInput
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="text-md mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          defaultCountry="ID"
          international
          countryCallingCodeEditable={false}
        />
        <label className="text-md my-2 block font-semibold text-gray-900 dark:text-gray-800  md:text-lg ">
          Voter Token
        </label>
        <input
          onChange={handleTokenChange}
          value={voterToken}
          className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="voter token"
          type="password"
        />
        <div className="my-4 flex items-start justify-center align-middle">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="focus:ring-3 mt-[3px] h-5 w-5 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 sm:mt-[4px]"
          />
          <p className="ml-4  text-sm font-bold text-gray-900 dark:text-gray-300 md:text-lg">
            By checking this box, I sincerely declare that I am the rightful
            owner of this phone number and token.
          </p>
        </div>
        <button
          type="button"
          className={`text-md transition-duration: 150ms; rounded-lg px-5 py-2.5 text-center font-medium text-gray-800 hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto
          ${
            !isChecked || isLoadingVerify || isFormInvalid
              ? "bg-slate-400"
              : "bg-[#FF5C00]"
          }`}
          onClick={handleClickVerify}
          disabled={!isChecked || isLoadingVerify || isFormInvalid}
        >
          {isLoadingVerify ? "Loading..." : "Verify Token"}
        </button>
      </div>
    </form>
  );
};

const candidateExample = [
  {
    name: "Lionel Messi",
    num: 1,
    vision:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure?",
  },
  {
    name: "Cristiano Ronaldo",
    num: 2,
    vision:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure?",
  },
];

const FormInputVoting = () => {
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-semibold text-gray-800">
        Daftar Kandidat
      </h1>
      <div className="">
        {candidateExample.map((candidate, idx) => (
          <div key={idx} className="mb-6 text-center">
            <div className="h-[420px] w-[280px] rounded-3xl bg-white/10 p-5  text-gray-800 hover:bg-white/20">
              <div className="h-3/5 rounded-lg border-2">
                <UserPlaceholder />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserPlaceholder = () => (
  <div className="mt-6 flex justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width="150"
      height="150"
    >
      <path
        fill="#ccc"
        d="M 104.68731,56.689353 C 102.19435,80.640493 93.104981,97.26875 74.372196,97.26875 55.639402,97.26875 46.988823,82.308034 44.057005,57.289941 41.623314,34.938838 55.639402,15.800152 74.372196,15.800152 c 18.732785,0 32.451944,18.493971 30.315114,40.889201 z"
      />
      <path
        fill="#ccc"
        d="M 92.5675 89.6048 C 90.79484 93.47893 89.39893 102.4504 94.86478 106.9039 C 103.9375 114.2963 106.7064 116.4723 118.3117 118.9462 C 144.0432 124.4314 141.6492 138.1543 146.5244 149.2206 L 4.268444 149.1023 C 8.472223 138.6518 6.505799 124.7812 32.40051 118.387 C 41.80992 116.0635 45.66513 113.8823 53.58659 107.0158 C 58.52744 102.7329 57.52583 93.99267 56.43084 89.26926 C 52.49275 88.83011 94.1739 88.14054 92.5675 89.6048 z"
      />
    </svg>
  </div>
);
