import "./App.css";
import MainCard from "./components/Card";
import { AppProvider } from "./context";
import { useAppState } from "./context";

const ButtonContainer: React.FC = () => {
  const { toggleState } = useAppState();
  return (
    <div className="flex flex-row justify-evenly w-full items-center  my-5">
      <button
        className="border border-black font-light text-2xl rounded-2xl  px-5 py-5  md:px-15 md:py-8   bg-green-400 hover:bg-green-600"
        onClick={() => {
          toggleState("play");
        }}
      >
        Play
      </button>
      <button
        className="border border-black  font-light  text-2xl px-5 py-5 rounded-2xl md:px-15 md:py-8   bg-red-400  hover:bg-red-600 "
        onClick={() => {
          toggleState("reset");
          window.location.reload();
        }}
      >
        Reset
      </button>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <section className="text-futura min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 via-blue-200 to-red-200 text-gray-800  font-modack">
        {/* Header of App */}
        <header className="self-start flex flex-col justify-center items-center w-full">
          <h1 className="text-6xl mt-10 mx-4 text-center md:text-9xl tracking-wide text-yellow-500 drop-shadow-md">
            Mi Lotería: <span className="text-yellow-600"></span>
          </h1>
          <p className="text-3xl md:text-6xl mt-2 mx-4  font-light text-red-700 text-center">
            A tribute to strength, resilience, and excellence.
          </p>
        </header>

        {/* Main Lotería Card */}
        <main className="min-h-screen w-full flex-grow flex items-center justify-center">
          <MainCard />
        </main>

        {/* Button Controls */}
        <footer className="w-full max-w-md flex justify-center">
          <ButtonContainer />
        </footer>
      </section>
    </AppProvider>
  );
}

export default App;
