import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
interface Props {
  children: React.ReactNode;
  title: string;
  content?: string;
}
export default function HelmetWrapper({ children, title, content }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>{title} | Booking Doctor</title>
        <meta name="description" content={content} />
      </Helmet>
      {children}
    </>
  );
}
