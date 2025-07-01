import React, { useState } from "react";
import { OpenPosition } from "@/api/company";
import { Box, Card, CardContent, Typography, Button, Divider, Stack, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import InlineTextEdit from '../InlineTextEdit';

type OpenPositionsProps = {
  positions: OpenPosition[];
  onChangePositions: (positions: OpenPosition[]) => void;
};

const BLANK_POSITION: OpenPosition = {
  duration: " ",
  position: " ",
  qualifications: [" "],
  salary: " ",
};

export default function OpenPositions({ positions, onChangePositions }: OpenPositionsProps) {
  const [editing, setEditing] = useState(false);
  const [localPositions, setLocalPositions] = useState<OpenPosition[]>(positions);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  React.useEffect(() => {
    setLocalPositions(positions);
  }, [positions]);

  const handleFieldChange = (idx: number, field: keyof OpenPosition, value: string | string[]) => {
    const updated = [...localPositions];
    if (field === 'qualifications' && typeof value === 'string') {
      updated[idx][field] = value.split(',').map((q) => q.trim());
    } else {
      // @ts-ignore
      updated[idx][field] = value;
    }
    setLocalPositions(updated);
  };

  const handleSave = () => {
    setEditing(false);
    onChangePositions(localPositions);
  };

  const handleAdd = () => {
    setLocalPositions([...localPositions, { ...BLANK_POSITION }]);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        <Typography color="text.primary" sx={{ fontWeight: 'bold', fontSize: 24 }}>
          Open positions
        </Typography>
        <Divider sx={{ flex: 1, borderColor: '#27375E', borderWidth: 1, borderRadius: 2 }} />
        <IconButton color={editing ? "success" : "primary"} onClick={() => (editing ? handleSave() : setEditing(true))}>
          {editing ? (
            <CheckIcon fontSize="medium" />
          ) : (
            <EditIcon fontSize="medium" />
          )}
        </IconButton>
      </Box>
      {localPositions.length === 0 ? (
        <Typography color="text.secondary">No open positions.</Typography>
      ) : (
        localPositions.map((pos, idx) => (
          <Card
            key={idx}
            sx={{ background: '#27375E', borderRadius: 2, mb: 2, position: 'relative' }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {editing && hoveredCard === idx && (
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 6, right: 6, zIndex: 2, color: 'error.main', background: 'rgba(0,0,0,0.2)' }}
                onClick={() => setLocalPositions(localPositions.filter((_, i) => i !== idx))}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
            <CardContent>
              <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between' }} spacing={3}>
                <Box>
                  <InlineTextEdit
                    value={pos.position}
                    onChange={(val) => handleFieldChange(idx, 'position', val)}
                    editing={editing}
                    styling={{ fontWeight: 'bold', mb: 1, color: 'text.primary', fontSize: 18 }}
                    label="Position"
                  />
                  <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 5, color: 'text.secondary', mb: 1 }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Qualifications</Typography>
                      {editing ? (
                        <InlineTextEdit
                          value={pos.qualifications.join(', ')}
                          onChange={(val) => handleFieldChange(idx, 'qualifications', val)}
                          editing={editing}
                          styling={{ fontSize: 13, mt: 1, color: 'text.primary' }}
                          label="Qualifications (comma separated)"
                        />
                      ) : (
                        <ul style={{ marginLeft: 20, fontSize: 13, marginTop: 4, color: 'text.primary' }}>
                          {pos.qualifications.map((q, i) => (<li key={i}>{q}</li>))}
                        </ul>
                      )}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Duration</Typography>
                      <InlineTextEdit
                        value={pos.duration}
                        onChange={(val) => handleFieldChange(idx, 'duration', val)}
                        editing={editing}
                        styling={{ fontSize: 13, color: 'text.primary' }}
                        label="Duration"
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>Salary</Typography>
                      <InlineTextEdit
                        value={pos.salary}
                        onChange={(val) => handleFieldChange(idx, 'salary', val)}
                        editing={editing}
                        styling={{ fontSize: 13, color: 'text.primary' }}
                        label="Salary"
                      />
                    </Box>
                  </Stack>
                </Box>
                {!editing && (
                  <Button variant="contained" color="primary" size="large">
                    Apply
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))

      )}
      {editing && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Tooltip title="Add new position">
            <IconButton color="primary" onClick={handleAdd}>
              <AddIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
