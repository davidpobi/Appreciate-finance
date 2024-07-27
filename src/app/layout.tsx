import { defaultMetadataImage } from "../data";
import AppContainer from "../layouts/AppContainer";
import "../styles/globals.css";
import "../styles/variables.scss";
import localFont from "next/font/local";

export const metadata = {
  title: "Appreciate 🦙",
  description: "A Next Gen Portfolio Dashboard",
  openGraph: {
    images: [defaultMetadataImage],
  },
  twitter: {
    images: [defaultMetadataImage],
  },
};

const thicccboi = localFont({ src: "../../public/fonts/thicccboi/THICCCBOI-Regular.woff2" });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <meta name="google" content="notranslate" key="notranslate" />
      {/* <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self' http: https:;
        img-src data: https: http:;
        script-src 'self' 'unsafe-inline' https: http:;
        style-src 'self' 'unsafe-inline' https: http:;
        font-src 'self' 'unsafe-inline' https: http:;
        connect-src 'self' 'unsafe-inline' https: http:"
      /> */}
      <body className={`body scrollbar-hidden ${thicccboi.className}`} suppressHydrationWarning={true}>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
};

export default RootLayout;
