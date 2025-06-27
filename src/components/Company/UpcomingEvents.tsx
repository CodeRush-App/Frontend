import React from "react";
import { UpcomingEvent } from "@/api/company";
import { Box, Card, CardContent, Typography, Button, Divider, Stack } from "@mui/material";

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          Upcoming events
        </Typography>
        <Divider sx={{ flex: 1, borderColor: '#27375E', mx: 2 }} />
      </Box>
      {events.length === 0 ? (
        <Typography color="text.secondary">No upcoming events.</Typography>
      ) : (
        events.map((event, idx) => (
          <Card key={idx} sx={{ background: '#27375E', borderRadius: 2, mb: 3 }}>
            <CardContent>
              <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold', mb: 1 }}>{event.name}</Typography>
                  <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 5, color: 'text.secondary' }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Event duration</Typography>
                      <Typography variant="subtitle2">{event.duration}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Location</Typography>
                      <Typography variant="subtitle2">{event.location}</Typography>
                    </Box>
                  </Stack>
                </Box>
                <Button variant="contained" color="primary">
                  Register now
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
