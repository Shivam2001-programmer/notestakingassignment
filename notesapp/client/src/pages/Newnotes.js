import React,{useState,useRef,useMemo} from 'react'
import Layout from '../components/layout/layout'
import './../style/newnotes.css';
import toast from 'react-hot-toast'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import JoditEditor from 'jodit-react'

const Newnotes = () => {
  const editor = useRef(null);
	const [content, setContent] = useState('');
    const [title,setTitle] = useState("")
    const [discription,setDiscription] = useState("")
    const navigate = useNavigate()

    // const config ={
    //   button:["bold", "italic"],
    // };

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(title,discription);
        try {
          const res = await axios.post('/api/v1/notes/New-notes',{title,discription});
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            navigate('/');
          } else {
            toast.error(res.data.message);
          };
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong')
        }
      }

      const handleclose = async () => {
        navigate('/');
    }

   


  return (
    <Layout>
   <div className='form-container'>
   <form onSubmit={handlesubmit}>
   <h4 className='title'>ADD NEW NOTES</h4>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
    <input type="text" value={title} className="form-control" id="exampleFormControlInput1" placeholder="Enter title"
    onChange={(e) => setTitle(e.target.value)} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlTextarea1" className="form-label" >Description</label>
    {/* <textarea className="form-control" type="text" value={discription} id="exampleFormControlTextarea1" rows={5} defaultValue={""} 
    onChange={(e) => setDiscription(e.target.value)} required 
    /> */}
    <JoditEditor
			ref={editor}
			value={discription}
      tabIndex={1} // tabIndex of textarea
      onChange={(content) => setDiscription(content)} required
      // config={config}
		/>
  </div>
    <button type='cancle' className="btn btn-primary" onClick={handleclose}>CANCEL</button>
    <button type="submit" onClick={handlesubmit} className="btn btn-primary">SAVE</button>
  </form>
  
</div>

    </Layout>
  )
}

export default Newnotes



