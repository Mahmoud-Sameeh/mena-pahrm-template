import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Container } from "@mui/system";
import { TextField, Grid, Button, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

const AddAssetProperty = forwardRef((props, ref) => {
  const { id } = useParams();
  const [assetsInfo, setInputFields] = useState([]);

  const handleChangeInput = (id, event) => {
    const newInputFields = assetsInfo.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };


  const handleAddFields = () => {
    setInputFields([...assetsInfo, { id: uuidv4() }]);
  };

  const handleRemoveFields = (id) => {
    const values = [...assetsInfo];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  useEffect(() => {
    if (id) {
      setInputFields(props?.asset.assetProps);
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      inputFields: assetsInfo,
    }),
    [assetsInfo]
  );

  return (
    <div>
      <Container>
        <Button onClick={handleRemoveFields}>Delete</Button>
        <Button onClick={handleAddFields}>Add</Button>
        {assetsInfo.map((assetInfo, index) => (
          <Grid item key={index} md={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                name="Key"
                label="Key"
                value={assetInfo.Key}
                onChange={(event) => handleChangeInput(assetInfo.id, event)}
              />
              <TextField
                name="Value"
                label="Value"
                value={assetInfo.Value}
                onChange={(event) => handleChangeInput(assetInfo.id, event)}
              />
            </Box>
          </Grid>
        ))}
      </Container>
    </div>
  );
});
export default AddAssetProperty;
