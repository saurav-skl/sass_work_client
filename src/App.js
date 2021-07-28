import "./App.css";

import {
  Container,
  makeStyles,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import MenuIcon from "@material-ui/icons/Menu";

import itemData from "./items";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    // backgroundColor: theme.palette.background.paper,
    width: "100vw",
    height: "80vh",
    alignItems: "center",
  },
  imageList: {
    width: 500,
    height: 450,
    // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  textField: {
    border: "0",
    margin: "0 auto",
    padding: "0",
    position: "relative",
    minWidth: "0",
    flexDirection: "column",
    verticalAlign: "top",
    width: "300px",
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  btn: {},
}));

const handleClick = (id) => {
  fetch(`https://track-app-1.herokuapp.com/single-item/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      res.json();
    })
    .catch((err) => console.log(err));
};

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => handleClick("60fe69cf17a4971f0c982576")}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            User Click Events Tracker
          </Typography>
          <Button
            color="inherit"
            onClick={() => handleClick("60fe95f300f0b030641cfad4")}
          >
            Welcome
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.root}>
        <ImageList rowHeight={200} gap={1} className={classes.imageList}>
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.featured ? 2 : 1}
              rows={item.featured ? 2 : 1}
            >
              <img src={item.img} alt={item.title} />
              <ImageListItemBar
                title={item.title}
                position="top"
                actionIcon={
                  <IconButton
                    aria-label={`star ${item.title}`}
                    className={classes.icon}
                  >
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar}
                onClick={() => handleClick(item.id)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </div>
  );
}

export default App;
