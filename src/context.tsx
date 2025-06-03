import { createContext, useContext,useState } from "react";
import type { ReactNode } from "react";
type AppState = "play" | "reset";

const AppContext = createContext<{
  state: AppState;
  toggleState: (val: AppState) => void;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>("reset");

  const toggleState = (val: AppState) => setState(val);

  return (
    <AppContext.Provider value={{ state, toggleState }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
