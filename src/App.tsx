import "./App.css";
import MainCard from "./components/Card";
import { AppProvider } from "./context";
import { useAppState } from "./context";

const ButtonContainer: React.FC = () => {
  const { toggleState } = useAppState();
  return (
    <div className="flex flex-row justify-evenly w-full items-center  my-5">
      <button
        className="border border-black rounded-2xl px-5 py-3 font-bold  bg-green-400 hover:bg-green-600"
        onClick={() => {
          toggleState("play");
        }}
      >
        Play
      </button>
      <button
        className="border border-black rounded-2xl px-5 py-3 font-bold bg-red-400  hover:bg-red-600 "
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
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 via-white to-pink-100 text-gray-800 px-6 py-8">
        {/* Header of App */}
        <header className="self-start flex flex-col justify-center items-center w-full">
          <h1 className="text-6xl font-extrabold tracking-wide text-pink-600 drop-shadow-md">
            Mi Lotería: <span className="text-yellow-600"></span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
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
