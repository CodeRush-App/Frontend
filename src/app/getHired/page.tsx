"use client"
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Stack, CircularProgress, Divider } from "@mui/material";
import { getCompanies, Company } from "@/api/company";

const COMPANY_LOGOS: Record<string, string> = {
  Google: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  // Add more company logos here if needed
};

export default function GetHired() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCompanies()
      .then(data => {
        setCompanies(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load companies");
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "80vw", margin: "auto", mt: 10, gap: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 4 }}>
        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 500 }}>
          Registered companies
        </Typography>
        <Divider sx={{ borderColor: "#27375E", flex: 1, borderRadius: 2, borderWidth: 1 }} />
        <Button variant="contained" sx={{ fontWeight: 500 }} >Filter</Button>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <Stack spacing={2} sx={{ height: "calc(90vh - 200px)", overflowY: "auto", overflowX: "hidden", pr: 2 }}>
          {companies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

function CompanyCard({ company }: { company: Company }) {
  return (
    <Box sx={{ bgcolor: "background.paper", borderRadius: 2, display: "flex", alignItems: "center", p: 2, m: 1 }}>
      <Avatar src={COMPANY_LOGOS[company.name] || undefined} alt={company.name} sx={{ width: 40, height: 40, mr: 2, bgcolor: "#fff" }}>
        {company.name[0]}
      </Avatar>
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
        <Typography variant="subtitle1" fontWeight={600} color="text.primary" sx={{ minWidth: 100 }}>
          {company.name}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14 }}>
            Open positions
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500, fontSize: 15 }}>
            {company.openPositions.length}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14 }}>
            Company size
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 400, fontSize: 15 }}>
            {company.size}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <Button variant="contained" color="primary" sx={{ minWidth: 180, fontWeight: 500, borderRadius: 2 }}>
          View company profile
        </Button>
      </Box>
    </Box>
  );
}