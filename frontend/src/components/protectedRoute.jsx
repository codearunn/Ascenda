import {Navigate, Outlet} from "react-router-dom";
import { useState, useEffect } from "react";


function ProtectedRoute(){
  //Read auth flag from localStorage (OPTIONAL, for quick fronend check)
  // const isLoggedIn= localStorage.getItem("isLoggedIn")==="true";

  const [checking, setChecking] = useState(true);            // are we still calling /me?
  const [authenticated, setAuthenticated]= useState(false); // real auth from backend

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const res= await fetch("http://localhost:8000/api/user/me",{
          method:"GET",
          credentials:"include",
        });
        if(cancelled) return;

        if(res.ok){
          setAuthenticated(true);
        }else{
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        if(!cancelled){
          setAuthenticated(false);
        }
      }finally{
        if(!cancelled){
          setChecking(false); // we’re done checking, either way
        }
      }
    }

    checkAuth();

    return () =>{
      cancelled= true;
    }
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <p className="text-sm text-slate-300">Checking authentication...</p>
      </div>
    );
  }

//replace means it will replace the current entry in the browser history instead of adding a new one.
//So the user can’t press “Back” to return to the protected page they weren’t allowed to see.
  if(!authenticated){
    return <Navigate to="/login" replace/>
  }


  // If logged in, render the nested route's element
  return <Outlet />;
}


export default ProtectedRoute;