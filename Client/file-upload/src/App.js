
import { React, useState } from 'react';

function App() {

  const [file, setFile] = useState(null)

  const uploadFile = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file.')
      return
    }

    const formData = new FormData();
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("error during the file upload", error);
    }

    

  }

  const hendleFileChange = (event) => {
    setFile(event.target.files[0])
  }


  return (
    <div className="App">
    
      <form onSubmit={uploadFile}>
        <input type="file" name="file" accept=".jpg,.png,.jpeg" onChange={hendleFileChange} />
        <button type="submit">Upload</button>
      </form>

    </div>
  );
}

export default App;
