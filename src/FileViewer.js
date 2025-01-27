import React, { Suspense, useState, useRef } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { AiOutlinePieChart } from 'react-icons/ai';
import { BsFire } from 'react-icons/bs';
import { RxResume } from 'react-icons/rx';
import { HiAdjustmentsVertical } from 'react-icons/hi2';
import { FaUpload, FaSearchengin, FaDownload } from 'react-icons/fa';
import { Chart } from "react-google-charts";
import './helper.css'
import allSkills from './skills';
import { Dna } from 'react-loader-spinner'



const tokenizeAndPreprocess = (text) => {
  return text.toLowerCase().match(/\b\w+\b/g) || [];
};




const FileViewer = () => {
  
  const data = [
    ["Your skills", "Description equirements"],
  ];
  data.push(["Nothing Yet", 100])
  
  const options = {
    title: "Pie chart for comparing job description skills and skills mentioned in CV ",
    // is3D: true, //for 3d uncomment
    pieHole: 0.4, //for donut chart uncomment
  };
  
  const[validated,setValidated]=useState(false)

  const [leaderboard, setLeaderBoard] = useState(false);

  const[cur,setCur]=useState(1)


  const [dataMap, setDataMap] = useState(new Map());

  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [showAllSkills, setShowAllSkills] = useState(false);

  const [once, setOnce] = useState(true);
  const [totalSkills, setTotalSkills] = useState(true);
  const [add, setAdd] = useState(false);
  const [hid, setHid] = useState(false);
  const [extra, setExtra] = useState([]);

  const [cv, setCV] = useState('');
  const [showData, setShowData] = useState(false);
  const [shoewcv, setshowcv] = useState(false);
  const [takeCv, setTakeCvs] = useState(false);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false); // Added state variable for loading animation
  const [isLoading, setIsLoading] = useState(false); // Added state variable for loading animation

  const [displayPie, setDisplayPie] = useState(false);
  const [warn, setwarn] = useState(true);
  const [random, setRandom] = useState(false);

  const [info, setInfo] = useState(false);
  const [analysecv, setanalysecv] = useState(false);

  const [missingSkills, setMissingSkills] = useState([]);

  const fileInputRef = useRef(null);
  const [key, setKey] = useState(0);


  const skilas = [...new Set(allSkills)];

  const tokenizeText = (text) => {
    return text.toLowerCase().match(/\b\w+\b/g);
  };
  const[mail,setMail]=useState('')
  const[score,setScore]=useState('')

  let maps=new Map();


  function extractEmail(text) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
    const extractedEmails = text.match(emailRegex);
    
    if (extractedEmails && extractedEmails.length > 0) {
        return extractedEmails[0];
    } else {
        let s="CV # ";
        s+=cur;
        console.log(s);
        return s;
    }
}

const addValue = () => {
  const newKey = mail;
  const newValue = score;
  const updatedDataMap = new Map(dataMap);
  updatedDataMap.set(newKey, newValue);
  // setDataMap(updatedDataMap);
  const sample = new Map([...updatedDataMap.entries()].sort((a, b) => b[1] - a[1]));
  setDataMap(sample)

};

const handleNextResume=()=>{
  // displayPie
  setInfo(false)
  setRandom(false)
  setwarn(true)
  setExtra([])
  setMissingSkills([])
  // setMail('')
  // setScore('')
  setCV('')
  setDisplayPie(false)
  setanalysecv(false)
  setKey(prevKey => prevKey + 1);

  if (fileInputRef.current) {
    fileInputRef.current.value = '';
    setCur(cur+1)
}
  // setInfo(false)
}

  const addLDB=()=>{
    setMail(extractEmail(cv))
    if(missingSkills===undefined)
      setScore(100)
    else
    {
      let avg=(data[2][1])/(data[1][1]+data[2][1]+data[3][1])*100
      setScore(avg)
    }
    // console.log(score ,mail , data[2][0])
    setValidated(true)
    // console.log(map)
    addValue();
  }

  const handleAnalyzeSkills = () => {
    setValidated(false)
    setRandom(true)
    setOnce(true)
    setIsLoading(true);
    setwarn(false)
    setanalysecv(true)
    setDisplayPie(false)
    const jobWords = tokenizeText(fileContent);

    // Find skills from allSkills mentioned in job description
    setTimeout(() => {
      const mentionedSkills = skilas.filter((skill) => {
        const skillWords = tokenizeText(skill);
        return skillWords.every((word) => jobWords.includes(word));
      });

      const cvWords = tokenizeText(cv);
      const cvSkills = skilas.filter((skill) => {
        const skillWords = tokenizeText(skill);
        return skillWords.every((word) => cvWords.includes(word));
      });

      const skillsWhichWeNeed = mentionedSkills.filter((word) => !cvSkills.includes(word));
      const extraSkills = cvSkills.filter((word) => !mentionedSkills.includes(word));

      setTotalSkills(mentionedSkills)
      setIsLoading(false);
      setMissingSkills(skillsWhichWeNeed);
      setExtra(extraSkills)
    }, 1000); // Delay of 1 second
    setAdd(true)


  };
  const [showAll, setShowAll] = useState(false);


  const handleDownload = () => {
    const combinedData = `${cv}\n\nSkills that should be present in the CV :\n${formatSkillsForColumns(missingSkills)}`;
    const blob = new Blob([combinedData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'updatedCV.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatSkillsForColumns = (skills) => {
    if (showAll) {
      return skills.join('\n');
    } else {
      const midIndex = Math.ceil(skills.length / 2);
      const firstColumn = skills.slice(0, midIndex).map(skill => `  - ${skill}`).join('\n');
      const secondColumn = skills.slice(midIndex).map(skill => `  - ${skill}`).join('\n');
      return firstColumn + '\n' + secondColumn;
    }
  };

  const handleFileChange = (event) => {
    setAdd(false);
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
      // setFileContent('');
      setShowData(false);
      setLoading(false); // Hide loading animation once the file is loaded

    }
  };
  const handlepiechart = () => {
    setwarn(false)
    setanalysecv(false)
    setDisplayPie(true)
  }


  const handleCV = (event) => {

    setMissingSkills()
    const file = event.target.files[0];
    if (file) {
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



  const handleTakeCV = () => {
    setShowData(false)
    setTakeCvs(true)
  }
  const handleGetData = () => {
    setShowData((prevShowData) => !prevShowData);
  };

  const toggleLeaderBoard=()=>{
    setLeaderBoard(!leaderboard)
  }

  let displayedSkills;
  let toggleButtonText;
  if (missingSkills != undefined) {
    displayedSkills = showAllSkills ? missingSkills.slice(0, 24) : missingSkills.slice(0, 5);
    toggleButtonText = showAllSkills ? 'Show Less' : 'Show More';

  }
  if (add) {
    // data.length=0
    const indexToRemove = data.findIndex(item => item[0] === "Nothing Yet");

    // Remove the element using splice()
    if (indexToRemove !== -1) {
      data.splice(indexToRemove, 1);
    }

    if (missingSkills == undefined) {
      data.push(["Not Matched", 0]);
      data.push(["Matched", 100]);
    }
    else {
      data.push(["Not Matched", missingSkills.length])
      data.push(["Matched", totalSkills.length - missingSkills.length])
    }
    if (extra == undefined)
      data.push(["Extra Skills", 0]);
    else
      data.push(["Extra Skills", extra.length]);
  }
 
 
  return (
    <>
        <div>

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
                <button className="btn btn-light" onClick={toggleLeaderBoard}>{!leaderboard ? 'LeaderBoard' : 'Analysis Page'}</button>
              </div>
      {leaderboard==false && 
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
                    <FaUpload /> Upload CV # {cur}
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
                      <input type="file" className="form-control" accept=".pdf,.txt" onChange={handleCV} ref={fileInputRef} key={key}/>
                    </div>
                    {warn && (
                      <div className="alert alert-info">
                        <strong>Drag and Drop</strong> or <strong>Select</strong>  CV #{cur}
                       </div>
                    )}
                  </>
                )
                }
                {info && (
                  <>
                    <button className="btn btn-primary mx-2" onClick={handleAnalyzeSkills}>
                      <FaSearchengin /> Analyse CV #{cur}
                    </button>
                    {random && <button className="btn btn-primary mx-2" onClick={handlepiechart}>
                      <AiOutlinePieChart /> Show Differences
                    </button>
                    }
                  </>
                )}
                {analysecv && cv && (
                  <>

                    <div className="display-secion">

                      {isLoading &&
                        <div className='text-center'>

                          <Dna
                            visible={true}
                            height="90"
                            width="100"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"

                          />
                        </div>
                      }

                      {!isLoading &&
                        <>
                          {missingSkills != undefined && missingSkills.length != 0 &&
                            <div class="alert alert-danger mt-2" role="alert">
                              There are certain <strong>skills and qualities </strong>which  this job is expecting but <strong> did not found in your CV.</strong>
                            </div>
                          }
                          {missingSkills != undefined && missingSkills.length == 0 &&
                            <div class="alert alert-successmb-2" role="alert">
                              CV <strong>perfectly matched </strong>with our requirements <BsFire />
                            </div>
                          }
                          <div className="missing-skills-container">
                            <ul className="missing-skills-list" style={{ columns: '3' }}>
                              {displayedSkills != undefined && displayedSkills.length > 0 && displayedSkills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                              ))}
                              {displayedSkills != undefined && displayedSkills.length < missingSkills.length &&
                                <li>...</li>
                              }
                            </ul>
                            {!once && !showAllSkills &&
                              <div class="alert alert-info mt-2" role="alert">
                                Applicant will be a <strong>strong hire</strong> if they have these skills, Click on , <strong> Download Missing Skills</strong> to get the updated CV for them.
                              </div>
                            }
                            {missingSkills != undefined && missingSkills.length > 5 && (
                              <button className='btn btn-primary mx-2' onClick={() => { setShowAllSkills(!showAllSkills); setOnce(false); }}>{toggleButtonText}</button>
                            )}

                            {missingSkills != undefined && missingSkills.length != 0 &&
                              <button className='btn btn-danger mx-2' onClick={handleDownload}> <FaDownload /> Download Missing Skills</button>
                            }
                            <button className='btn btn-primary mx-2' disabled={validated} onClick={addLDB}> <HiAdjustmentsVertical /> { !validated ? 'Validate for shortlisting' : 'Validated'}</button>
                            <button className='btn btn-primary mx-2' onClick={handleNextResume}><RxResume/> Next CV</button>

                          </div>

                        </>
                      }
                    </div>
                  </>
                )}
                {displayPie &&
                  <>
                    <Chart
                      chartType="PieChart"
                      data={data}
                      options={options}
                      width={"100%"}
                      height={"400px"}
                    />
                            <button className='btn btn-primary mx-2' disabled={validated} onClick={addLDB}> <HiAdjustmentsVertical /> { !validated ? 'Validate for shortlisting' : 'Validated'}</button>
                      <button className='btn btn-primary mx-2' onClick={handleNextResume}><RxResume/> Next CV</button>

                  </>
                }

              </div>
        }
        {leaderboard==true && 
        <div className="container mt-5">
        <h2>Vaidateed Candidates Table</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Mail ID's</th>
                    <th>Requirement Match (%)</th>
                </tr>
            </thead>
            <tbody>
                {Array.from(dataMap.entries()).map(([key, value]) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>  
                    </tr>
                ))}
            </tbody>
        </table>
        <div className='container text-center mt-2 mb-2'>

        <button className='btn btn-primary'>Send Mail</button>
        </div>
    </div>
        
        }


            </div>
          </div>
        </div>
    </>
  );
  ;
}
export default FileViewer;