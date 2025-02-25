import React from "react";
import { useTranslation } from "react-i18next";
import { Divider, Typography, Paper, useMediaQuery, useTheme, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getItemIcon } from "General/Engine/ItemUtilities";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderColor: theme.palette.secondary.main,
    padding: 8,
    height: 175,
  },
  container: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    height: "100%",
  },
  description: {
    maxHeight: "calc(100% - 10px)",
    overflowY: "auto",
  },
}));

function ItemDetailCard(props) {
  const item = props.item;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const titleFontSize = isXs ? "0.8rem" : item.slot === "Trinket" ? "0.9rem" : "1rem";
  const metricPadding = isXs ? "2px" : "8px";

  const coloredDescription = item.description //item.description.replace(/Trinket/g, '<span style="color: red;">Trinket</span>');

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.container}>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <a data-wowhead={`item=${item.id}&domain=${currentLanguage}`}>
              <img height={40} width={40} src={getItemIcon(item.id)} alt="" style={{ borderRadius: 4, borderWidth: "1px", borderStyle: "solid", borderColor: "#ff8000" }} />
            </a>
            <div style={{ marginLeft: 8 }}>
              <Typography color="primary" variant="h6" component="h2" style={{ fontSize: titleFontSize, alignSelf: "center", lineHeight: 1 }}>
                {item.name}
              </Typography>
              {item.slot === "Trinket" ? <Typography variant="caption">{item.slot}</Typography> : ""}
            </div>
          </div>
          <Divider />
        </div>
        <div className={classes.description}>
          <Typography variant="body2" color="text.secondary" component="div" dangerouslySetInnerHTML={{ __html: coloredDescription }} />
        </div>
        <div>
          <Divider />
          <div style={{ textAlign: "center", lineHeight: 1.1, fontSize: "16px", paddingTop: metricPadding }}>
            <Grid item xs={12} container spacing={1}>
              {item.metrics.map((metric, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm>
                    <Typography align="center" style={{ lineHeight: 1.1, fontSize: "16px" }}>
                      {metric}
                    </Typography>
                  </Grid>
                  {index !== item.metrics.length - 1 && (
                    <Grid item xs={12} sm="auto">
                      <Divider orientation="vertical" />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default ItemDetailCard;
