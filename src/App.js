import { React, useEffect, useState } from "react";
import {
  Container,
  Typography,
  GridList,
  Box,
  Button,
  GridListTile,
  Slider,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import "./App.css";
import JsonAPI from "./JsonAPI";

// TODO: Lomake eri näkymään
// TODO: Objectiven poistaminen
// TODO: Käyttäjänimi

const styles = (theme) => ({
  color: {
    backgroundColor: "#bedbfa",
    border: "solid 1px black",
  },
});
const { postObjAsync, fetchObjective, putObjAsync } = JsonAPI();

const postObjective = async (user, objective, kr1, kr2, kr3) => {
  const data = {
    id: Math.random(1, 100000),
    user: user,
    objective: objective,
    kr1: kr1,
    kr1value: 0.0,
    kr2: kr2,
    kr2value: 0.0,
    kr3: kr3,
    kr3value: 0.0,
  };

  const res = await postObjAsync(data, "objectives");
  if (res.status === 200 || res.status === 201) {
    window.location.reload();
  } else if (res.status === 400) {
    console.log("Unable to submit idea", res.json());
  } else {
    console.log("This shouldn't happend");
    console.log(res.body);
  }
};

const updateObjective = async (kr, val, id) => {
  var krType= kr;
  try {
    const post = {
      [krType] : val,
      id: id,
    }
    const update = await putObjAsync(post, "objectives");
    const json = await update.json();
    console.log(json);
  } catch (e) {
    console.log(e);
  }
  window.location.reload();
};

const App = () => {
  const [objectives, setObjectives] = useState([]);
  const [values, setValues] = useState({
    objective: "",
    kr1: "",
    kr2: "",
    kr3: "",
    krAvg: 0.0,
  });

  useEffect(() => {
    const getObjectives = async () => {
      const res = await fetchObjective("objectives");
      setObjectives(res);
    };
    getObjectives();
  }, []);

  const myChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const ObjectiveItem = (objective) => {
    return (
      <GridListTile
        key={objective.id}
        cols={1}
        style={{ border: "solid 2px blue", margin: "0.2em", width: "45%" }}
      >
        <Typography>Objective: {objective.objective}</Typography>
        <br></br>
        <div className="kr1">
          <Typography>{objective.kr1}</Typography>

          <Slider
            onChangeCommitted={ (e, val) => updateObjective("kr1value",val, objective.id) }
            aria-labelledby="kr1Slider"
            name = "kr1Slider"
            aria-label={objective.kr1}
            defaultValue={objective.kr1value ? objective.kr1value : 0}
            step={0.1}
            marks
            min={0.0}
            max={1.0}
            valueLabelDisplay="auto"
            style={{ width: "60%", marginLeft: "2em" }}
          />
        </div>
   
        <div className="kr2">
          <Typography>{objective.kr2}</Typography>
          <Slider
            onChangeCommitted={ (e, val) => updateObjective("kr2value",val, objective.id) }
            aria-label={objective.kr2value}
            aria-labelledby="kr2Slider"
            defaultValue={objective.kr2value ? objective.kr2value : 0}
            step={0.1}
            marks
            min={0.0}
            max={1.0}
            valueLabelDisplay="auto"
            style={{ width: "60%", marginLeft: "2em" }}
          />
        </div>

        <div className="kr3">
          <Typography>{objective.kr3}</Typography>
          <Slider
            onChangeCommitted={ (e, val) => updateObjective("kr3value",val, objective.id) }
            aria-label={objective.kr3}
            aria-labelledby="kr3Slider"
            defaultValue={objective.kr3value ? objective.kr3value : 0}
            step={0.1}
            marks
            min={0.0}
            max={1.0}
            valueLabelDisplay="auto"
            style={{ width: "60%", marginLeft: "2em" }}
          />
        </div>
        <br></br>
        <Typography>Average: {Math.round(((objective.kr1value + objective.kr2value + objective.kr3value) / 3)*10)/10} </Typography>
      </GridListTile>
    );
  };

  return (
    <Box style={{ marginTop: "0.3em" }}>
      <Container
        maxWidth="xs"
        style={{
          border: "solid 2px blue",
          marginBottom: "1em",
          paddingBottom: "0.6em",
        }}
      >
        <form>
          <h1>Submit an objective and it's key results</h1>
          <p>Objective</p>
          <input type="text" name="objective" onChange={myChangeHandler} />
          <p>Key result 1</p>
          <input type="text" name="kr1" onChange={myChangeHandler} />
          <p>Key result 2</p>
          <input type="text" name="kr2" onChange={myChangeHandler} />
          <p>Key result 3</p>
          <input type="text" name="kr3" onChange={myChangeHandler} />
          <br />
          <br />
          <Button
            variant="outlined"
            onClick={() =>
              postObjective(
                "Matti Meikäläinen",
                values.objective,
                values.kr1,
                values.kr2,
                values.kr3
              )
            }
          >
            Submit
          </Button>
        </form>
      </Container>
      <Container maxWidth="lg">
        <GridList
          cellHeight={260}
          spacing={15}
          cols={2}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {objectives?.map((objective) => {
            return ObjectiveItem(objective);
          })}
          ,
        </GridList>
      </Container>
    </Box>
  );
};

export default withStyles(styles)(App);
