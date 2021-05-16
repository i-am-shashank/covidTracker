import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from '@material-ui/core/Grid';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CountUp from 'react-countup'

export default function Cardoutline({ title, count, todayGlobalData }) {



  const useStyles = makeStyles({
    deathCard: {
      minWidth: 50,
      maxWidth: "100%",
      width: 100,
      height: 90,
      backgroundColor: "white",
      boxShadow: '0 7px 30px -10px rgba(150,170,180,0.5)',
      borderBottom: "6px solid red",
      display:'flex',
      justifyContent:'center'
    },
    recoveredCard: {
      minWidth: 50,
      maxWidth: "100%",
      width: 100,
      height: 90,
      backgroundColor: "white",
      boxShadow: '0 7px 30px -10px rgba(150,170,180,0.5)',
      borderBottom: "6px solid green",
      display:'flex',
      justifyContent:'center'
    },

    casesCard: {
      minWidth: 50,
      maxWidth: "100%",
      width: 100,
      height: 90,
      backgroundColor: "white",
      boxShadow: '0 7px 30px -10px rgba(150,170,180,0.5)',
      borderBottom: "6px solid blue",
      display:'flex',
      justifyContent:'center'
    },

    title: {
      fontSize: '1rem',
      color: "black",
   textTransform:'uppercase',
      fontFamily: "Roboto Condensed, sans-serif",
    },
    pos: {
      marginTop: 2,
      fontSize:'1rem',
      fontFamily: "Roboto Condensed, sans-serif",
    },

    subCases:{

      fontSize:'0.75rem',
      fontFamily: "Roboto Condensed, sans-serif",
      color:'blue'
    },

    subDeath:{

      fontSize:'0.75rem',
      fontFamily: "Roboto Condensed, sans-serif",
      color:'red'
    },
    subRecovered:{

      fontSize:'0.75rem',
      fontFamily: "Roboto Condensed, sans-serif",
      color:'green'
    }
  });
  const classes = useStyles();

  return (

    <Grid> 
      
    <Card
      className={title==='Recovered' ? classes.recoveredCard : (title==='Cases'? classes.casesCard:classes.deathCard)}
      variant="outlined"
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography className={title==='Recovered' ? classes.subRecovered : (title==='Cases'? classes.subCases:classes.subDeath)}color="textSecondary">
          +{todayGlobalData}
        </Typography>
        <Typography variant="h5" component="h2" className={classes.pos}>
        {count}


      
        </Typography>
        
      </CardContent>
    </Card>
    </Grid>
  );
}
