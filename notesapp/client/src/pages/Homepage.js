import React, { useState, useEffect } from "react";
import Layout from './../components/layout/layout'
import { Link, json} from 'react-router-dom'
// import {Modal} from 'react-bootstrap'
import axios from 'axios'
import toast from 'react-hot-toast'
import "../style/homepage.css"
// import { useNavigate, useParams } from "react-router-dom";
import {BiSolidAddToQueue,BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import HTMLReactParser from "html-react-parser";


const Homepage = () => {
 
  const [notes, setnotes] = useState([]);
  // const [title, setTitle] = useState("");
  // const [discription, setDiscription] = useState("");
  // const [id, setId] = useState("");
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => {setShow(true)};
  

//getall notes
const getAllnotes = async () => {
  try {
    const { data } = await axios.get("/api/v1/notes/get-notes");
    setnotes(data.notes);
  } catch (error) {
    console.log(error);
    toast.error("Someething Went Wrong");
  }
};

//lifecycle method
useEffect(() => {
  getAllnotes();
}, []);


 //delete a product
 const handleDelete = async (pId) => {
  try {
    let answer = window.prompt("Are You Sure want to delete this notes ? ");
    if (!answer) return;
    const { data } = await axios.delete(
      `/api/v1/notes/delete-note/${pId}`
    ); window.location.reload()
    toast.success("note Deleted Succfully");
  } catch (error) {
    console.log(error);
    toast.error("Something weeent wrong"); 
  }
};


  return (
    <Layout>
       
       <div className="d-flex flex-wrap " >
            {notes?.map((n) => (
                <div className="card m-3 " style={{ width: "" ,height: "13rem" }} >
                 <Link
                key={n._id}
                to={`/notes/${n.slug}`}
                className="product-link"
                style={{ textDecoration:'none' }} >
                 <h4 className="card-title">{n.title.substring(0, 20)}... </h4 >
                  <div className="card-body"  /*onClick={handleShow}*/ style={{ width: "" ,height: "6rem" }}>
                  
             
                    <p className="card-text" style={{overflow:"hidden" }}>{HTMLReactParser(n.discription.substring(0, 60))}....?
                    </p>
                    
                  </div>
                  </Link> 
                  <BiEdit className=" me-3 ms-auto text-success " style={{cursor:'pointer',fontSize:'13pt'}}></BiEdit>  
                   <MdDelete className="m-3 ms-auto text-danger "onClick={() => {
                              handleDelete(n._id);
                            }} style={{cursor:'pointer',fontSize:'13pt'}}></MdDelete>
                            
                </div>
               
               ))}
               
              </div>

          
            {/* add notes button at corner */}

         <Link to="newnotes" >
             <div id="top"> 
               <BiSolidAddToQueue/>
             </div> 
         </Link>

    </Layout>
  )
}

export default Homepage
