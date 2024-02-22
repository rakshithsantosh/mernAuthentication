import { useState } from "react"
import { Link } from "react-router-dom"

export default function SignUp() {
  const [formData,setFormData] = useState({})
  const [error,setError]=useState(null)
  const [loading,setLoading]=useState(false)
  const handleChange=(e)=>{
    //to keep the previous data and append the data as we enter data 
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async(e) =>{
    //to prevent the page from refreshing during the submit action
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false)
      if(data.success === false){
        setError(true)
        return;
      }
    } catch (error) {
      setLoading(false)
      setError(true)
    } 
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="
        text" placeholder="Username" id='username' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <input type="email" placeholder="Email" id='email' className="bg-slate-100 p-3 rounded-lg"onChange={handleChange}/>    
        <input type="password" placeholder="Password" id='password' className="bg-slate-100 p-3 rounded-lg"onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" >Sign Up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to='/sign-in'>
        <span className="text-blue-500">{loading?'Loading ...':'Sign Up'}</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something Went Wrong"}</p>
    </div>
  )
}
