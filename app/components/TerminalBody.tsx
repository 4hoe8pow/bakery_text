import { useEffect, useRef } from "react";

interface TerminalBodyProps {
    news: { id: string; datetime: Date; description: string }[];
    isHealthy: boolean;
}

export const TerminalBody = ({ news, isHealthy }: TerminalBodyProps) => {
    const newsContainerRef = useRef<HTMLDivElement>(null);
    const prevNewsLength = useRef(news.length);

    useEffect(() => {
        if (!newsContainerRef.current || isHealthy) return;

        if (news.length > prevNewsLength.current) {
            const lastItem = newsContainerRef.current.children[
                news.length - 1
            ] as HTMLElement;
            lastItem.classList.add("glitch");

            setTimeout(() => lastItem.classList.remove("glitch"), 200);
        }

        prevNewsLength.current = news.length;
    }, [news, isHealthy]);

    return (
        <div
            ref={newsContainerRef}
            className="window-body max-h-[278px] w-[450px] overflow-y-scroll"
        >
            {news.map((item) => (
                <div key={item.id} className="flex flex-row space-x-4">
                    <p>[&nbsp;{item.datetime.toISOString()}&nbsp;]</p>
                    <strong>{item.description}</strong>
                </div>
            ))}
        </div>
    );
};
