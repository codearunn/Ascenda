import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Signup(){
  const navigate = useNavigate();

  const [name , setName]= useState("");
  const [email , setEmail]= useState("");
  const [password , setPassword]= useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handelSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const res= await fetch("http://localhost:8000/api/user/signup", {
      method:"POST",
      credentials: "include", //MUST for Cookies
      headers:{
        "Content-Type": "application/json", //Headers
      },
      body:JSON.stringify({
        name,
        email,
        password,
        }),
      });

      const data = await res.json(); // try to read backend message

      if (!res.ok) {
        // backend returned an error status
        setError(data?.message || "Signup failed");
        return;
      }

      setSuccess(data?.message || "Signup successful!");

      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");

      setName("");
      setEmail("");
      setPassword("");


    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  }
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-950 text-slate-100">
      <div className="bg-black/60 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Create your account</h1>

        {error && (
          <p className="mb-3 text-sm text-red-400"> {error} </p>
        )}
        {success && (
          <p className="mb-3 text-sm text-emerald-400"> {success} </p>
        )}
        <form onSubmit={handelSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 ">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={ (e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="...@example.com"
              value={email}
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={ (e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="******"
              value={password}
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={ (e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 transition-colors"
          >Create</button>
        </form>
      </div>
    </div>
    )
}