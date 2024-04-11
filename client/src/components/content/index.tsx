import { TabConfig } from "./config";

export default function Content({ index }: { index: number }) {
  return TabConfig[index].content;
}
