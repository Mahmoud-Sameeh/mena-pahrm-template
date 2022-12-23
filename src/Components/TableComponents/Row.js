import { useState, Fragment } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableHead,
  IconButton,
  Collapse,
} from "@mui/material";

export default function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row">
          <Button
            variant="outlined"
            component={Link}
            to={`/edit-asset/${row.id}`}
          >
            <Typography sx={{ textTransform: "capitalize" }}>
              Edit {row.name}
            </Typography>
          </Button>
          <Button variant="outlined" color="error" sx={{ marginLeft: "3px" }} onClick={()=>{props.deleteAsset(row.id)}}>
            <Typography sx={{ textTransform: "capitalize" }}>
              Delete {row.name}
            </Typography>
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.assetProperties?.map((assetProp, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {assetProp.Key}
                      </TableCell>
                      <TableCell>{assetProp.Value}</TableCell>
                      <TableCell component="th" scope="row"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
