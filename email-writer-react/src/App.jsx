import { useState } from 'react'
import axios from 'axios';

import { Typography, CircularProgress, Container, FormControl, InputLabel } from '@mui/material';
import { TextField, Select, MenuItem, Button, Box } from '@mui/material';

import './App.css'

function App() {
  const[emailContent, setEmailContent]=useState('');
  const[tone, setTone]=useState('');
  const[generateReply,setGeneratedReply]=useState('');
  const[loading, setLoading]=useState('');
  const[error,setError]=useState('');
  

  const handleSubmit = async() => {
    setLoading(true);
    setError('');
    try{
      const response = await axios.post("http://localhost:8080/api/email/generate",
      {emailContent,
      tone});
      setGeneratedReply(response.data);


    }
    catch(error){
      setError('Failed to generate email reply. Please try again');
      console.log(error);
    }
    finally{
      setLoading(false);
    }

  };


  return (
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Replay Generator

      </Typography>
      <Box sx={{mx:3}}>
        <TextField
        fullWidth
        multiline
        rows={6}
        variant='outlined'
        label='Original Email Content'
        value={emailContent || ''}
        onChange={(e)=> setEmailContent(e.target.value)}
        sx={{mb:2}}/>
        <FormControl fullWidth sx={{mb : 2}}>
          <InputLabel>
          Tone (optional)</InputLabel>
          <Select
          value={tone || ''}
          label={"Tone (Optional)"}
          onChange={(e)=>setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">professional</MenuItem>
            <MenuItem value="casual">casual</MenuItem>
            <MenuItem value="friendly">friendly</MenuItem>


          </Select>
        </FormControl>
        <Button
        variant='contained'
        onClick={handleSubmit}
        disabled={!emailContent || loading}
        fullWidth
        >
          {loading? <CircularProgress size={24}/> : "Generate Reply"}
        </Button>


       

      </Box>
      {error && (
        <Typography color='error' sx={{mb:2}}>
          {error}


        </Typography>
      )}

      {generateReply && (
        <Box sx={{mt : 3}} >
          <Typography variant='h6' gutterBottom>
            Generated Reply: 

          </Typography>
          <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          value={generateReply || ''}
          inputProps={{readOnly : true}}
          />
          <Button 
          variant='outlined'
          sx={{mt:2}}
          onClick={() => navigator.clipboard.writeText(generateReply)}
          >
            Copy to Clipboard
          </Button>

        </Box>

      )}
     
    </Container>
  )
}

export default App