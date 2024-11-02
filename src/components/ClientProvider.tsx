"use client";

import Navbar from "@/components/TopNav";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function ClientProvider({ session, children }: { session: any; children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Navbar session={session} />
      {children}
    </Provider>
  );
}
