import {Link} from "react-router-dom";

function Navbar(){
  return (
    <nav className="flex items-center justify-between py-4 border-b border-slate-800 bg-black font-serif px-4">
      <Link to="/" className="text-3xl font-bold text-slate-100" >
        Ascenda
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-slate-100" >
          Home
        </Link>
        <Link to="/login" className="text-xl font-bold text-slate-100" >
          Login
        </Link>
        <Link to="/Signup" className="text-xl font-bold text-slate-100" >
          Signup
        </Link>
        <Link to="/Dashboard"
          className="px-3 py-2 rounded-md bg-slate-700 text-slate-100
                  hover:bg-slate-900 transition-colors shadow-md shadow-zinc-900" >
          Dashboard
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;