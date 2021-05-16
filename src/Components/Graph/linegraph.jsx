import { Timeline } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Line } from "react-chartjs-2";

import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "20rem",
    textAlign: "center",
    marginLeft: "1rem",
  },

  card: {
    minWidth: 50,
    maxWidth: "100%",
  
    backgroundColor: "white",
    boxShadow: '0 7px 30px -10px rgba(150,170,180,0.5)',

    display: "flex",
    justifyContent: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    paddingLeft: "-2rem",
  },
}));

const Linegraph = ({ countryList }) => {
  const classes = useStyles();
  const [country, setCountry] = useState("India");
  const [date, setDate] = useState([]);
  const [caseCount, setCaseCount] = useState([]);
  const [recoveredCount,setRecoveredCount]= useState([]);
  const[deathsCount,setDeathsCount]= useState([])

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const url = `https://disease.sh/v3/covid-19/historical?lastdays=7`;

  useEffect(() => {
  

    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      const dataArr = [];

      data.map((key, idx) =>
        dataArr.push({ country: key.country, cases: key.timeline.cases, recovered: key.timeline.recovered, deaths: key.timeline.deaths })
      );
    

      
      let selected = [];
      console.log(dataArr);
     

      selected.push(dataArr.find((el) => el.country === country));

      console.log(selected);

      const cases = selected ? selected.map((el) => el?.cases) : [];
      const recovered = selected ? selected.map((el) => el?.recovered) : [];
      const deaths = selected ? selected.map((el) => el?.deaths) : [];


      console.log(cases,recovered,deaths);

      cases.map((el) => {
        var month = Object.keys(el);

        for (var i = 0; i < month.length; i++) {
          var n = month[i][0];

          console.log(n);
        }

        console.log(n);

        n = 5;

        if (n === 5) {
          var x = Object.values(el);
          console.log(x);
        }
      });

      const dates = cases ? Object.keys(cases[0]) : "";

      const casesCount = cases ? Object.values(cases[0]) : "";

      const recoveredCount = recovered ? Object.values(recovered[0]) : "";
      const deathsCount = deaths ? Object.values(deaths[0]) : "";

      


      console.log(casesCount,deathsCount);
      setDate(dates);
      setCaseCount(casesCount);
      setRecoveredCount(recoveredCount)
      setDeathsCount(deathsCount)
    };

    fetchData();
  }, []);

 
  const caseslineChart = caseCount ? (
    <Line
      data={{
        labels: date,
        datasets: [
          {
            data: caseCount,
            label: "Infected",
            borderColor: "blue",
            fill: false,
            backgroundColor: "blue",
          },
        ],
      }}
    />
  ) : null;

  const recoveredlineChart = recoveredCount ? (
    <Line
      data={{
        labels: date,
        datasets: [
          {
            data: recoveredCount,
            label: "Recovered",
            borderColor: "green",
            fill: false,
            backgroundColor:"green",
          },
        ],
      }}
    />
  ) : null;

  const deathslineChart = deathsCount ? (
    <Line
      data={{
        labels: date,
        datasets: [
          {
            data: deathsCount,
            label: "Deaths",
            borderColor: "#e23028",
            fill: false,
            backgroundColor: "#e23028",
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className="line-graph-container">
      <div className="input-field">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Country
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={country}
            onChange={handleChange}
            label="Country"
          >
            {countryList.map((val, idx) => (
              <MenuItem value={val.name}>{val.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="graph-data">
        <div className="cases-graph">
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {caseslineChart}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="recovered-graph">
        <div className="cases-graph">
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
        {recoveredlineChart}
              </Typography>
            </CardContent>
          </Card>
        </div>
        </div>
        <div className="death-graph">
        <div className="cases-graph">
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
       {deathslineChart}
              </Typography>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Linegraph;
