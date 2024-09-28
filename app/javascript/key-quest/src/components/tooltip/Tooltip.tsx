import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";

type TooltipCustomProps = {
  title?: string;
};

function TooltipCustom({ title = "More information" }: TooltipCustomProps) {
  return (
    <Tooltip title={title}>
      <IconButton>
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
}

export default TooltipCustom;
