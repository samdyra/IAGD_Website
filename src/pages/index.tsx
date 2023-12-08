/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import logo from "../../public/logo.png";
import phone from "../../public/Phone.png";

import Link from "next/link";
import {
  sambutan,
  paragraph1,
  paragraph10,
  paragraph11,
  paragraph2,
  paragraph3,
  paragraph4,
  paragraph5,
  paragraph6,
  paragraph7,
  paragraph8,
  paragraph9,
} from "~/utils/wordings";
import { type StaticImageData } from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState({
    isVisible: false,
    candidate: 1,
  });
  const { push } = useRouter();

  const navigate = () => {
    push("/vote").catch(() => console.error("Something Went Wrong"));
  };

  const handleToggleModal = () => {
    setIsModalVisible({ isVisible: false, candidate: 0 });
  };

  return (
    <>
      <Modal
        handleHideModal={handleToggleModal}
        canNum={isModalVisible.candidate}
        isModalVisible={isModalVisible.isVisible}
      />
      <Head>
        <title>IAGD ITB</title>
        <meta name="IAGD'S Website" content="Website Voting IAGD" />
        <link rel="icon" href="logomini.png" />
      </Head>
      <Navbar />

      <div className="bgnew relative h-[720px] rounded-b-[50px]">
        <MiscIAGDIcon />
        <div className="mt-[100px] sm:mt-[100px] ">
          <div
            className="mx-auto  mb-4 flex  w-fit  hover:cursor-pointer hover:opacity-75 hover:shadow-xl"
            onClick={navigate}
          >
            <div className="rounded-l-xl border-2 border-black px-5 py-1 md:px-7 md:py-2">
              <h1 className="font-semibold ">Segera vote dengan</h1>
            </div>
            <div className="bgp rounded-r-xl border-2 border-l-0 border-black px-5 py-1 md:px-7 md:py-2">
              <h1 className="font-semibold ">Klik disini!</h1>
            </div>
          </div>

          <h1 className=" mx-auto mb-2 max-w-[1120px]  px-4 text-center text-4xl font-extrabold leading-tight drop-shadow-md md:text-[3rem] lg:text-[4rem]">
            Pemilu <span className="gt">Ikatan Alumni Geodesi </span>
            (IAGD) 2023
          </h1>
          <h2 className="text-center text-xl font-semibold text-gray-700 sm:text-2xl">
            Institut Teknologi Bandung
          </h2>
        </div>
        <div
          className="absolute bottom-10 left-0 right-0 m-auto cursor-pointer"
          onClick={() =>
            window.scroll({
              top: window.scrollY + 920,
              behavior: "smooth",
            })
          }
        >
          <div id="scroll-down-animation">
            <span className="mouse">
              <span className="move"></span>
            </span>
          </div>
          <h2 className="mt-3 text-center font-semibold text-gray-700">
            Scroll down
          </h2>
        </div>

        <div className="absolute  bottom-0 right-0 rotate-180">
          <MiscIAGDIcon />
        </div>
      </div>

      <MilestoneElement />
      <div className="container mx-auto sm:mb-32">
        <h2 className="tcs pt-8 text-center text-2xl font-semibold sm:text-3xl ">
          Sambutan Ketua Umum IAGD <br /> 2020-2023
        </h2>
        <CardComponent
          description={cardData.body}
          badge={cardData.badge}
          heading={cardData.heading}
          subheading={cardData.subheading}
        />
      </div>
      <h2 className="tcs mx-auto max-w-[620px] px-4 pt-6 text-center text-2xl font-semibold sm:text-3xl">
        Daftar Calon Kandidat Ketua Umum IAGD 2023
      </h2>

      <div className="relative ">
        <div className="mx-auto my-16 max-w-[1024px] xl:mt-10 xl:flex xl:gap-7">
          <ProfileCard
            details={{
              pendidikan: "S1 Teknik Geodesi dan Geomatika (2005-2011)",
              ttl: "Palembang, 4 Desember 1986",
              work: "Koordinator Pelaksana Internal SHG (PT. Solusi Energy Nusantara)",
            }}
            badge={cardData2.badge}
            heading="M. Gunawan Raditya"
            subheading="Kandidat Nomor 1"
            image={<ImageCandidate1 />}
            imageURLs={[]}
            setOpenModal={() =>
              setIsModalVisible((prev) => {
                return {
                  isVisible: !prev.isVisible,
                  candidate: 1,
                };
              })
            }
          />
          <ProfileCard
            details={{
              pendidikan: "S1 Teknik Geodesi dan Geomatika (1994-2001)",
              ttl: "Batusangkar, 19 Mei 1975",
              work: "Kepala Kantor Pertahanan Kabupaten Cirebon BPN",
            }}
            badge={cardData2.badge}
            heading="Hesekiel Sijabat"
            subheading="Kandidat Nomor 2"
            image={<ImageCandidate2 />}
            imageURLs={[]}
            setOpenModal={() =>
              setIsModalVisible((prev) => {
                return {
                  isVisible: !prev.isVisible,
                  candidate: 2,
                };
              })
            }
          />
        </div>
      </div>

      <div className="mt-20  sm:mb-32">
        <h2 className="tcs mx-auto max-w-[620px] pt-6 text-center text-2xl font-semibold sm:text-3xl">
          Galeri Foto IAGD
        </h2>
        <div className="container mx-auto  my-12 gap-4 sm:flex sm:justify-between">
          <Splide
            options={{
              type: "loop",
              rewind: true,
              pagination: false,
              breakpoints: {
                2000: {
                  perPage: 4,
                  gap: 20,
                },
                1200: {
                  perPage: 3,
                  gap: 20,
                  width: 1100,
                },
                1018: {
                  perPage: 2,
                  gap: 0,
                  width: 1000,
                },
                640: {
                  perPage: 1,
                  gap: 0,
                },
              },
            }}
            aria-label="React Splide Example"
            className="splide mx-auto flex w-full justify-center "
          >
            <SplideSlide className="flex w-full justify-center ">
              <ImageCard url="https://firebasestorage.googleapis.com/v0/b/tugasakhir-6cc8d.appspot.com/o/iagd1.jpeg?alt=media&token=811bd23f-f058-43bc-a1fa-6761f3179af9" />
            </SplideSlide>
            <SplideSlide className="flex w-full justify-center ">
              <ImageCard url="https://firebasestorage.googleapis.com/v0/b/tugasakhir-6cc8d.appspot.com/o/iagd2.jpeg?alt=media&token=486d44e2-1bbe-44ca-bc3d-ab8cba7dc734" />
            </SplideSlide>
            <SplideSlide className="flex w-full justify-center ">
              <ImageCard url="https://firebasestorage.googleapis.com/v0/b/tugasakhir-6cc8d.appspot.com/o/iagd3.jpeg?alt=media&token=a2f4b7f1-2f7b-48e0-9b5b-eaa0367ce796" />
            </SplideSlide>
            <SplideSlide className="flex w-full justify-center ">
              <ImageCard url="https://firebasestorage.googleapis.com/v0/b/tugasakhir-6cc8d.appspot.com/o/iagd4.jpeg?alt=media&token=c5781dc5-47ea-4fde-80ed-6a9f36123a56" />
            </SplideSlide>
            <SplideSlide className="flex w-full justify-center ">
              <ImageCard url="https://firebasestorage.googleapis.com/v0/b/tugasakhir-6cc8d.appspot.com/o/iagd5.jpeg?alt=media&token=6e3b8f64-fb6c-4993-84cf-e30e1ed6f8d4" />
            </SplideSlide>
            <SplideSlide className="flex w-full justify-center ">
              <ImageCard url="https://firebasestorage.googleapis.com/v0/b/tugasakhir-6cc8d.appspot.com/o/iagd6.jpeg?alt=media&token=57d1a4d6-812f-4012-a8a4-b35451a85c6c" />
            </SplideSlide>
            <SplideSlide className="flex w-full justify-center ">
              <ImageCard url="https://firebasestorage.googleapis.com/v0/b/tugasakhir-6cc8d.appspot.com/o/iagd7.jpeg?alt=media&token=7353939d-89a4-4f61-ac69-78b4f73affb8" />
            </SplideSlide>
            <SplideSlide className="flex w-full justify-center ">
              <ImageCard url="https://firebasestorage.googleapis.com/v0/b/tugasakhir-6cc8d.appspot.com/o/iagd8.jpeg?alt=media&token=243dfd81-db99-4dad-8445-c565c28da58c" />
            </SplideSlide>
          </Splide>
        </div>
      </div>
      <div className="container mx-auto   mt-32 flex  flex-col-reverse gap-4 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center justify-center sm:w-2/5 ">
          <Image
            src={phone}
            alt="phone"
            width={100}
            height={100}
            className="h-full w-auto sm:mx-auto"
          />
        </div>
        <div className="w-full sm:w-3/5">
          <div className="tcs mb-4    p-8 pt-24 text-center  sm:text-left">
            <h2 className=" mb-8 text-4xl font-bold sm:text-6xl ">
              AYO MEMILIH!
            </h2>
            <p className="text-base sm:text-lg ">
              Mari berpartisipasi dalam pemilu IAGD! Pastikan Anda mendaftar
              sebagai pemilih dan berikan suara Anda untuk masa depan yang lebih
              baik. Suara Anda adalah kekuatan untuk perubahan positif kepada
              IAGD
            </p>

            <Link href="/vote">
              <button className="bgp  mx-auto  mt-14 rounded-md px-14 py-4 text-white hover:bg-orange-500 hover:text-white sm:mr-4">
                Vote Sekarang
              </button>
            </Link>
            {/* <Link href="https://bit.ly/BerkasPemiluIAGD2023">
              <button className="bgp  mx-auto  mt-14 rounded-md px-14 py-4 text-white hover:bg-orange-500 hover:text-white sm:mr-4">
                Daftar Sebagai Calon Ketua
              </button>
            </Link>
            <Link href="https://forms.gle/F7i16CPTEgLYfRRd8">
              <button className="bgs mx-auto mt-4 rounded-md px-14 py-4 text-white hover:bg-blue-950 hover:text-white">
                Daftar Sebagai Pemilih
              </button>
            </Link> */}
          </div>
        </div>
      </div>

      <div className="bgp h-max w-full p-4">
        <div className="container mx-auto h-full">
          <div className=" flex w-full items-center justify-between border-b border-b-white  py-12">
            <div className="rounded-lg bg-white p-1">
              <Image src={logo} width={113} alt="logo-iagd"></Image>
            </div>
            {/* <Link href="/vote">
              <button
                className="tcp flex rounded-lg border bg-white p-4   align-middle font-semibold"
                type="button"
              >
                0821893897 (Amal)
              </button>
            </Link> */}
          </div>

          <div className=" flex w-full flex-col items-center justify-between pt-4 text-white  sm:flex-row">
            <p className="text-xs ">IAGD ITB @ 2023. All rights reserved.</p>
            <div className="my-6 flex items-center justify-center gap-6">
              <a
                className="text-white hover:text-blue-600"
                aria-label="Visit TrendyMinds Facebook"
                href=""
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="h-6"
                >
                  <path
                    fill="currentColor"
                    d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  ></path>
                </svg>
              </a>
              <a
                className="text-white hover:text-blue-600"
                aria-label="Visit TrendyMinds Instagram"
                href=""
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-6"
                >
                  <path
                    fill="currentColor"
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ImageCandidate1 = () => {
  return (
    <img
      src="https://firebasestorage.googleapis.com/v0/b/tugasakhir-6cc8d.appspot.com/o/kandidat1.png?alt=media&token=65b3c922-f056-4ea0-b044-c059b01f1ebc"
      alt="Profile Badge"
      title="Profile Badge"
      className="imgCustom1 relative h-[220px] w-full rounded-t-lg border-2 object-cover"
    />
  );
};

const ImageCandidate2 = () => {
  return (
    <img
      src="https://firebasestorage.googleapis.com/v0/b/tugasakhir-6cc8d.appspot.com/o/kandidat2.png?alt=media&token=6aec5bf0-2475-4213-bc2d-260c23b981fe"
      alt="Profile Badge"
      title="Profile Badge"
      className="imgCustom2 relative h-[220px] w-full rounded-t-lg border-2 object-cover"
    />
  );
};

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState({
    isOpened: false,
    style: "burgerbar",
  });

  const handleToggleNavbar = () => {
    setIsNavbarOpen({
      isOpened: isNavbarOpen.isOpened ? false : true,
      style: isNavbarOpen.isOpened ? "burgerbar" : "burgerbar2",
    });
  };

  return (
    <div className="border-b-2">
      <nav className="flex items-center justify-between  border-b-2 p-[16px] sm:px-16 ">
        <Image src={logo} width={113} alt="logo-iagd"></Image>
        <div className="burgermenu md:hidden" onClick={handleToggleNavbar}>
          <div className={isNavbarOpen.style}></div>
          <div className={isNavbarOpen.style}></div>
          <div className={isNavbarOpen.style}></div>
        </div>
        {/* <Link href="/vote">
          <div className="bgp hidden rounded-lg border p-3 align-middle md:flex">
            <button className="font-semibold text-white" type="button">
              Vote Sekarang
            </button>
          </div>
        </Link> */}

        <div className="hidden gap-4 md:flex">
          <Link href="/vote" className="hidden sm:block">
            <div className="bgp flex rounded-lg border p-3 align-middle">
              <button className="font-semibold text-white" type="button">
                Vote Sekarang
              </button>
            </div>
          </Link>
          <Link href="https://drive.google.com/drive/folders/18FotyyO2xg2BOaGTMy-n4bIapJjBpbWU">
            <div className="bgs flex rounded-lg border p-3 align-middle">
              <button className="font-semibold text-white" type="button">
                Daftar Pemilih
              </button>
            </div>
          </Link>
        </div>
      </nav>
      {isNavbarOpen.isOpened && (
        <div className="top-22 h-30 z-50 w-full p-4 ">
          <Link href="/vote">
            <p className="tcp text-md mb-2 w-fit cursor-pointer border-b border-[#EA7227] font-semibold text-white focus:opacity-75">
              • Klik disini untuk melakukan voting
            </p>
          </Link>
          <Link href="https://drive.google.com/drive/folders/18FotyyO2xg2BOaGTMy-n4bIapJjBpbWU">
            <p className=" tcp text-md w-fit cursor-pointer border-b border-[#EA7227] font-semibold text-white focus:opacity-75">
              • Klik disini untuk melihat daftar pemilih
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

const MiscIAGDIcon = () => {
  return (
    <svg
      width="113"
      height="75"
      viewBox="0 0 113 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M76.1134 -7.74027e-06C76.0985 4.74048 77.0175 9.43748 78.8179 13.8228C80.6182 18.2082 83.2647 22.1959 86.6062 25.5585C89.9477 28.9211 93.9188 31.5925 98.2928 33.4204C102.667 35.2483 107.358 36.1967 112.098 36.2116L112.212 0.113342L76.1134 -7.74027e-06Z"
        fill="#EA7227"
      />
      <path
        d="M74.0982 -7.74027e-06C74.1131 4.74048 73.1942 9.43748 71.3938 13.8228C69.5935 18.2082 66.947 22.1959 63.6055 25.5585C60.264 28.9211 56.2929 31.5925 51.9189 33.4204C47.545 35.2483 42.8538 36.1967 38.1134 36.2116L38 0.113342L74.0982 -7.74027e-06Z"
        fill="#2e3486"
      />
      <path
        d="M0.113427 36.2116C0.0985418 31.4711 1.01751 26.7741 2.81786 22.3888C4.61822 18.0035 7.2647 14.0157 10.6062 10.6531C13.9477 7.29055 17.9188 4.61907 22.2927 2.79121C26.6667 0.963355 31.3578 0.014909 36.0983 2.38461e-05L36.2117 36.0983L0.113427 36.2116Z"
        fill="#DDDED6"
      />
      <path
        d="M36.0982 38C36.1131 42.7405 35.1942 47.4375 33.3938 51.8228C31.5935 56.2082 28.947 60.1959 25.6055 63.5585C22.264 66.9211 18.2929 69.5925 13.9189 71.4204C9.54498 73.2483 4.85384 74.1967 0.11335 74.2116L7.62936e-06 38.1133L36.0982 38Z"
        fill="#EA7227"
      />
    </svg>
  );
};

const MilestoneElement: React.FC = () => {
  interface ElectionEvent {
    date: string;
    description: string;
    expired: boolean;
  }

  const electionTimeline: ElectionEvent[] = [
    {
      date: "20 Oktober - 25 November",
      description: "Periode pendaftaran calon ketua IAGD",
      expired: true,
    },
    {
      date: "25 Oktober - 26 November 2023",
      description: "Periode pendaftaran calon pemilih",
      expired: true,
    },
    {
      date: "1 Desember 2023",
      description: "Pengumuman calon dan start Kampanye dari calon",
      expired: true,
    },
    {
      date: "3 Desember",
      description: "Rilis daftar pemilih tetap",
      expired: true,
    },
    {
      date: "6 Desember",
      description: "Pengiriman token pada daftar pemilih",
      expired: false,
    },
    {
      date: "7 Desember - 10 Desember (15:00 WIB)",
      description: "Periode Voting Online",
      expired: false,
    },
    {
      date: "10 Desember",
      description: "Pengumuman ketua terpilih",
      expired: false,
    },
  ];

  return (
    <div className="container mx-auto  pb-12 pt-24 sm:pb-24">
      <div className="mb-4 p-8  text-center text-gray-800 sm:mt-12">
        <h2 className="mb-4 text-2xl font-bold text-[#2e3486] sm:text-3xl lg:mb-8">
          Alur Pemilu
        </h2>
        <p className="text-lg md:text-2xl">
          Pemilu IAGD mengikuti jadwal yang terstruktur, dimulai dari
          pendaftaran calon Ketua dan pemilih pada 20 Oktober hingga 8 November,
          dilanjutkan dengan, kampanye selama dua minggu, dan pengumuman hasil
          pemilu pada 26 November. Proses ini melibatkan pemilih dalam pemilihan
          ketua dengan transparansi dan keadilan, dengan masa tenang pada 18-24
          November untuk pemilih merenungkan pilihan mereka sebelum pemungutan
          suara pada 25 November.
        </p>
      </div>

      <div className="text relative flex h-fit w-full flex-col  justify-between px-10 sm:mt-12 sm:flex-row sm:items-center sm:px-0">
        <div className="absolute inset-0 top-1/2 mx-auto h-5/6 w-1 -translate-y-1/2 transform bg-black sm:h-1 sm:w-5/6"></div>

        {electionTimeline.map((event, idx) => (
          <div
            key={idx}
            className="relative mx-auto flex h-14 w-full items-center justify-center sm:h-44  sm:w-36 sm:flex-col"
          >
            <h3
              className={`w-5/12 text-center text-xs font-semibold text-gray-800 sm:h-16 sm:w-full sm:pt-4 lg:text-sm ${
                event.expired && "text-gray-300"
              }`}
            >
              {event.date}
            </h3>
            <div className="relative  flex h-16 w-16 items-center justify-center sm:mb-0 sm:h-12 sm:w-12">
              <div
                className={` ${
                  event.expired ? "bg-slate-400" : "bgp"
                } absolute h-6 w-6 rounded-full sm:h-6 sm:w-6`}
              ></div>
            </div>

            <p
              className={`w-5/12 text-center text-xs  text-gray-900 sm:h-16 sm:w-full sm:text-sm
              
            ${event.expired && "text-gray-300"}
            `}
            >
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardData = {
  body: "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu. Malesuada in faucibus risus velit diam. Non, massa ut a arcu, fermentum, vel interdum.",
  badge: logo, // Assuming the logo.png is in the public directory
  heading: "Bu Ivy",
  subheading: "Ketua IAGD Periode 2020-2023",
};

const cardData2 = {
  body: "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu. Malesuada in faucibus risus velit diam. Non, massa ut a arcu, fermentum, vel interdum.",
  badge: logo, // Assuming the logo.png is in the public directory
  heading: "Lionel Messi",
  subheading: "Ketua IAGD Periode 2020-2023",
};

interface CardProps {
  description: string;
  badge: StaticImageData;
  heading: string;
  subheading: string;
}

const CardComponent: React.FC<CardProps> = ({ description, subheading }) => {
  return (
    <div className="bgp mx-auto my-10 w-5/6 max-w-6xl overflow-hidden rounded-lg p-8 text-white shadow-lg">
      <p className="customScroll text-md  mb-4 h-[320px] overflow-y-scroll rounded-md   text-left font-medium italic sm:text-lg">
        {paragraph1}
        <br></br>
        <br></br>
        {paragraph2}
        <br></br>
        <br></br>
        {paragraph3}
        <br></br>
        <br></br>
        {paragraph4}
        <br></br>
        <br></br>
        {paragraph5}
        <br></br>
        <br></br>
        {paragraph6}
        <br></br>
        <br></br>
        {paragraph7}
        <br></br>
        <br></br>
        {paragraph8}
        <br></br>
        <br></br>
        {paragraph9}
        <br></br>
        <br></br>
        {paragraph10}
        <br></br>
        <br></br>
        {paragraph11}
        Wassalamu’alaikum wr. wb.,
        <br></br>
        Viviani Suhar Ketua IAGD
        <br></br>
        Peridode 2020 - 2023
      </p>
      <div className="border-t-2 pt-4"></div>

      <div className="mx-auto mb-2  w-fit rounded-md border-2 bg-white">
        <Image src={logo} width={113} alt="logo-iagd"></Image>
      </div>
      <div className="text-center text-xl font-bold sm:text-2xl">
        Viviani Suhar
      </div>
      <p className="text-center text-lg ">{subheading}</p>
    </div>
  );
};

interface ProfileCardProps {
  details: {
    pendidikan: string;
    ttl: string;
    work: string;
  };
  badge: StaticImageData;
  heading: string;
  subheading: string;
  image: React.ReactNode;
  imageURLs?: string[];
  setOpenModal: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  details,
  heading,
  subheading,
  image,
  setOpenModal,
}) => {
  return (
    <div className="aspect mx-auto mb-8 aspect-[60/100] h-[540px] rounded-lg bg-white shadow-lg sm:h-[640px]">
      {image}
      <div className="mt-2 flex w-full flex-col p-4 sm:py-7">
        <h3 className="tcs text-center text-lg font-bold  sm:text-xl">
          {heading}
        </h3>
        <h4 className="text-md 2 text-center font-semibold sm:text-lg">
          {subheading}
        </h4>
        <div className="my-1 sm:my-2">{/* <SocmedDetails /> */}</div>
        <p className="text-md  mt-2 px-4   sm:mt-6 sm:text-lg">
          - {details.pendidikan}
        </p>
        <p className="text-md   px-4 sm:text-lg">- {details.ttl}</p>
        <p className="text-md   mb-8  px-4 sm:mb-12 sm:text-lg">
          - {details.work}
        </p>
        <button
          className="bgp rounded-md py-4 align-bottom text-sm font-semibold text-white hover:bg-orange-500 "
          type="button"
          onClick={setOpenModal}
        >
          Pelajari Lebih Lanjut
        </button>
      </div>
    </div>
  );
};

const ImageCard = ({ url }: { url: string }) => {
  return (
    <div className="card-container">
      <div className="card">
        <img
          src={url}
          alt="card image"
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

const SocmedDetails = () => (
  <div className="flex items-center justify-center gap-6">
    <a
      className="text-gray-700 hover:text-orange-600"
      aria-label="Visit TrendyMinds LinkedIn"
      href=""
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="h-5 sm:h-6"
      >
        <path
          fill="currentColor"
          d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
        ></path>
      </svg>
    </a>
    {/* <a
      className="text-gray-700 hover:text-orange-600"
      aria-label="Visit TrendyMinds Facebook"
      href=""
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        className="h-5 sm:h-6"
      >
        <path
          fill="currentColor"
          d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
        ></path>
      </svg>
    </a> */}
    <a
      className="text-gray-700 hover:text-orange-600"
      aria-label="Visit TrendyMinds Instagram"
      href=""
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="h-5 sm:h-6"
      >
        <path
          fill="currentColor"
          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
        ></path>
      </svg>
    </a>
    {/* <a
      className="text-gray-700 hover:text-orange-600"
      aria-label="Visit TrendyMinds Twitter"
      href=""
      target="_blank"
    >
      <svg
        className="h-5 sm:h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
        ></path>
      </svg>
    </a> */}
  </div>
);

interface IProps {
  isModalVisible: boolean;
  handleHideModal: (param: number) => void;
  canNum: number;
}

function Modal({ handleHideModal, isModalVisible, canNum }: IProps) {
  return (
    <AnimatePresence>
      {isModalVisible ? (
        <>
          <div
            className="fixed z-50 h-screen w-screen  bg-white/30 backdrop-blur-md "
            onClick={() => handleHideModal(0)}
          />
          <div
            aria-hidden="true"
            className="bgp centerFix fixed inset-x-0 z-50 mx-auto  h-[620px] w-[375px] rounded-lg border-2 border-[#EA7227] sm:h-[720px] sm:w-[500px]"
          >
            {canNum === 2 ? (
              <Splide
                className="items-center "
                options={{
                  rewind: true,
                  gap: "1rem",
                }}
              >
                <SplideSlide className="flex items-center justify-center pt-10">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/watermelongisapp.appspot.com/o/1.%20Profil.png?alt=media&token=3d0fa2fc-6909-409f-ba3d-bff9d5a11568"
                    alt="card image"
                    className="border-gray h-[550px] border-2 object-cover sm:h-[640px]"
                  />
                </SplideSlide>
                <SplideSlide className="flex items-center justify-center pt-10">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/watermelongisapp.appspot.com/o/2.%20Visi.png?alt=media&token=73e0f1b1-6e9a-4e27-8ff8-703e1edda2b2"
                    alt="card image"
                    className="border-gray h-[550px] border-2 object-cover sm:h-[640px]"
                  />
                </SplideSlide>
                <SplideSlide className="flex items-center justify-center pt-10">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/watermelongisapp.appspot.com/o/3.%20Misi.png?alt=media&token=f7b77cae-1123-47c8-837f-46c610839426"
                    alt="card image"
                    className="border-gray h-[550px] border-2 object-cover sm:h-[640px]"
                  />
                </SplideSlide>
                <SplideSlide className="flex items-center justify-center pt-10">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/watermelongisapp.appspot.com/o/4.%20Program%20Kerja.png?alt=media&token=4954b34f-b44f-420c-9440-ee161c60fb05"
                    alt="card image"
                    className="border-gray h-[550px] border-2 object-cover sm:h-[640px]"
                  />
                </SplideSlide>
                <SplideSlide className="flex items-center justify-center pt-10">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/watermelongisapp.appspot.com/o/5.%20Quote.png?alt=media&token=6e6532e6-9971-4730-bb0d-ba44d10a8c1c"
                    alt="card image"
                    className="border-gray h-[550px] border-2 object-cover sm:h-[640px]"
                  />
                </SplideSlide>
              </Splide>
            ) : (
              <Splide
                className="items-center "
                options={{
                  rewind: true,
                  gap: "1rem",
                }}
              >
                <SplideSlide className="flex items-center justify-center pt-10">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/watermelongisapp.appspot.com/o/Posterr%20(4)%20(1).jpg?alt=media&token=fde10f73-6447-488b-b8a3-0698d472b5a4"
                    alt="card image"
                    className="border-gray h-[550px] border-2 object-cover sm:h-[640px]"
                  />
                </SplideSlide>
              </Splide>
            )}
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
