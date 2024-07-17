import HomePage from "@/client/pages/HomePage";
import Footer from "@/client/components/common/Footer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen w-screen overflow-hidden">
        <HomePage />
      </main>
      <div id="footer mt-auto">
        <Footer />
      </div>
    </>
  );
}
