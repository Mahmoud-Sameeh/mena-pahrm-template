import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TextField,
  Alert,
  Snackbar,
  Stack,
} from "@mui/material";
import axios from "axios";
import Row from "./TableComponents/Row.js";
import { useNavigate } from "react-router-dom";

function AssetList() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
  });
  const [assets, setAssets] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchAssets = async () => {
    axios.get(`${process.env.REACT_APP_API_URL}Assets`).then((res) => {
      setAssets(
        res.data.map((a) => ({
          id: a.id,
          name: a.name,
          assetProperties: JSON.parse(a.assetJson),
          hide: false,
        }))
      );
    });
  };

  const deleteAsset = (id) => {
    axios
      .delete(`https://localhost:7036/api/Assets/${id}`)
      .then(() => {
        setAssets(assets.filter((a) => a.id !== id));
        setOpen(true);
        setAlert({
          severity: "success",
          message: "Asset has been deleted successfuly",
        });
      })
      .catch(() => {
        setOpen(true);
        setAlert({
          severity: "error",
          message: "Error ocurred while deleting an asset",
        });
      });
  };

  const handleSearch = (e) => {
    setAssets((current) =>
      current.map((item) => {
        if (e.target.value === "") return { ...item, hide: false };

        if (item.name.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()))
          return { ...item, hide: false };

        return { ...item, hide: true };
      })
    );
  };

  const handleCreateAsset = (e) => {
    navigate("/create-asset");
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">
                <h2>Assets</h2>
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleCreateAsset}
                >
                  <Typography sx={{ textTransform: "capitalize" }}>
                    Create Asset
                  </Typography>
                </Button>
              </TableCell>
              <TableCell align="right">
                <TextField
                  label="Search by Asset Name"
                  onChange={handleSearch}
                />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {assets.map(
              (assetInfo) =>
                !assetInfo.hide && (
                  <Row
                    key={assetInfo.name}
                    row={assetInfo}
                    deleteAsset={deleteAsset}
                  />
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default AssetList;
