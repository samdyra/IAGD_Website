/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { type Dispatch } from "react";
import { type SetStateAction } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { api } from "~/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { AnimatePresence, motion } from "framer-motion";

type Steps = "initial" | "verify" | "voting";
type HandleSetStep = (step: Steps) => void;

export default function Vote() {
  const router = useRouter();
  const [step, setStep] = useState<Steps>("initial");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectNum, setSelectNum] = useState(0);
  const voter = useState("");
  const phone = useState("");

  const voterToken = voter[0];
  const phoneNumber = phone[0];

  const { mutate: vote } = api.vote.vote.useMutation({
    onSuccess: () => {
      toast.success("Anda berhasil memvote!");
      router.push("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSetStep = (step: Steps) => setStep(step);

  const handleSelectNum = (numCandidate: number) => {
    setSelectNum(numCandidate);
  };

  const handleToggleModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  const handleVoteCandidate = () => {
    vote({ voteNumber: selectNum, voterToken, phoneNumber });
  };

  const currentPage = (step: Steps) => {
    const availablePage: Record<Steps, React.ReactNode> = {
      initial: <WelcomingPage handleSetStep={handleSetStep} />,
      verify: (
        <FormInputValidation
          handleSetStep={handleSetStep}
          phone={phone}
          voter={voter}
        />
      ),
      voting: (
        <FormInputVoting
          handleSelectNum={handleSelectNum}
          selectNum={selectNum}
          handleToggleModal={handleToggleModal}
        />
      ),
    };

    return availablePage[step];
  };

  return (
    <>
      <Head>
        <title>IAGD ITB</title>
        <meta name="IAGD'S Website" content="Website Voting IAGD" />
        <link rel="icon" href="logomini.png" />
      </Head>
      <Modal
        handleHideModal={handleToggleModal}
        isModalVisible={isModalVisible}
        callback={handleVoteCandidate}
        chosenNum={selectNum}
      />
      <div className="bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-100 via-[#b6bfcb] to-white">
        <main className="flex min-h-screen flex-col items-center justify-center bg-opacity-20 bg-[url('../../public/gridbg.png')]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              {currentPage(step)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

type WelcomingProps = {
  handleSetStep: HandleSetStep;
};

const WelcomingPage = ({ handleSetStep }: WelcomingProps) => (
  <>
    <div className="container flex flex-col items-center justify-center px-4 py-5">
      <h1 className="mb-8 max-w-4xl text-center text-5xl font-extrabold leading-tight tracking-tight text-gray-800	drop-shadow-2xl sm:text-[5rem]">
        Selamat Datang Kamerads, ke
        <span className="text-[#EA7227]"> Pemilu IAGD</span>
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <div
          className="flex max-w-xs flex-col gap-4 rounded-xl border-2 border-[#575757] bg-[#d2daf43f] p-4 text-gray-800 shadow-2xl hover:bg-[#a3b3e43f]"
          onClick={() => handleSetStep("verify")}
        >
          <h3 className="text-xl font-bold">Lanjutkan Untuk Voting →</h3>
          <div className="text-lg">
            Pastikan anda telah menerima nomor telepon dan token voter untuk
            melanjutkan
          </div>
        </div>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl border-2 border-[#EA7227] bg-[#d2daf43f] p-4 text-gray-800 shadow-2xl  hover:bg-[#a3b3e43f]"
          href="/"
          target="_blank"
        >
          <h3 className="text-xl font-bold">Pelajari semua kandidat →</h3>
          <div className="text-lg">
            Pelajari masing-masing kandidat, agar kalian semakin yakin memilih
            kandidat yang anda inginkan!
          </div>
        </Link>
      </div>
    </div>
  </>
);

type ValidationProps = {
  handleSetStep: HandleSetStep;
  voter: [string, Dispatch<SetStateAction<string>>];
  phone: [string, Dispatch<SetStateAction<string>>];
};

const FormInputValidation = ({
  handleSetStep,
  phone,
  voter,
}: ValidationProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const [voterToken, setVoterToken] = voter;
  const [phoneNumber, setPhoneNumber] = phone;

  const isFormInvalid = voterToken === "" || !phoneNumber;

  const { mutate, isLoading: isLoadingVerify } =
    api.vote.validateVoterToken.useMutation({
      onSuccess: () => {
        toast.success("Welcome!");
        handleSetStep("voting");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const handleClickVerify = () => {
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
      <div className="mx-auto max-w-[520px] px-6  sm:w-[620px] md:w-[620px] lg:max-w-[920px]">
        <label className="mb-6 block text-2xl font-bold text-gray-900  md:mb-8 md:text-2xl lg:text-4xl">
          Masukan <span className="text-[#EA7227]">nomor telepon</span> dan{" "}
          <span className="text-[#EA7227]">voter token</span> anda!
        </label>
        <label className="text-md my-2 block font-semibold text-gray-900  md:text-lg ">
          Nomor Telepon
        </label>
        <PhoneInput
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="text-md mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          defaultCountry="ID"
          international
          countryCallingCodeEditable={false}
        />
        <label className="text-md my-2 block font-semibold text-gray-900   md:text-lg ">
          Voter Token
        </label>
        <input
          onChange={handleTokenChange}
          value={voterToken}
          className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="voter token"
          type="password"
        />
        <div className="my-4 flex items-start justify-center  ">
          <div className="mr-4 mt-[2px]">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="h-6 w-6"
            />
          </div>
          <p className="text-sm font-bold text-gray-900  md:text-lg">
            Dengan mencentang kotak ini, saya menyatakan bahwa saya adalah
            pemilik sah dari nomor telepon dan token ini.
          </p>
        </div>
        <button
          type="button"
          className={`text-md transition-duration: 150ms; rounded-lg px-5 py-2.5 text-center font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto
          ${
            !isChecked || isLoadingVerify || isFormInvalid
              ? "bg-slate-400"
              : "bg-[#EA7227]"
          }`}
          onClick={handleClickVerify}
          disabled={!isChecked || isLoadingVerify || isFormInvalid}
        >
          {isLoadingVerify ? "Loading..." : "Verifikasi Token"}
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

type FormProps = {
  handleToggleModal?: () => void;
  handleSelectNum: (num: number) => void;
  selectNum: number;
};

const FormInputVoting = ({
  handleToggleModal,
  handleSelectNum,
  selectNum,
}: FormProps) => {
  return (
    <>
      <div className="mb-36 mt-16 md:mt-8 lg:mt-16">
        <h1 className="mb-4 px-4 text-center text-3xl font-bold text-gray-800 md:text-4xl">
          Vote <span className="text-[#EA7227]">Kandidat</span> Pilihanmu!
        </h1>
        <div className="mx-auto mb-4 w-56 cursor-pointer rounded-lg border-2 border-[#EA7227] bg-[#d2daf43f] p-2 shadow-2xl hover:bg-[#a3b3e43f]">
          <Link href={"/"}>
            <h1 className="text-center  text-sm font-semibold text-gray-800">
              Belum yakin? Klik disini untuk mempelajari para kandidat
            </h1>
          </Link>
        </div>
        <div className="mt-8 md:flex md:gap-8 lg:gap-16">
          {candidateExample.map((candidate, idx) => {
            const isSelected = candidate.num === selectNum;

            return (
              <div
                className="mx-auto mb-6 aspect-[3/4] h-[420px] cursor-pointer rounded-3xl border-2 border-black bg-[#EA7227] p-5 text-gray-800 hover:opacity-80 md:h-[450px]"
                key={idx}
                onClick={() => handleSelectNum(candidate.num)}
              >
                <div className="absolute h-12 w-12 rounded-full border-4 border-black bg-white">
                  {isSelected && (
                    <h1 className="ml-1 text-3xl font-bold text-green-700">
                      ✓
                    </h1>
                  )}
                </div>
                <img
                  alt="user"
                  className="relative z-10 mx-auto mt-2 aspect-[1/1] h-[160px] overflow-hidden rounded-full border-2"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                ></img>
                <div className="relative -top-[40px] h-[250px] w-full rounded-lg   border-gray-800 bg-white px-5 pt-12 shadow-md backdrop-blur-md md:h-[280px]">
                  <h1 className="z-30 text-center text-lg  text-gray-900">
                    Nomor Urut {candidate.num}
                  </h1>
                  <h1 className="z-30 text-center text-lg font-bold text-gray-900 md:mt-4 md:text-2xl">
                    {candidate.name}
                  </h1>
                  <p className="z-30 mt-3 text-center  text-lg italic text-gray-900 md:text-xl">
                    &quot;{candidate.vision}&quot;
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-40 h-16 w-full  bg-white/30 shadow-md backdrop-blur-md" />
      <div
        className="fixed inset-x-0 bottom-8 z-40 mx-auto h-16 w-60 cursor-pointer rounded-lg bg-[#2e3486] hover:opacity-80"
        onClick={
          selectNum !== 0
            ? handleToggleModal
            : () => toast.error("Pilih Kandidat terlebih dahulu")
        }
      >
        <h1 className="mt-4 text-center text-lg font-bold text-white">
          {selectNum === 0
            ? "Klik salah satu kandidat"
            : `Konfirmasi Pilih Nomor ${selectNum}`}
        </h1>
      </div>
    </>
  );
};

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  callback: () => void;
  chosenNum: number;
}

function Modal({
  callback,
  chosenNum,
  handleHideModal,
  isModalVisible,
}: IProps) {
  return (
    <AnimatePresence>
      {isModalVisible ? (
        <>
          <div className="fixed z-50 h-screen w-screen  bg-white/30 backdrop-blur-md " />
          <div
            aria-hidden="true"
            className="fixed inset-x-0 top-[25%] z-50 mx-auto w-[320px] rounded-lg border-4 border-[#EA7227] md:w-[450px]"
          >
            <div className="relative rounded-lg bg-slate-200 shadow ">
              <div className="flex items-start justify-between rounded-t border-b px-6 pt-6">
                <h3 className="text-xl font-bold text-gray-900 ">Perhatian</h3>
                <button
                  onClick={handleHideModal}
                  type="button"
                  className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900  "
                  data-modal-hide="defaultModal"
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="space-y-6 p-6">
                <p className="text-xl font-bold leading-relaxed text-gray-900">
                  Anda Memilih Kandidat Nomor {chosenNum}
                </p>
                <p className="text-md font-medium leading-relaxed text-gray-900">
                  Keputusan ini tidak bisa diulang, pastikan anda sudah memilih
                  pilihan yang anda mau
                </p>
              </div>

              <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 ">
                <button
                  onClick={callback}
                  data-modal-hide="defaultModal"
                  type="button"
                  className="rounded-lg bg-[#EA7227] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
                >
                  Konfirmasi
                </button>
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  onClick={handleHideModal}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 "
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
