import Header from "./Header";
import Footer from "./Footer";

export default function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-base font-iaWriterQuattro flex flex-col h-screen lg:max-w-4xl lg:mx-auto">
      <Header />

      <main className="pt-2 px-10 grow">{children}</main>

      <Footer />
    </div>
  );
}
