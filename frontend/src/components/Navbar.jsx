import {Link} from "react-router-dom";
import Profile from "./Profile";

function Navbar(){

  const isLoggedIn= localStorage.getItem("isLoggedIn")==="true";
  return (

    <nav className="flex items-center justify-between py-4 border-b border-slate-800 bg-black font-serif px-4">
      <Link to="/" className="text-3xl font-bold text-slate-100" >
        Ascenda
      </Link>

      {isLoggedIn && (
        <div>
          <Link to="/" className="text-xl font-bold text-slate-100 mr-5" >
              Home
          </Link>
          <Link to="/dashboard"
            className="px-3 pt-3 py-1 rounded-md bg-zinc-900 text-slate-100 items-center justify-between
                    hover:bg-slate-900 transition-colors shadow-md shadow-zinc-900" >
            Dashboard
          </Link>
          <Profile/>
        </div>
      )}
      {!isLoggedIn && (
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-slate-100" >
            Home
          </Link>
          <Link to="/login" className="text-xl font-bold text-slate-100" >
            Login
          </Link>
          <Link to="/signup" className="text-xl font-bold text-slate-100" >
            Signup
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar;