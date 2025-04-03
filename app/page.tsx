"use client";

import dynamic from "next/dynamic";

const TerminalProvider = dynamic(
    () =>
        import("./context/TerminalContext").then((mod) => mod.TerminalProvider),
    { ssr: false },
);

const TerminalWindows = dynamic(
    () =>
        import("./components/TerminalWindows").then(
            (mod) => mod.TerminalWindows,
        ),
    { ssr: false },
);

const BackgroundConsole = dynamic(
    () => import("./components/BackgroundConsole"),
    { ssr: false },
);

export default function Home() {
    return (
        <TerminalProvider>
            <BackgroundConsole />
            <TerminalWindows />
        </TerminalProvider>
    );
}
