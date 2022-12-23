import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AddAssetProperty from "./AddAssetProperty";

function EditAsset() {
  const { id } = useParams();
  const [asset, setAsset] = useState({});
  const [assetName, setAssetName] = useState("");
  const assetPropsRef = useRef();

  const handleAssetUpdate = () => {
    const body = {
      id: id,
      name: assetName,
      assetJson: JSON.stringify(assetPropsRef.current.inputFields),
    };
    axios
      .put(`${process.env.REACT_APP_API_URL}Assets/${id}`, body)
      .then((res) => {
        setAsset({
          assetName: res.data.name,
          assetJson: JSON.stringify(assetPropsRef.current.inputFields),
        });
        setAssetName(res.data.name);
      });
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
    FetchAsset(id);
  },[]);

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
          <Button variant="contained" onClick={handleAssetUpdate}>
            Update Asset
          </Button>
        </Grid>
        <Grid item xs={9} container spacing={3}>
          {asset.assetProps && (
            <AddAssetProperty ref={assetPropsRef} asset={asset} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default EditAsset;
