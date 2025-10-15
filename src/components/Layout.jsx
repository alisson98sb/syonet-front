import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container" style={{ minHeight: "80vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
