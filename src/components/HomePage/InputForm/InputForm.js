import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import Stopwatch from './Stopwatch/Stopwatch';
import axios from 'axios';
import { toast } from 'react-toastify';
import firebaseErrorCodes from '../../../helpers/firebaseErrorCodes';
import useGlobalContext from '../../../context/GlobalContext';


export default function InputForm() {
  const { toastifyTheme } =  useGlobalContext();

  const [times, setTimes] = useState(0);

  const [values, setValues] = useState({
    promptName: '',
    difficulty: '',
    promptLink: '',
    promptText: '',
    constraints: '',
    timeComplexity: '',
    solution: '',
    programmingLanguage: 'Javascript',
    readTime: 0,
    whiteBoardTime: 0,
    pseudocodeTime: 0,
    codeTime: 0,
    topic: '',
  });


  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value})
  }


  const handleSubmit = (e, values) => {
    e.preventDefault();
    axios.post('/records', {
      ...values,
      'constraints': values.constraints.split(', '),
      'solution': values.solution.split(', '),
      time: times,
      timeStamp: new Date().toISOString(),
      timeStampinfo: {
        'month': new Date().getMonth() + 1,
        'day': new Date().getDate(),
        'year': new Date().getFullYear()
      }
    }, {
      params: {
        userID: sessionStorage.getItem('UserID')
      }
    })
      .then(() => {
        setValues({
        promptName: '',
        difficulty: '',
        promptLink: '',
        promptText: '',
        constraints: '',
        timeComplexity: '',
        solution: '',
        programmingLanguage: '',
        readTime: 0,
        whiteBoardTime: 0,
        pseudocodeTime: 0,
        codeTime: 0,
        topic: '',
      })
        setTimes(0);
        toast.success('Data submitted successfully', toastifyTheme);
      })
      .catch((err) => {
        firebaseErrorCodes(err.response.data.code, toastifyTheme
      )});
  };


  let leetTopics = ['Arrays', 'Maps', 'Linked Lists', 'Queues', 'Heaps', 'Stacks', 'Trees', 'Graphs', 'Breadth-First-Search', 'Depth-First-Search', 'Binary Search', 'Recursion', 'Backtracking', 'Dynamic Programming', 'Trie', 'Matrix', 'Sorting'];

  return (
    <Stack
     className='beginning-inputs'
     sx={{width: 200}}
     >
       <Stack
        sx={{width: 200, marginLeft: '20px'}}
        spacing={2}
        component={'form'}
        onSubmit={(e) => handleSubmit(e, values)}
        >
            <Typography
              variant='subtitle1'
            >
              Begin your journey here!
            </Typography>
            <TextField
            size='small'
            variant='outlined'
            required
            type='text'
            id="outlined-basic"
            label="Prompt Name"
            name='promptName'
            value={values.promptName}
            onChange={(e) => handleChange(e)}
            />
            <FormControl variant='outlined' size='small' >
              <InputLabel id='difficulty-label'>Difficulty</InputLabel>
              <Select
                labelid='difficulty-label'
                name="difficulty"
                value={values.difficulty}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value='easy'>Easy</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='hard'>Hard</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant='outlined' size='small'>
              <InputLabel id='language-label'>Programming Language</InputLabel>
              <Select
              labelid='language-label'
                name="programmingLanguage"
                value={values.programmingLanguage}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value='Javascript'>Javascript</MenuItem>
                <MenuItem value='Python'>Python</MenuItem>
                <MenuItem value='Java'>Java</MenuItem>
                <MenuItem value='C++'>C++</MenuItem>
                <MenuItem value='Kotlin'>Kotlin</MenuItem>
                <MenuItem value='C'>C</MenuItem>
                <MenuItem value='Swift'>Swift</MenuItem>
                <MenuItem value='C#'>C#</MenuItem>
                <MenuItem value='PHP'>PHP</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant='outlined' size='small'>
              <InputLabel id='demo-simple-select-label'>Topic</InputLabel>
              <Select
              labelid='demo-simple-select-label'
              id='demo-simple-select'
              name='topic'
              value={values.topic}
              onChange={(e) => handleChange(e)}
              >
                {leetTopics.map((topic) => (
                  <MenuItem key={topic} value={topic}>
                    {topic}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stopwatch
              times={times}
              setTimes={setTimes}
            />
          {expand && (
            <Stack spacing={1}>
              <Typography
                variant='subtitle1'
              >
                Additional Fields
              </Typography>
              <TextField
                size='small'
                type='text'
                id="outlined-basic"
                label="Prompt Link"
                name='promptLink'
                value={values.promptLink}
                onChange={(e) => handleChange(e)}
              />
              <TextField
              size='small'
              label="Prompt Text"
              multiline
              rows={4}
              type='text'
              name='promptText'
              value={values.promptText}
              onChange={(e) => handleChange(e)}
              />
              <TextField
              size='small'
              label="Constraints"
              multiline
              rows={4}
              type='text'
              name='constraints'
              value={values.constraints}
              onChange={(e) => handleChange(e)}
              />
              <FormControl variant='outlined'>
                <InputLabel id='timecomplexity-label'>Time Complexity</InputLabel>
                <Select
                  labelid='timecomplexity-label'
                  name="timeComplexity"
                  value={values.timeComplexity}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value='O(1)'>O(1)</MenuItem>
                  <MenuItem value='O(log n)'>O(log n)</MenuItem>
                  <MenuItem value='O(n)'>O(n)</MenuItem>
                  <MenuItem value='O(n log n)'>O(n log n)</MenuItem>
                  <MenuItem value='O(n^2)'>O(n^2)</MenuItem>
                </Select>
              </FormControl>
              <TextField
              size='small'
                label="Solution"
                multiline
                rows={4}
                type='text'
                name='solution'
                value={values.solution}
                onChange={(e) => handleChange(e)}
                />

          </Stack>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
           <Button
              variant='contained'
              type='button'
              size='large'
              onClick={(e) => toggleExpand(e)}
            >
              { expand ? (<ArrowDropUp/>) : (<ArrowDropDown/>) }
            </Button>
            <Button
              variant='contained'
              type='submit'
              size='large'
              onClick={(e) => handleSubmit(e, values)}
            >
              Submit
            </Button>
          </Box>
      </Stack>
    </Stack>
  );
}

