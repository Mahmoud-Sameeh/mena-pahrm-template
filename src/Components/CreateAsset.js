import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddAssetProperty from "./AddAssetProperty";

function CreateAsset() {
  const { id } = useParams();
  const assetPropsRef = useRef();
  const [asset, setAsset] = useState({});
  const [assetName, setAssetName] = useState("");
const navigate = useNavigate();
  const handleCreateAsset = () => {
    const body = {
      name: assetName,
      assetJson: JSON.stringify(assetPropsRef.current.inputFields.filter(a=>a.Key!==''&&a.Value!=='')),
    };
    axios.post(`${process.env.REACT_APP_API_URL}Assets`, body).then(() => {});
    navigate("/")
  };

  const FetchAsset = (id) => {
    axios.get(`${process.env.REACT_APP_API_URL}Assets/${id}`).then((res) => {
      setAsset({
        id: res.data.id,
        assetName: res.data.name,
        assetProps: JSON.parse(res.data.assetJson),
      });
      setAssetName(res.data.name);
    });
  };

  useEffect(() => {
    if (id) {
      FetchAsset(id);
    }
  });

  return (
    <>
      <Grid container spacing={3} padding={5}>
        <Grid item xs={2.5}>
          <TextField
            label="Asset Name"
            variant="outlined"
            autoComplete="off"
            value={assetName}
            inputProps={{ style: { fontSize: 15 } }}
            InputLabelProps={{ style: { fontSize: 15, color: "GrayText" } }}
            onChange={(e) => {
              setAssetName(e.target.value);
            }}
          />
          <br />
          <br />

          <Button variant="contained" onClick={handleCreateAsset}>
            Create Asset
          </Button>
        </Grid>
        <Grid item xs={9} container spacing={3}>
            <AddAssetProperty ref={assetPropsRef}  />
        </Grid>
      </Grid>
    </>
  );
}

export default CreateAsset;
