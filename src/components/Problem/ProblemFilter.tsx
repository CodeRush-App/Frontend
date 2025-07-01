import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Popover, Slider } from "@mui/material";

export type ProblemFilterProps = {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  filter: {
    status: string[];
    difficulty: string[];
    successRate: [number, number];
  };
  onFilterChange: (newFilter: ProblemFilterProps['filter']) => void;
  statusOptions?: string[];
  difficultyOptions?: string[];
};

const DEFAULT_STATUS_OPTIONS = ["Solved", "Unsolved"];
const DEFAULT_DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const SUCCESS_RATE_MIN = 0;
const SUCCESS_RATE_MAX = 100;
const SUCCESS_RATE_STEP = 5;
const SUCCESS_RATE_MARKS = [
  { value: 0, label: "0%" },
  { value: 50, label: "50%" },
  { value: 100, label: "100%" },
];

export default function ProblemFilter({
  open,
  onClose,
  anchorEl,
  filter,
  onFilterChange,
  statusOptions = DEFAULT_STATUS_OPTIONS,
  difficultyOptions = DEFAULT_DIFFICULTY_OPTIONS,
}: ProblemFilterProps) {
  function toggleFilter(category: "status" | "difficulty", value: string) {
    const newFilter = { ...filter };
    if (filter[category].includes(value)) {
      newFilter[category] = filter[category].filter((s) => s !== value);
    } else {
      newFilter[category] = [...filter[category], value];
    }
    onFilterChange(newFilter);
  }

  function resetFilter() {
    onFilterChange({
      status: [],
      difficulty: [],
      successRate: [SUCCESS_RATE_MIN, SUCCESS_RATE_MAX],
    });
  }

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
        <h2>Apply Filters</h2>
        <Box>
          <h3><u>Status</u></h3>
          <FormControl>
            <FormGroup sx={{ flexDirection: "row" }}>
              {statusOptions.map((status) => (
                <FormControlLabel
                  key={status}
                  control={<Checkbox checked={filter.status.includes(status)} onChange={() => toggleFilter("status", status)} />}
                  label={status}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
        <Box>
          <h3><u>Difficulty</u></h3>
          <FormControl>
            <FormGroup sx={{ flexDirection: "row" }}>
              {difficultyOptions.map((difficulty) => (
                <FormControlLabel
                  key={difficulty}
                  control={<Checkbox checked={filter.difficulty.includes(difficulty)} onChange={() => toggleFilter("difficulty", difficulty)} />}
                  label={difficulty}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
        <Box>
          <h3><u>Success Rate</u></h3>
          <Slider
            value={filter.successRate}
            min={SUCCESS_RATE_MIN}
            max={SUCCESS_RATE_MAX}
            step={SUCCESS_RATE_STEP}
            marks={SUCCESS_RATE_MARKS}
            valueLabelFormat={(value) => `${value}%`}
            valueLabelDisplay="auto"
            sx={{
              "& .MuiSlider-rail": { height: 6 },
              "& .MuiSlider-track": { height: 6 },
              ml: 1,
            }}
            onChange={(e, value) => onFilterChange({ ...filter, successRate: value as [number, number] })}
          />
        </Box>
        <Button variant="contained" onClick={resetFilter}>Reset Filter</Button>
      </Box>
    </Popover>
  );
}