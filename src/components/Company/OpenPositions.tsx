import React from "react";
import { OpenPosition } from "@/api/company";
import { Box, Card, CardContent, Typography, Button, Divider, Stack, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function OpenPositions({ positions }: { positions: OpenPosition[] }) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          Open positions
        </Typography>
        <Divider sx={{ flex: 1, borderColor: '#27375E', borderWidth: 1, borderRadius: 2 }} />
        <IconButton color="primary">
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>
      {positions.length === 0 ? (
        <Typography color="text.secondary">No open positions.</Typography>
      ) : (
        positions.map((pos, idx) => (
          <Card key={idx} sx={{ background: '#27375E', borderRadius: 2, mb: 2 }}>
            <CardContent>
              <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between' }} spacing={3}>
                <Box>
                  <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold', mb: 1 }}>{pos.position}</Typography>
                  <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 5, color: 'text.secondary', mb: 1 }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Qualifications</Typography>
                      <ul style={{ marginLeft: 20, fontSize: 13, marginTop: 4, color: 'text.primary' }}>
                        {pos.qualifications.map((q, i) => (<li key={i}>{q}</li>))}
                      </ul>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Duration</Typography>
                      <Typography variant="subtitle2">{pos.duration}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Salary</Typography>
                      <Typography variant="subtitle2">{pos.salary}</Typography>
                    </Box>
                  </Stack>
                </Box>
                <Button variant="contained" color="primary" size="large">
                  Apply
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
