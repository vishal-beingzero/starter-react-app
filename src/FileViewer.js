import React, { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { AiOutlinePieChart } from 'react-icons/ai';
import { FaUpload, FaSearchengin } from 'react-icons/fa';
import { Chart } from "react-google-charts";
import './helper.css'

const FileViewer = () => {
  const[fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [cv, setCV] = useState('');
  const [showData, setShowData] = useState(false);
  const [shoewcv, setshowcv] = useState(false);
  const [takeCv, setTakeCvs] = useState(false);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false); // Added state variable for loading animation
  
  const [displayPie, setDisplayPie] = useState(false);
  const [warn, setwarn] = useState(true);

  const [info, setInfo] = useState(false);
  const [analysecv, setanalysecv] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        // setShowData(true);
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
      setLoading(false); // Hide loading animation once the file is loaded

    }
  };
  const handlepiechart=()=>{
    setwarn(false)
    setanalysecv(false)
    setDisplayPie(true)
  }
  
  const analyseHandle = () => {
    setwarn(false)
    setanalysecv(true)
    setDisplayPie(false)

  }
  const handleCV = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        setCV(content);
        // setShowData(true);
        setInfo(true)

      };

      if (file.type === 'application/pdf' || file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        alert('Please upload a PDF or TXT file.');
        setLoading(false); // Hide loading animation once the file is loaded

      }
    } else {
      // Reset the state when no file is selected
      setCV('');
      setLoading(false); // Hide loading animation once the file is loaded

    }
  };

  const data = [
    ["Your skills", "Description equirements"],
  ];
  data.push(["nothing yet",100])

  const options = {
    title: "Pie Chart for tags based",
    // is3D: true, //for 3d uncomment
    pieHole: 0.4, //for donut chart uncomment
  };

  const handleTakeCV = () => {
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
            <h4 className="mb-0">Analyse my Cover Letter </h4>
          </div>
          <div className="card-body">
            <div className="alert alert-primary">
              {!disable && (
                <>
                  <strong>Note : </strong>Drag or Choose job description file .
                </>
              )}
              {disable && (
                <>
                  <strong>Job Description </strong> has been uploaded sucessfully ,
                  <strong>You Can now uplaod CV to Analyse</strong>
                </>
              )}

            </div>

            <div className="mb-3">
              <input type="file" className="form-control" accept=".pdf,.txt" onChange={handleFileChange} disabled={disable} />
              {loading && <div className="text-center">Loading...</div>} {/* Display loading animation */}
            </div>

            <button className="btn btn-primary" onClick={handleGetData}>
              {!showData &&
                <>
                  <BiShow /> Show Description
                </>
              }
              {showData &&
                <>
                  <BiHide /> Hide Description
                </>
              }

            </button>
            {shoewcv &&
              (<button className="btn btn-primary mx-2" onClick={handleTakeCV}>
                <FaUpload /> Upload CV
              </button>
              )}
            {showData && fileContent && (
              <>
                <h5 className="mb-3 mt-2">A view of provided Job description</h5>
                <div className="display-section">
                  <pre className="border p-3 bg-light text-dark">{fileContent}</pre>
                </div>
              </>
            )}

            {takeCv && (
              <>
                <div className="mb-3 mt-3">
                  <input type="file" className="form-control" accept=".pdf,.txt" onChange={handleCV} />
                </div>
                {warn && (
                <div className="alert alert-info">
                  <strong>Drag and Drop</strong> or <strong>Select</strong> Your CV
                </div>
                )}
              </>
            )
            }
            {info && (
              <>
              <button className="btn btn-primary mx-2" onClick={analyseHandle}>
                <FaSearchengin /> Analyse MY CV
              </button>
              <button className="btn btn-primary mx-2" onClick={handlepiechart}>
                <AiOutlinePieChart /> Show Differences
              </button>
              </>
            )}
             {analysecv && cv && (
              <>
                <h5 className="mb-3 mt-2">A view of Cover Letter</h5>
                <div className="display-section">
                  <pre className="border p-3 bg-light text-dark">{cv}</pre>
                </div>
              </>
            )}
            {displayPie && 
                <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
              }
            
          </div>
        </div>
      </div>
    </>
  );
;
            }
export default FileViewer;