import Bronze from "@/public/badges/bronze.png";
import Silver from "@/public/badges/silver.png";
import Gold from "@/public/badges/gold.png";
import Diamond from "@/public/badges/diamond.png";
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