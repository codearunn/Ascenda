import { useState } from 'react';
import { Plus, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AddGoals() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddGoal(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res= await fetch("http://localhost:8000/api/goals", {
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          title,
          description,
        })
      });

      if(!res.ok){
        console.log("error is AddingGoals");
        return;
      }
    } catch (error) {
      console.error(error);
    }
    // Reset form
    setTimeout(() => {
      setTitle('');
      setDescription('');
      setCategory('personal');
      setIsSubmitting(false);
    }, 500);
  };

  const navigate= useNavigate();
  function navigateToDashbard() {
    navigate("/dashboard");
  }
  return (
    <div className="flex min-h-[calc(100vh-10rem)]
        items-start justify-center
        bg-[url('/images/zoroCover.webp')]
        bg-cover bg-center bg-no-repeat
        from-slate-950/80 via-slate-900/80 to-slate-950/80
        p-6 pt-16">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="bg-white/40 m-0 mb-2 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Target className="w-5 h-5 text-red-600" />
            </div>
            <h1 className="text-5xl font-extrabold text-black rounded-5xl p-4">Create a new goal</h1>
            <button onClick={navigateToDashbard} className=" bg-black text-red-900 pl-2 pr-2 pt-1 pb-1 rounded-3xl shadow-xl hover:bg-zinc-900 hover:text-red-500">view Taks</button>
          </div>
          <label className="text-black font-extrabold  text-sm ml-14 rounded-xl p-2">Set your intention and make it happen</label>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleAddGoal} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-slate-300">
                Goal Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Learn React, Exercise daily, Read more books"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg bg-slate-950/50 border border-slate-700/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                required
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Category
              </label>
              <div className="flex gap-2">
                {['personal', 'health', 'career', 'learning'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      category === cat
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800 hover:text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-slate-300">
                Description
                <span className="text-slate-500 font-normal ml-1">(required)</span>
              </label>
              <textarea
                id="description"
                placeholder="Add more context about your goal..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-lg bg-slate-950/50 border border-slate-700/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Goal
                </>
              )}
            </button>
          </form>
        </div>

        {/* Helper Text */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Tip: Break down big goals into smaller, actionable steps for better success
        </p>
      </div>
    </div>
  );
}

export default AddGoals;
