import Bronze from "@/public/bronze.png";
import Silver from "@/public/silver.png";
import Gold from "@/public/gold.png";
import Diamond from "@/public/diamond.png";
import Image from "next/image";
import { getBadgeFromScore } from "@/lib/problemUtils";

export default function ScoreBadge({ score }: { score: number }) {
  return (
    <>
      {getBadgeFromScore(score) === "Bronze" ? <Image src={Bronze} alt="Bronze Badge" width={50} height={50} /> :
        getBadgeFromScore(score) === "Silver" ? <Image src={Silver} alt="Silver Badge" width={50} height={50} /> :
          getBadgeFromScore(score) === "Gold" ? <Image src={Gold} alt="Gold Badge" width={50} height={50} /> :
            getBadgeFromScore(score) === "Diamond" ? <Image src={Diamond} alt="Diamond Badge" width={50} height={50} /> : <></>}
    </>
  );
}