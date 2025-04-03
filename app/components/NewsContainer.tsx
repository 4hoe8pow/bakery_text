import { useEffect, useRef } from "react";

export const NewsContainer = ({
    news,
    terminalStatus,
}: {
    news: { id: string; datetime: Date; description: string }[];
    terminalStatus: string;
}) => {
    const newsContainerRef = useRef<HTMLDivElement>(null);
    const prevNewsLength = useRef(news.length);

    useEffect(() => {
        if (!newsContainerRef.current) return;

        const isHealthy = terminalStatus === "HEALTHY";
        if (news.length > prevNewsLength.current && !isHealthy) {
            const items = newsContainerRef.current.children;
            if (items.length > 0) {
                const lastItem = items[items.length - 1] as HTMLElement;
                lastItem.classList.add("glitch");

                setTimeout(() => {
                    lastItem.classList.remove("glitch");
                }, 200);
            }
        }

        newsContainerRef.current.scrollTo({
            top: newsContainerRef.current.scrollHeight,
            behavior: "smooth",
        });

        prevNewsLength.current = news.length;
    }, [news, terminalStatus]);

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
