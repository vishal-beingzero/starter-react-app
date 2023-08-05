import React, { useState } from 'react';

const FileViewer = () => {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [showData, setShowData] = useState(false);
  const [shoewcv, setshowcv] = useState(false);
  const [takeCv, setTakeCvs] = useState(false);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false); // Added state variable for loading animation


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        setShowData(true);
        setshowcv(true);
        setDisable(true)
        setLoading(false); // Hide loading animation once the file is loaded

      };

      if (file.type === 'application/pdf' || file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        alert('Please upload a PDF or TXT file.');
        setLoading(false); // Hide loading animation once the file is loaded

      }
    } else {
      // Reset the state when no file is selected
      setFileName('');
      setFileContent('');
      setShowData(false);
      console.log("hiola  mfs")
      setLoading(false); // Hide loading animation once the file is loaded

    }
  };

  const handleTakeCV = () =>{
    setShowData(false)
    setTakeCvs(true)
  }
  const handleGetData = () => {
    setShowData((prevShowData) => !prevShowData);
  };

  return (
    <>
    <figure class="text-center mt-3">
  <blockquote class="blockquote">
    <p>A Model that analyses provided <strong>Job description</strong> with your CV.</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    Sounds good <cite title="Source Title">isn't it ? </cite>
  </figcaption>
</figure>
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Job Description</h4>
          
        </div>
        <div className="card-body">
        <div className="alert alert-primary">
              <strong>Note : </strong>Drag or Choose job description file to compare with differenet CV'S
          </div>
          <div className="mb-3">
            <input type="file" className="form-control" accept=".pdf,.txt" onChange={handleFileChange} disabled={disable}/>
            {loading && <div className="text-center">Loading...</div>} {/* Display loading animation */}

          </div>

          <button className="btn btn-primary" onClick={handleGetData}>
            {!showData ? 'Show Description' : 'Hide Description' }
          </button>
          {shoewcv && 
          (<button className="btn btn-primary mx-2" onClick={handleTakeCV}>
            Upload CV
          </button>
          )}
          <hr />
          {showData && fileContent && (
            <div>
              <h5 className="mb-3 mt-2">A view of provided Job description</h5>
              <pre className="border p-3 bg-light text-dark">
                {fileContent}
              </pre>
              <div className="mt-3 text-center">
              </div>
            </div>
          )}

          {takeCv && (          
            <div className="mb-3 mt-2">
            <input type="file" className="form-control" accept= ".pdf,.txt" onChange={handleFileChange} />
          </div>) }
        </div>
      </div>
    </div>
            </>
  );
};

export default FileViewer;
