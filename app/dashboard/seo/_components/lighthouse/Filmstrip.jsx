import React from "react";

export const Filmstrip = () => {
  return (
    <div className="py-6 px-2 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
            {[1,2,3,4,5,6,7,8].map((i) => (
                <div key={i} className="w-20 h-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded shadow-sm p-1 flex flex-col gap-2">
                    <div className="flex-1 bg-slate-100 dark:bg-slate-950 rounded overflow-hidden relative">
                        {/* Simulation of page loading */}
                        {i > 2 && <div className="absolute top-2 left-2 right-2 h-2 bg-slate-200 dark:bg-slate-800 rounded" />}
                        {i > 3 && <div className="absolute top-6 left-2 right-2 h-16 bg-slate-200 dark:bg-slate-800 rounded" />}
                        {i > 5 && <div className="absolute bottom-2 left-2 right-2 h-4 bg-blue-500/20 rounded" />}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};