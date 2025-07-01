"use client"
import { getCompany } from "@/api/company";
import type { Company } from "@/api/company";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CompanyHeader from "../../../components/Company/CompanyHeader";
import OpenPositions from "../../../components/Company/OpenPositions";
import UpcomingEvents from "../../../components/Company/UpcomingEvents";
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
    <Box>
      <CompanyHeader name={company.name} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 4}}>
        <OpenPositions positions={company.openPositions} />
        <UpcomingEvents events={company.upcomingEvents} />
      </Box>
    </Box>
  );
}