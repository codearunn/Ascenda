import  {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {

  const [completed, setCompleted] = useState(false);
  const lineThroughTask = () => {
    setCompleted(prev => !prev);
  };

  const navigate= useNavigate();
  function handelAddGoals(){
    navigate("/addGoals");
  }

  const [todayGoals, setTodayGoals] = useState([]);
  const [goalsLoading, setGoalsLoading] = useState(false);
  const [goalsError,  setGoalsError] =useState("");

  useEffect(() => {

    async function getGoals() {

        setGoalsError("");
        setGoalsLoading(true);

        try {
          const res= await fetch("http://localhost:8000/api/goals/today", {
            method:"GET",
            credentials:"include",
          });

          const data= await res.json();

          if(!res.ok){
            setGoalsError(data?.message || "failed to get Goals");
            return;
          }
          setTodayGoals(data.data);
        } catch (error) {
          console.error("Error in fetching Goals", error);
        } finally{
          setGoalsLoading(false);
        }
    }
    getGoals();
  }, [])

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,  setError] =useState("");

  useEffect(() => {

    async function getUser() {

      setError("");
      setLoading(true);
      try {
        const res= await fetch("http://localhost:8000/api/user/me", {
          method:"GET",
          credentials:"include",
        });
        const data= await res.json();
        console.log(data);
        if(!res.ok){
          setError(data?.message || "failed to find User");
          return;
        }

        setUser(data.data);
      } catch (error) {
        console.error("Error in fetching User", error);
        return;
      }finally{
        setLoading(false);
      }
    }
    getUser();

  }, [])

  async function handleCheckBox(goalId) {
    try {
      const res= await fetch(`http://localhost:8000/api/goals/${goalId}/toggle`, {
        method:"PATCH",
        credentials:"include",
      });
      const data =await res.json();

      if(!res.ok){
        setError(data?.message || "Toggle failed");
      }

      setTodayGoals(prev =>
        prev.map(g => g._id===goalId? {...g, completed:!g.completed} :g)
      );
    } catch (error) {
      console.error("Error in handleCheckBox",error);
    }
  }

  async function handleDeleteTask(goalId) {
    const ok = confirm("Delete this goal?");
    if (!ok) return;
    try {
      const res= await fetch(`http://localhost:8000/api/goals/${goalId}`, {
        method:"DELETE",
        credentials:"include",
      });

      const data= await res.json();

      if(!res.ok){
        setError(data?.message || "failed in Deleting Task");
        return;
      }
      setTodayGoals(prev =>
        prev.filter(g => g._id!==goalId)
      );
    } catch (error) {
      console.error("Error in handleDeleteTask",error);
    }
  }

  const [stats, setStats] = useState([]);

  useEffect(() => {

    async function getStats() {
      try {
        const res= await fetch("http://localhost:8000/api/goals/stats",{
          method:"GET",
          credentials:"include",
        });
        const data= await res.json();
        if(!res.ok){
          setError(data?.message || "failed to get stats");
          return;
        }
        console.log("STATS RESPONSE 👉", data);
        setStats(data.data);
      } catch (error) {
         console.error("Error in fetching User", error);
         return;
      }
    }
    getStats();
  }, [])


  if(loading){
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-slate-800 rounded-full w-[100px] mb-4"></div>
                <div className="h-2 bg-slate-800 rounded-full max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-slate-800 rounded-full mb-2.5"></div>
                <div className="h-2 bg-slate-800 rounded-full max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-slate-800 rounded-full max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-slate-800 rounded-full max-w-[360px]"></div>
                <span className="sr-only">Loading...</span>
            </div>
          </main>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* {AddGoals} */}
        <section className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/80 via-slate-900 to-slate-950 px-6 py-5 shadow-lg shadow-slate-950/40">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mt-1 text-2xl md:text-5xl font-semibold tracking-tight">
                <span className="text-red-700">Discipline builds what motivation can’t.</span>
              </h1>
              <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
                <span className="text-emerald-400">Got Something in Mind!?</span>
              </h1>
              <p className="mt-2 text-sm text-slate-100 max-w-xl">
               Change Your Goals Here!
              </p>

              <button onClick={handelAddGoals} className="mt-3 text-white bg-red-700 p-2 text-md rounded-md shadow-xl hover:bg-slate-600">
                Add Goal
            </button>
            </div>
            <div className="max-w-[600px]">
              <img src="/images/zoroCover.webp" className="shadow-xl rounded-md"></img>
              <button className="bg-black mt-2 p-2 text-red-900 rounded-md text-md shadow-xl">Cover</button>
            </div>
          </div>
        </section>

        {(error || goalsError) && (
          <p className="mb-3 text-sm text-red-400"> Something went wrong. Please try again. </p>
        )}

        {/* Top welcome panel */}
        <section className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/80 via-slate-900 to-slate-950 px-6 py-5 shadow-lg shadow-slate-950/40">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
                Today
              </p>
              <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
                Good to see you back, <span className="text-emerald-400">{user?.name || "there"}</span>
              </h1>
              <p className="mt-2 text-sm text-slate-400 max-w-xl">
                You’re one step closer to building a consistent routine. Focus on the
                small goals that move you forward today.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Current streak
                </p>
                <p className="mt-1 text-3xl font-semibold text-emerald-400">
                  4 days
                </p>
                <p className="text-xs text-slate-500">
                  Longest: <span className="text-slate-300">7 days</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats row */}
        <section className="grid gap-4 sm:grid-cols-3">
          {/* Card 1: goals today */}
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm">
            <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500/80" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 pl-3">
              Goals completed
            </p>
            <div className="mt-2 flex items-baseline gap-2 pl-3">
              <p className="text-sm text-emerald-500 font-semibold">{stats?.today?.completed}</p>
              <p className="text-sm text-red-500"><span className="text-slate-300">/</span> {stats?.today?.total} <span className="text-slate-300">today</span></p>
            </div>
            <p className="mt-1 text-xs text-slate-500 pl-3">
              Nice work. You’re on track for your daily target.
            </p>
          </div>

          {/* Card 2: weekly progress */}
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm">
            <div className="absolute inset-y-0 left-0 w-1 bg-sky-500/80" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 pl-3">
              This week
            </p>
            <div className="mt-2 flex items-baseline gap-2 pl-3">
              <p className="text-3xl font-semibold">{stats?.week?.completed}</p>
              <p className="text-sm text-slate-500">/ {stats?.week?.total}</p>
            </div>
            <div className="mt-2 pl-3">
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div className="h-1.5 w-2/3 rounded-full bg-sky-500" />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {stats?.weekCompletionPercentage} of weekly goals completed.
              </p>
            </div>
          </div>

          {/* Card 3: focus score */}
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm">
            <div className="absolute inset-y-0 left-0 w-1 bg-violet-500/80" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 pl-3">
              Focus score
            </p>
            <div className="mt-2 flex items-center justify-between pl-3 pr-1">
              <p className="text-3xl font-semibold">7.8</p>
              <span className="text-xs rounded-full bg-violet-500/10 px-2 py-1 text-violet-300 border border-violet-500/30">
                Stable
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 pl-3">
              Based on your completion and consistency.
            </p>
          </div>
        </section>

        {/* Main content */}
        {goalsLoading &&(
          <div className="min-h-screen bg-slate-950 text-slate-100">
            <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-slate-800 rounded-full w-[100px] mb-4"></div>
                    <div className="h-2 bg-slate-800 rounded-full max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-slate-800 rounded-full mb-2.5"></div>
                    <div className="h-2 bg-slate-800 rounded-full max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-slate-800 rounded-full max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-slate-800 rounded-full max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
              </main>
          </div>
        )}

        <section className="grid gap-6 md:grid-cols-[2fr,1.3fr]">
          {/* Left: today’s plan */}
          {!goalsLoading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl mb-3 font-medium text-slate-100">
                Today&apos;s plan
              </h2>
              <span className="text-xs text-slate-500">3 of 5 goals planned</span>
            </div>
              {
                todayGoals.map(goal =>(
                  <div key={goal._id}  className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`h-3 mt-2 w-2 rounded-full ${goal.completed ? "bg-emerald-400" : "bg-sky-400"}` }/>
                      <div className="mt-1 h-full w-px bg-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-slate-100 font-2xl">
                        <button onClick={() => handleDeleteTask(goal._id)} className="mr-2 text-red-500">×</button>
                          {goal.title}
                        <input type="checkbox" className="ml-5 " onChange={() =>handleCheckBox(goal._id)} checked={goal.completed}/>
                      </h3>
                      <p onClick={lineThroughTask}
                        className={`text-sm font-medium cursor-pointer select-none transition mt-1 ml-4
                          ${completed || goal.completed? "line-through text-slate-500" : "text-slate-100"}
                        `}>
                        <button className="mr-2 text-red-500 font-xs">×</button>
                          {goal.description}
                      </p>
                    </div>
                  </div>
                  ))
              }
          </div>
          )}
          {/* Right: habits overview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-sm font-medium text-slate-200">
              Habits overview
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Last 7 days across your core habits.
            </p>

            <div className="mt-4 space-y-4 text-xs text-slate-400">
              {/* Consistency */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Consistency
                  </span>
                  <span className="text-slate-200 font-medium">78%</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                  <div className="h-1.5 w-4/5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Focus blocks */}
              <div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    Focus blocks
                  </span>
                  <span className="text-slate-200 font-medium">5 / 7 days</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                  <div className="h-1.5 w-3/4 rounded-full bg-sky-500" />
                </div>
              </div>

              {/* Movement */}
              <div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-400" />
                    Movement
                  </span>
                  <span className="text-slate-200 font-medium">4 / 7 days</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                  <div className="h-1.5 w-2/3 rounded-full bg-violet-500" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}