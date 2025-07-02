import React, { useState } from "react";
import { UpcomingEvent } from "@/app/api/company";
import { Box, Card, CardContent, Typography, Button, Divider, Stack, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import InlineTextEdit from '../InlineTextEdit';

type UpcomingEventsProps = {
  events: UpcomingEvent[];
  onChangeEvents: (events: UpcomingEvent[]) => void;
  isManager: boolean;
};

const BLANK_EVENT: UpcomingEvent = {
  duration: " ",
  location: " ",
  name: " ",
};

export default function UpcomingEvents({ events, onChangeEvents, isManager }: UpcomingEventsProps) {
  const [editing, setEditing] = useState(false);
  const [localEvents, setLocalEvents] = useState<UpcomingEvent[]>(events);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  React.useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const handleFieldChange = (idx: number, field: keyof UpcomingEvent, value: string) => {
    const updated = [...localEvents];
    updated[idx][field] = value;
    setLocalEvents(updated);
  };

  const handleSave = () => {
    setEditing(false);
    onChangeEvents(localEvents);
  };

  const handleAdd = () => {
    setLocalEvents([...localEvents, { ...BLANK_EVENT }]);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        <Typography color="text.primary" sx={{ fontWeight: 'bold', fontSize: 24 }}>
          Upcoming events
        </Typography>
        <Divider sx={{ flex: 1, borderColor: '#27375E', borderWidth: 1, borderRadius: 2 }} />
        {isManager && (
          <IconButton color={editing ? "success" : "primary"} onClick={() => (editing ? handleSave() : setEditing(true))}>
            {editing ? (
              <CheckIcon fontSize="medium" />
            ) : (
              <EditIcon fontSize="medium" />
            )}
          </IconButton>
        )}
      </Box>
      {localEvents.length === 0 ? (
        <Typography color="text.secondary">No upcoming events.</Typography>
      ) : (
        localEvents.map((event, idx) => (
          <Card
            key={idx}
            sx={{ background: '#27375E', borderRadius: 2, mb: 3, position: 'relative' }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {editing && hoveredCard === idx && (
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 6, right: 6, zIndex: 2, color: 'error.main', background: 'rgba(0,0,0,0.2)' }}
                onClick={() => setLocalEvents(localEvents.filter((_, i) => i !== idx))}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
            <CardContent>
              <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between' }}>
                <Box>
                  <InlineTextEdit
                    value={event.name}
                    onChange={(val) => handleFieldChange(idx, 'name', val)}
                    editing={editing}
                    styling={{ fontWeight: 'bold', mb: 1, color: 'text.primary', fontSize: 18 }}
                    label="Event Name"
                  />
                  <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 5, color: 'text.secondary' }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Event duration</Typography>
                      <InlineTextEdit
                        value={event.duration}
                        onChange={(val) => handleFieldChange(idx, 'duration', val)}
                        editing={editing}
                        styling={{ fontSize: 13, color: 'text.primary' }}
                        label="Duration"
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Location</Typography>
                      <InlineTextEdit
                        value={event.location}
                        onChange={(val) => handleFieldChange(idx, 'location', val)}
                        editing={editing}
                        styling={{ fontSize: 13, color: 'text.primary' }}
                        label="Location"
                      />
                    </Box>
                  </Stack>
                </Box>
                {!editing && (
                  <Button variant="contained" color="primary">
                    Register now
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
      {editing && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Tooltip title="Add new event">
            <IconButton color="primary" onClick={handleAdd}>
              <AddIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
