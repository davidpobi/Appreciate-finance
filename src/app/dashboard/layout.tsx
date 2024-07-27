import PageBody from "../../components/PageBody";
import { defaultMetadataImage } from "../../data";

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

const Layout = ({ children }: any) => {
  return <PageBody>{children}</PageBody>;
};

export default Layout;
