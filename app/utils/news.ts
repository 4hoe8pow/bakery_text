import type {
    News,
    Terminal,
    TerminalSectionId,
} from "../context/TerminalContext";
import { v4 as uuidv4 } from "uuid";

/** JSON化したニュース配列のバイトサイズを計算 */
const calcSize = (news: News[]): number =>
    new TextEncoder().encode(JSON.stringify(news)).length;

/** ニュースリストを1KB以下にトリム */
const trimNews = (news: News[]): News[] => {
    let totalSize = calcSize(news);
    while (totalSize > 1024 && news.length > 1) {
        news.shift(); // 古いニュースから削除
        totalSize = calcSize(news);
    }
    return news;
};

/** 新しいニュースを追加し、サイズ制限を適用 */
const updateNewsList = (news: News[], description: string): News[] => {
    const newNews: News = { id: uuidv4(), datetime: new Date(), description };
    return trimNews([...news, newNews]);
};

/** 指定された Terminal の news を更新する */
export const mapAndUpdate = (
    terminals: Terminal[],
    id: TerminalSectionId,
    description: string,
): Terminal[] =>
    terminals.map((terminal) =>
        terminal.id !== id
            ? terminal
            : { ...terminal, news: updateNewsList(terminal.news, description) },
    );
