import { Box, SxProps, TextField, Theme } from "@mui/material";

export default function InlineTextEdit({ value, onChange, editing, styling, label }: { value: string, onChange: (value: string) => void, editing: boolean, styling: SxProps<Theme>, label: string }) {
  return editing ? (
    <TextField
      size="small"
      variant="outlined"
      value={value}
      onChange={e => onChange(e.target.value)}
      label={label}
      sx={{ maxWidth: "300px" }}
    />
  ) : (
    <Box sx={styling}>{value}</Box>
  );
}