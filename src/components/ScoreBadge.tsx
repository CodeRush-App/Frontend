import Bronze from "@/public/badges/bronze.png";
import Silver from "@/public/badges/silver.png";
import Gold from "@/public/badges/gold.png";
import Diamond from "@/public/badges/diamond.png";
import Image from "next/image";
import { getBadgeFromScore } from "@/lib/problemUtils";
import { CSSProperties } from "react";

export default function ScoreBadge({ score, style }: { score: number, style?: CSSProperties }) {
  const badge = getBadgeFromScore(score);
  return (
    <>
      {badge === "Bronze" ? <Image src={Bronze} alt="Bronze Badge" width={50} height={50} style={style} /> :
        badge === "Silver" ? <Image src={Silver} alt="Silver Badge" width={50} height={50} style={style} /> :
          badge === "Gold" ? <Image src={Gold} alt="Gold Badge" width={50} height={50} style={style} /> :
            badge === "Diamond" ? <Image src={Diamond} alt="Diamond Badge" width={50} height={50} style={style} /> : <></>}
    </>
  );
}