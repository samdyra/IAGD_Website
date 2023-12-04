/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { type Dispatch } from "react";
import { type SetStateAction } from "react";
import Link from "next/link";
import kandidat1 from "../../public/kandidat1.png";
import kandidat2 from "../../public/kandidat2.png";
import Image from "next/image";

import { api } from "~/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { AnimatePresence, motion } from "framer-motion";

type Steps = "initial" | "verify" | "voting" | "success";
type HandleSetStep = (step: Steps) => void;

export default function Vote() {
  const [step, setStep] = useState<Steps>("initial");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectNum, setSelectNum] = useState(0);
  const voter = useState("");
  const phone = useState("");

  const voterToken = voter[0];
  const phoneNumber = phone[0];

  const { mutateAsync: vote } = api.vote.vote.useMutation({
    onSuccess: () => {
      toast.success("Anda berhasil memvote!");
      setIsModalVisible(false);
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

  const handleVoteCandidate = async () => {
    try {
      await vote({ voteNumber: selectNum, voterToken, phoneNumber });
      setStep("success");
    } catch {
      toast.error("Something Went Wrong!");
    }
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
      success: (
        <SuccessScreen
          phoneNumber={phoneNumber}
          voterToken={voterToken}
          voteNum={selectNum}
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
        Halo! Selamat Datang ke
        <span className="text-[#EA7227]"> Pemilu IAGD</span>
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <div
          className="flex max-w-xs flex-col gap-4 rounded-xl border-2 border-[#575757] bg-[#d2daf43f] p-4 text-gray-800 opacity-40 shadow-2xl hover:cursor-pointer hover:bg-[#a3b3e43f]"
          // onClick={() => handleSetStep("verify")}
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
        setPhoneNumber("");
        setVoterToken("");
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
    name: "M. Gunawan Raditya",
    num: 1,
    vision:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure?",
    img: kandidat1,
  },
  {
    name: "Hesekiel Sijabat",
    num: 2,
    vision:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure?",
    img: kandidat2,
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
                <Image
                  src={candidate.img}
                  alt="Profile Badge"
                  title="Profile Badge"
                  className="imgCustom2 relative z-10 mx-auto mt-2 h-[160px] w-[160px] overflow-hidden rounded-full border-2 object-cover"
                />
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
  callback: () => Promise<void>;
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
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
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

type Props = {
  phoneNumber: string;
  voterToken: string;
  voteNum: number;
};

function hideStringExceptLast3Digits(input: string): string {
  if (input.length < 3) {
    // If the input string is shorter than 3 characters, return it as is.
    return input;
  }

  const last3Digits = input.slice(-3); // Get the last 3 characters
  const hiddenPart = "*".repeat(input.length - 3); // Create a string of asterisks

  return hiddenPart + last3Digits;
}

const shareText =
  "Yuk, jangan lupa untuk menggunakan hak suaranya ya dalam Pemilu IAGD 2023. Berikan suaramu untuk menciptakan perubahan positif bersama-sama! https://www.iagd-itb.com/ ";

const SuccessScreen = ({ phoneNumber, voterToken, voteNum }: Props) => {
  return (
    <div className="bgp h-screen  w-screen overflow-scroll pb-24">
      <h1 className="pt-16 text-center text-4xl font-semibold text-white">
        Terima kasih Telah Memilih!
      </h1>
      <div className="mx-auto max-w-[385px] pt-12">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>

        <h1 className="pt-24 text-center text-2xl font-semibold text-white">
          Kamu telah berhasil memilih <br></br>Calon Nomor {voteNum}
        </h1>
        <div className="mt-12 flex justify-between px-8">
          <p className="w-fit text-lg  text-white">Notelp Pemilih</p>
          <p className="w-fit text-lg  text-white">
            {hideStringExceptLast3Digits(phoneNumber)}
          </p>
        </div>
        <div className="mt-1 flex justify-between px-8">
          <p className="w-fit text-lg  text-white">Voter Token</p>
          <p className="w-fit text-lg  text-white">
            {hideStringExceptLast3Digits(voterToken)}
          </p>
        </div>
        <div className="px-4 pt-20">
          <Link
            href={`whatsapp://send?text=${shareText}`}
            data-action="share/whatsapp/share"
          >
            <div className="tcp flex rounded-lg border bg-white px-2 py-2 font-semibold">
              <div className="w-[20%] pr-4">
                <WhatsappIcon />
              </div>
              <p className="">
                Ajak temanmu untuk ikut menggunakan suaranya di Pemilu IAGD!
              </p>
            </div>
          </Link>
          <Link href="/">
            <p className="mb-4 mt-4  rounded-lg border-2 border-white py-3 text-center text-lg font-semibold text-white">
              Kembali ke laman awal
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const WhatsappIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="40px"
    height="40px"
    clip-rule="evenodd"
  >
    <path
      fill="#fff"
      d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
    />
    <path
      fill="#fff"
      d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
    />
    <path
      fill="#cfd8dc"
      d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
    />
    <path
      fill="#40c351"
      d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
      clip-rule="evenodd"
    />
  </svg>
);
