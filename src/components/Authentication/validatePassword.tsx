import { Box, Checkbox } from "@mui/material";

interface IValidatePassword {
  isMinLength: boolean;
  isUpperCase: boolean;
  hasUniqueChar: boolean;
  classes?: string;
}

const ValidatePasswordInput: React.FC<IValidatePassword> = ({
  isMinLength,
  isUpperCase,
  hasUniqueChar,
  classes,
}: IValidatePassword) => (
  <Box
    sx={{
      position: "relative",
      top: "-7px",
      mb: "1rem",
      ".item": {
        ".check": {
          "&.MuiCheckbox-root": {},
          "&.Mui-checked": {
            color: "gray",
          },
        },
        ".txt": {
          fontSize: "14px",
          fontWeight: "400",
          color: "rgba(0, 0, 0, 0.40)",
        },
      },
    }}
  >
    <Box className="item">
      <Checkbox checked={isMinLength} color="primary" className="check" sx={{ margin: "0", padding: "0", mr: "5px" }} />
      <span className="txt">Minimum of 8 characters</span>
    </Box>
    <Box className="item">
      <Checkbox checked={isUpperCase} className="check" sx={{ margin: "0", padding: "0", mr: "5px" }} />
      <span className="txt">One UPPERCASE letter</span>
    </Box>
    <Box className="item">
      <Checkbox checked={hasUniqueChar} className="check" sx={{ margin: "0", padding: "0", mr: "5px" }} />
      <span className="txt">One unique character (e.g: !@#$%^&*?)</span>
    </Box>
  </Box>
);

export default ValidatePasswordInput;
