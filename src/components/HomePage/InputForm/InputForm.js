import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Stopwatch from "./Stopwatch/Stopwatch";
import axios from "axios";
import { toast } from "react-toastify";
import firebaseErrorCodes from "../../../helpers/firebaseErrorCodes";
import useGlobalContext from "../../../context/GlobalContext";
import Collapse from "@mui/material/Collapse";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { v4 as uuidv4 } from "uuid";



const StyledInput = styled(TextField)`
width: 100%;
& .MuiOutlinedInput-notchedOutline {
  border-color: #f3ab40;

}
& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  border-color: white;
  color:red
}`;

export default function InputForm() {

  const { toastifyTheme } =  useGlobalContext();

  const [values, setValues] = useState({
    promptName: "",
    difficulty: "",
    promptLink: "",
    promptText: '',
    timeComplexity: "",
    solution: "",
    programmingLanguage: "Javascript",
    readTime: 0,
    whiteBoardTime: 0,
    pseudocodeTime: 0,
    codeTime: 0,
    topic: "",
  });

  const [times, setTimes] = useState(0);

  const [constraintVal, setConstraintVal] = useState(["press enter to add"]);

  const [currConstraint, setCurrConstraint] = useState("");

  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      setConstraintVal((oldState) => [...oldState, e.target.value]);
      setCurrConstraint("");
    }
  };


  const handleDelete = (item, index) => {
    let arr = [...constraintVal];
    arr.splice(index, 1);
    setConstraintVal(arr)
  }

  const handleConChange = (e) => {
    setCurrConstraint(e.target.value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();
    axios.post(
      "/records",
      {
        ...values,
        id: uuidv4(),
        constraints: constraintVal,
        solution: values.solution.split(", "),
        time: times,
        timeStamp: new Date().toISOString(),
        timeStampinfo: {
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
          year: new Date().getFullYear()
        }
      },
      {
        params: {
          userID: sessionStorage.getItem("UserID")
        },
      }
    )
      .then(() => {
        setValues({
        promptName: "",
        difficulty: "",
        promptLink: "",
        promptText: "",
        timeComplexity: "",
        solution: "",
        programmingLanguage: "",
        readTime: 0,
        whiteBoardTime: 0,
        pseudocodeTime: 0,
        codeTime: 0,
        topic: "",
      })
        setTimes(0);
        setConstraintVal(["press enter to add"]);
        toast.success("Data submitted successfully", toastifyTheme);
      })
      .catch((err) => {
        firebaseErrorCodes(err.response.data.code, toastifyTheme);
      });
  };

  useEffect(() => {
  }, [constraintVal]);


  let leetTopics = [
    "Arrays",
    "Maps",
    "Linked Lists",
    "Queues",
    "Heaps",
    "Stacks",
    "Trees",
    "Graphs",
    "Breadth-First-Search",
    "Depth-First-Search",
    "Binary Search",
    "Recursion",
    "Backtracking",
    "Dynamic Programming",
    "Trie",
    "Matrix",
    "Sorting"
    ];

  return (
    <Stack
      sx={{ width: 200, mt: "10px", mx: "10px", minWidth: 18 }}
     >
      <Stack
        sx={{
          width: 200,
          mt: 0,
          mx: "10px",
          padding: "25px",
          borderRadius: "10px",
          backgroundColor: "#1A2027",
          minWidth: 17,
        }}
        spacing={2}
        component={"form"}
        onSubmit={(e) => handleSubmit(e, values)}
      >

        <Typography variant="subtitle1">Begin your journey here!</Typography>

        <FormControl variant="outlined" size="small" required>
          <StyledInput
            size="small"
            variant="outlined"
            color="success"
            required
            type="text"
            label="Prompt Name"
            id="outlined-basic"
            name="promptName"
            value={values.promptName}
            onChange={(e) => handleChange(e)}
          />
        </FormControl>

        <FormControl variant="outlined" size="small" required>
          <StyledInput
            required
            select
            color="success"
            labelId="difficulty-label"
            label="Difficulty"
            name="difficulty"
            value={values.difficulty}
            variant="outlined"
            onChange={(e) => handleChange(e)}
            size="small"
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </StyledInput>
        </FormControl>

        <FormControl variant="outlined" size="small" required>
          <StyledInput
            required
            select
            color="success"
            labelId="language-label"
            label="Language"
            name="programmingLanguage"
            value={values.programmingLanguage}
            variant="outlined"
            onChange={(e) => handleChange(e)}
            size="small"
          >
            <MenuItem value="Javascript">Javascript</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="C++">C++</MenuItem>
            <MenuItem value="Kotlin">Kotlin</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="Swift">Swift</MenuItem>
            <MenuItem value="C#">C#</MenuItem>
            <MenuItem value="PHP">PHP</MenuItem>
          </StyledInput>
        </FormControl>

        <FormControl variant="outlined" size="small" required >
          <StyledInput
            required
            select
            color="success"
            labelId="topic-label"
            label="Topic"
            name="topic"
            value={values.topic}
            variant="outlined"
            onChange={(e) => handleChange(e)}
            size="small"
          >
            {leetTopics.map((topic) => (
              <MenuItem key={topic} value={topic}>
                {topic}
              </MenuItem>
            ))}
          </StyledInput>
        </FormControl>

        <Stopwatch
          times={times}
          setTimes={setTimes}
        />
        <Collapse in={ expand } >
          <Stack spacing={1} sx={{maxHeight: "25vh", overflowY: "auto"}}>
            <Typography variant="subtitle1" >Additional Fields</Typography>
            <FormControl variant="outlined" size="small">
              <StyledInput
                size="small"
                variant="outlined"
                color="success"
                type="text"
                label="Prompt Link"
                id="outlined-basic"
                name="promptLink"
                value={values.promptLink}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>

            <FormControl variant="outlined" size="small">
              <StyledInput
                size="small"
                variant="outlined"
                color="success"
                type="text"
                multiline
                rows={4}
                label="Prompt Text"
                name="promptText"
                value={values.promptText}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>

            <FormControl variant="outlined">
              <div style={{marginBottom: "5px"}}>
                {constraintVal.map((item, index) => (
                  <Chip key={item} size="small" onDelete={() => handleDelete(item, index)} label={item} />
                ))}
              </div>
              <StyledInput
                size="small"
                variant="outlined"
                color="success"
                multiline
                rows={4}
                label="Constraints"
                value={currConstraint}
                onChange={handleConChange}
                onKeyDown={handleKeyUp}
              />
            </FormControl>

            <FormControl variant="outlined">
              <StyledInput
                select
                color="success"
                labelid="language-label"
                label="Time Complexity"
                name="timeComplexity"
                value={values.timeComplexity}
                variant="outlined"
                onChange={(e) => handleChange(e)}
                size="small"
              >
                <MenuItem value="O(1)">O(1)</MenuItem>
                <MenuItem value="O(log n)">O(log n)</MenuItem>
                <MenuItem value="O(n)">O(n)</MenuItem>
                <MenuItem value="O(n log n)">O(n log n)</MenuItem>
                <MenuItem value="O(n^2)">O(n^2)</MenuItem>
              </StyledInput>
            </FormControl>

            <FormControl variant="outlined" size="small" >
              <StyledInput
                size="small"
                variant="outlined"
                color="success"
                type="text"
                multiline
                rows={4}
                label="Solution"
                name="solution"
                value={values.solution}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>

          </Stack>
        </Collapse>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
           <Button
            sx={{backgroundColor: "#f3ab40", color: "#597081", marginRight: "1px" }}
              variant="contained"
              type="button"
              size="medium"
              onClick={(e) => toggleExpand(e)}
            >
              { expand ? (<ArrowDropUp/>) : (<ArrowDropDown/>) }
            </Button>
            <Button
              sx={{backgroundColor: "#f3ab40", marginLeft: "1px" }}
              variant="outlined"
              type="submit"
              size="medium"
              onClick={(e) => handleSubmit(e, values)}
            >
              Submit
            </Button>
          </Box>
      </Stack>
    </Stack>
  );
}
