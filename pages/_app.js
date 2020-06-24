import Navbar from "../components/Navbar";
import "../styles.css";
import "@lourenci/react-kanban/dist/styles.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}
