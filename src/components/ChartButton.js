import { makeStyles } from "@material-ui/core";
import React from "react";

const ChartButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    chartButton: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Mulish",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 450,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.chartButton}>
      {children}
    </span>
  );
};

export default ChartButton;
