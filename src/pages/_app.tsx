import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider {...pageProps}>
        <Head>
          <title>Template</title>
          <meta name="IAGD'S Website" content="Website Pemilu IAGD" />
          <link rel="icon" href="../../public/logomini.png" />
        </Head>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
