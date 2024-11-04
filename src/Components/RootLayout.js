import { Outlet } from "react-router-dom";
import Main from "./Main";

export default function RootLayout() {
  return (
    <div>
      <header>
        <Main />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
