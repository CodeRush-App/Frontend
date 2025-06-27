"use client"
import { getCompany } from "@/api/company";
import type { Company } from "@/api/company";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CompanyHeader from "./CompanyHeader";
import OpenPositions from "./OpenPositions";
import UpcomingEvents from "./UpcomingEvents";
import { Box, Typography } from "@mui/material";

export default function Company() {
  const { companyId } = useParams();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    if (companyId) {
      getCompany(companyId as string).then(setCompany);
    }
  }, [companyId]);

  if (!company) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography color="text.primary" variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mx: "auto", maxWidth: "md"}}>
      <CompanyHeader name={company.name} />
      <Box mt={8} sx={{ display: "flex", flexDirection: "column", gap: 4}}>
        <OpenPositions positions={company.openPositions} />
        <UpcomingEvents events={company.upcomingEvents} />
      </Box>
    </Box>
  );
}