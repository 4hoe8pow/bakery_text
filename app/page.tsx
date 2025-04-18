"use client";

import dynamic from "next/dynamic";
import Rain from "./components/Rain";

const TerminalProvider = dynamic(
    () =>
        import("./context/TerminalContext").then((mod) => mod.TerminalProvider),
    { ssr: false, loading: () => <div>Loading TerminalProvider...</div> },
);

const InGameCentral = dynamic(
    () => import("./components/InGameCentral").then((mod) => mod.InGameCentral),
    { ssr: false, loading: () => <div>Loading TerminalWindows...</div> },
);

const BackgroundConsole = dynamic(
    () => import("./components/BackgroundConsole"),
    { ssr: false, loading: () => <div>Loading BackgroundConsole...</div> },
);

export default function Home() {
    return (
        <TerminalProvider>
            <BackgroundConsole />
            <InGameCentral />
            <Rain />
        </TerminalProvider>
    );
}
