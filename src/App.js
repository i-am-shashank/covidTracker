import { react, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "./Components/Card/index";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../src/App.css";
import Table from "./Components/Table/index";
import Graph from "../src/Components/Graph/index";
import Linegraph from "../src/Components/Graph/linegraph";
import CountUp from "react-countup";

const App = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
      color: "red",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  let URL = "https://disease.sh/v3/covid-19/all";

  let countryURL = "https://disease.sh/v3/covid-19/countries";

  const [allData, setAllData] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [value, setValue] = useState(0);
  const [casesData, setCasesData] = useState(null);

  let recovered;
  const [recoveredData, setRecoveredData] = useState(null);
  const [newCasesData, setNewCasesData] = useState(null);
  const [globalTodayRecoveryData, setGlobalTodayRecoveryData] = useState(null);
  const [globalTodayDeathData, setGlobalTodayDeathData] = useState(null);

  const [deathsData, setDeathsData] = useState(null);

  const [countryTodayCasesData, setcountryTodayCasesData] = useState(null);
  const [countryTodayRecoveryData, setCountryTodayRecoveryData] = useState(
    null
  );
  const [countryTodayDeathData, setCountryTodayDeathData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //allData
      const res = await fetch(URL);

      const data = await res.json();

      setAllData(data);

      //countryList

      const res2 = await fetch(countryURL);
      const contData = await res2.json();
      console.log(data);
      let countryArr = [];

      countryArr = contData.map((key, idx) => ({
        name: key.country,
        value: key.countryInfo.iso2,
      }));

      console.log(countryArr);
      setCountryList(countryArr);
      setAllData(data);

      setNewCasesData(data.todayCases);
      setGlobalTodayRecoveryData(data.todayRecovered);
      setGlobalTodayDeathData(data.todayDeaths);
    };

    fetchData();
  }, []);

  recovered = allData?.recovered;

  const handleChange = async (e) => {
    const inputVal = await e.target.value;

    setCountry(inputVal);

    console.log(inputVal);

    let URL = "https://disease.sh/v3/covid-19/all";

    let countrySpecificUrl = `https://disease.sh/v3/covid-19/countries/${inputVal}`;

    const fetchCountryData = async () => {
      const res = await fetch(
        inputVal === "Worldwide" ? URL : countrySpecificUrl
      );

      const data = await res.json();
      const countryRecoveredCount = data.recovered;
      const countryDeathscount = data.deaths;

      console.log(data);

      console.log(countryRecoveredCount);

      setRecoveredData(countryRecoveredCount);
      setDeathsData(countryDeathscount);
      setCasesData(data.cases);

      setcountryTodayCasesData(data.todayCases);
      setCountryTodayRecoveryData(data.todayRecovered);
      setCountryTodayDeathData(data.todayDeaths);

      inputVal === "Worldwide" ? setValue(0) : setValue(1);
    };

    fetchCountryData();
  };

  let cases = allData?.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let worldRecoveredData = allData?.recovered
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let worldDeathsData = allData?.deaths
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let countryRecoveredData = recoveredData
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let countryDeathsData = deathsData
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let countryCasesData = casesData
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      <div className='container'>
        <div className='sections-container'>
        <div className="section-1">
          <div className="table">
            <Table />
          </div>
          <div className="card-container">
            <div className="input-field">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="Worldwide">Worldwide</MenuItem>

                  {countryList.map((val, idx) => (
                    <MenuItem value={val.name}>{val.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="card-content">
              <div className="card3">
                <Card
                  title="Cases"
                  count={value === 0 ? cases : countryCasesData}
                  todayGlobalData={
                    value === 0 ? newCasesData : countryTodayCasesData
                  }
                />
              </div>
              <div className="card2">
                <Card
                  title="Recovered"
                  count={
                    value === 0 ? worldRecoveredData : countryRecoveredData
                  }
                  todayGlobalData={
                    value === 0
                      ? globalTodayRecoveryData
                      : countryTodayRecoveryData
                  }
                />
              </div>

              <div className="card3">
                <Card
                  title="Deaths"
                  count={value === 0 ? worldDeathsData : countryDeathsData}
                  todayGlobalData={
                    value === 0 ? globalTodayDeathData : countryTodayDeathData
                  }
                />
              </div>
            </div>
            <div className="graph-container">
              <Graph
                recovered={recoveredData}
                death={deathsData}
                worldCasesData={allData?.cases}
                worldRecoveredData={allData?.recovered}
                worldDeathsData={allData?.deaths}
                input={country}
              />
            </div>
          </div>
          <div className="title">
            <h1> Covid Tracker </h1>
          </div>
        </div>

        <div className="section-2">
          <div className="table-desktop">
            <Table />
          </div>
          <div className="line-graph">
            <Linegraph countryList={countryList} />
          </div>
        </div>
        
        </div>
        <footer className='footer'>
          <div className='footer-text'> 
            <h1>covid-19</h1>  
            <h5> Let's fight it together. </h5>
            </div>
          
     
        </footer>
      </div>
    </>
  );
};

export default App;
