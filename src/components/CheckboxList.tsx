import * as React from "react";
import { observer } from "mobx-react-lite";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Todos } from "../models/todos";
import TodosStore from "../store/TodosStore";

interface Props {
  todos?: Todos[];
}

export const CheckboxList = observer(({ todos = [] }: Props) => {
  const {
    addTodos,
    changeStatusTodos,
    deleteCompletedTodos,
    addTodosLocal,
    localTodos,
    countOfStatus,
  } = TodosStore;
  const [checked, setChecked] = React.useState<boolean | null>(null);
  const [value, setValue] = React.useState("one");
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    addTodosLocal(todos);
  }, [addTodosLocal, todos]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === "one") {
      setChecked(null);
    }
    if (newValue === "two") {
      setChecked(true);
    }
    if (newValue === "three") {
      setChecked(false);
    }
  };

  const addTask = () => {
    if (title.length) {
      addTodos(title);
      setTitle("");
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        minWidth: 600,
        bgcolor: "background.paper",
        padding: "30px",
      }}
    >
      <Toolbar sx={{ color: "grey", justifyContent: "center" }}>
        <Typography variant="h3" component="div">
          TODOS
        </Typography>
      </Toolbar>

      <Box
        sx={{ display: "flex", alignItems: "flex-end", paddingBottom: "5px" }}
      >
        <TextField
          sx={{ width: "100%", paddingRight: "15px", bgcolor: "white" }}
          id="input-with-sx"
          label="What needs to be done?"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!title.length ? true : false}
        />
        <Button
          variant="contained"
          onClick={addTask}
          disabled={!title.length ? true : false}
        >
          Add
        </Button>
      </Box>
      {localTodos.length ? (
        localTodos
          .filter((e) =>
            checked === null
              ? e.status === true || e.status === false || true
              : e.status === checked
          )
          .map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            const line = value.status === true ? "none" : "line-through";

            return (
              <ListItem key={value.id} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={() => changeStatusTodos(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={!value.status}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "black", textDecoration: line }}
                    id={labelId}
                    primary={value.name}
                  />
                </ListItemButton>
              </ListItem>
            );
          })
      ) : (
        <ListItem disablePadding>
          <ListItemText
            sx={{ color: "red", textAlign: "center" }}
            primary={"The list is empty. Add tasks"}
          />
        </ListItem>
      )}

      <Box
        sx={{ width: "100%", justifyContent: "space-around", display: "flex" }}
      >
        <Button disabled>{countOfStatus} items left</Button>
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="All" wrapped />
          <Tab value="two" label="Active" />
          <Tab value="three" label="Completed" />
        </Tabs>
        <Button onClick={() => deleteCompletedTodos()}>Clear completed</Button>
      </Box>
    </List>
  );
});
