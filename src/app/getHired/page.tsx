"use client"
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Stack, CircularProgress, Divider } from "@mui/material";
import { getCompanies, Company } from "@/app/api/company";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GetHired() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    getCompanies()
      .then(data => {
        setCompanies(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load companies");
        setLoading(false);
      });
  }, [status]);

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
        <Typography color="text.primary" sx={{ fontWeight: "bold", fontSize: 24 }}>
          Registered companies
        </Typography>
        <Divider sx={{ borderColor: "#27375E", flex: 1, borderRadius: 2, borderWidth: 1 }} />
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
      <Avatar alt={company.name} sx={{ width: 40, height: 40, mr: 2, bgcolor: "#fff" }}>
        {company.name[0]}
      </Avatar>
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ minWidth: 100, fontWeight: "bold" }}>
          {company.name}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14 }}>
            Open positions
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: "bold", fontSize: 15 }}>
            {company.openPositions.length}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14 }}>
            Company size
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: "bold", fontSize: 15 }}>
            {company.size}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <Button variant="contained" color="primary" href={`/company/${company.id}`} sx={{ minWidth: 180, fontWeight: "bold", borderRadius: 2 }}>
          View company profile
        </Button>
      </Box>
    </Box>
  );
}