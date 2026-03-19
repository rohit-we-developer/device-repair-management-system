"use client";

import { useState } from "react";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
  });

  const handleSubmit = async (e:any)=>{
    e.preventDefault();
    const res = await registerUser(form);
    alert(res.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">

      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-96 text-white shadow-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <input placeholder="Name" className="w-full p-3 mb-3 rounded bg-black/40 border border-gray-600" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" className="w-full p-3 mb-3 rounded bg-black/40 border border-gray-600" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input placeholder="Phone" className="w-full p-3 mb-3 rounded bg-black/40 border border-gray-600" onChange={(e)=>setForm({...form,phone:e.target.value})}/>
        <input type="password" placeholder="Password" className="w-full p-3 mb-3 rounded bg-black/40 border border-gray-600" onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <button className="w-full bg-green-500 py-3 rounded mt-4">
          Register
        </button>

      </form>

    </div>
  );
}