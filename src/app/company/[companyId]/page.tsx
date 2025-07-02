"use client"
import { getCompany, updateCompany } from "@/app/api/company";
import type { Company, OpenPosition, UpcomingEvent } from "@/app/api/company";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CompanyHeader from "../../../components/Company/CompanyHeader";
import OpenPositions from "../../../components/Company/OpenPositions";
import UpcomingEvents from "../../../components/Company/UpcomingEvents";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Company() {
  const { companyId } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    if (companyId)
      getCompany(companyId as string).then(setCompany);
  }, [companyId, status]);

  if (!company || status === "unauthenticated" || status === "loading") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography color="text.primary" variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <CompanyHeader name={company.name} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 4 }}>
        <OpenPositions
          positions={company.openPositions}
          onChangePositions={async (positions: OpenPosition[]) => {
            const updated = { ...company, openPositions: positions };
            setCompany(updated);
            await updateCompany(company.id!, updated);
          }}
          isManager={session?.user?.id === company.managedBy}
        />
        <UpcomingEvents
          events={company.upcomingEvents}
          onChangeEvents={async (events: UpcomingEvent[]) => {
            const updated = { ...company, upcomingEvents: events };
            setCompany(updated);
            await updateCompany(company.id!, updated);
          }}
          isManager={session?.user?.id === company.managedBy}
        />
      </Box>
    </Box>
  );
}