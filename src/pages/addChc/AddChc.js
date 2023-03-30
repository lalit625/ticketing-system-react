import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import Card from "../../component/card/Card";
import Loader from "../../component/loader/Loader";
import styles from "./AddChc.module.scss";
import { selectUserID } from "../../redux/authSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";



const initialState = {
  companyname: "",
  catalogid: "",
  chcurl: "",
  assignedto: "None",
  status: "Pending",
  estimatetime:"Not Set",
  priority:"",
  desc: "",
};

const  AddChc =  () => {
    const userID=useSelector(selectUserID)
  const { id } = useParams();
   //const chcData =  useSelector(selectChcData);
   
   const { data } = useFetchCollection("chc");
  
  //const chcData = data;
  const chcEdit = data.find((item) => item.id === id);
  
  
 
    const [chc, setChc] = useState({}); 
  
 useEffect(() => {
   
        const newState =  detectForm(id, { ...initialState }, chcEdit);
                setChc(newState)
        
      
 }, [ chcEdit,id])
 


  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChc({ ...chc, [name]: value });
    
  };

  

  const addChc = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "chc"), {
        companyname: chc.companyname,
        catalogid: chc.catalogid,
        chcurl: chc.chcurl,
        assignedto: chc.assignedto,
        status: chc.status,
        desc: chc.desc,
        priority:chc.priority,
        estimatetime:chc.estimatetime,
        createdAt: Timestamp.now().toDate(),
      });
      
      setChc({ ...initialState });

      toast.success("Chc Added successfully.");
      navigate("/chc-list");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editChc = (e) => {
    e.preventDefault();
    setIsLoading(true);

   
    try {
      setDoc(doc(db, "chc", id), {
        companyname: chc.companyname,
        catalogid: chc.catalogid,
        chcurl: chc.chcurl,
        assignedto: chc.assignedto,
        status: chc.status,
        desc: chc.desc,
        priority:chc.priority,
        estimatetime:chc.estimatetime,
        createdAt: chc.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("CHC Edited Successfully");
      navigate("/chc-list");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  console.log(chc)
  return (
    <section>
        <div className="container">
        <div>
          <Link to="/chc-list">&larr; Back To Chc Page</Link>
        </div>

      {isLoading && <Loader />}
      {chc?
    (
        <div className={styles.product}>
        <h2>{detectForm(id, "Add CHC", "Edit CHC")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addChc, editChc)}>
            <label>Company Name:</label>
            <input
              type="text"
              placeholder="Company name"
              required
              name="companyname"
              value={chc.companyname}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Catalog ID:</label>
            <input
              type="text"
              placeholder="Catalog Id"
              required
              name="catalogid"
              value={chc.catalogid}
              onChange={(e) => handleInputChange(e)}
            />
            

            <label>CHC Url:</label>
            <input
              type="text"
              placeholder="Chc Url"
              required
              name="chcurl"
              value={chc.chcurl}
              onChange={(e) => handleInputChange(e)}
            />

<label>Priority:</label>
            <select
              required
              name="priority"
              value={chc.priority}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose priority --
              </option>
              
                  <option  value="high">
                    High
                   
                  </option>
                  <option  value="normal">
                   Normal
                   
                  </option>
                  <option  value="low">
                  Low
                   
                  </option>
      
         
            </select>
            {chc.priority==="high"?<p>Kindly Note High Priority CHC Will be Done First Come First Serve Basis </p>:null}
           
            <label>Assigned To:</label>
            <input
              type="text"
              placeholder="Assigned to"
              required
              name="assignedto"
              value={chc.assignedto}
              onChange={(e) => handleInputChange(e)}
              disabled={userID==="mcrYtiHdAZeUTx3rrm0eIzVVrYi2"?"":true}
            />

<label>Status:</label>

<select
              required
              name="status"
              value={chc.status}
              onChange={(e) => handleInputChange(e)}
              disabled={userID==="mcrYtiHdAZeUTx3rrm0eIzVVrYi2"?"":true}
            >
              <option value="" disabled>
                -- choose status --
              </option>
              
                  <option  value="Pending">
                    Pending
                   
                  </option>
                  <option  value="Designing">
                    Designing
                   
                  </option>
                  <option  value="Live In Progress">
                  Live In Progress
                   
                  </option>
                  <option  value="Live">
                 Live
                   
                  </option>
      
         
            </select>
           
            

            <label>Estimated Delivery Time:</label>
            <input
              type="date"
              placeholder="estimate time"
              
              name="estimatetime"
              value={chc.estimatetime}
              onChange={(e) => handleInputChange(e)}
              disabled={userID==="mcrYtiHdAZeUTx3rrm0eIzVVrYi2"?"":true}
            />
            
           

            <label>Message</label>
            <textarea
              name="desc"
              required
              value={chc.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>

            <button className="--btn --btn-primary">
            {detectForm(id, "Save CHC", "Edit CHC")}
            </button>
          </form>
        </Card>
      </div>
    ): <p>loading...</p>
    }
      
    </div>
    </section>
  );
};

export default AddChc;