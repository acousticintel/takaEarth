import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
//custom
import Layout from "../components/layout";
import { ProvideData } from "../context/dataContext";

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <SessionProvider session={session}>
      <ProvideData>
        <Layout path={router.route}>
          <Component {...pageProps} />
        </Layout>
      </ProvideData>
    </SessionProvider>
  );
}

export default MyApp;
