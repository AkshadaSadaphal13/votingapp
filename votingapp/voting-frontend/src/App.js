import { useState } from "react";
import { CheckCircle, Wallet, LogIn, Vote, BarChart3, UserCog } from "lucide-react";

export default function App() {
  const [role, setRole] = useState("student"); // student | admin
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("");

  const txHash = "ALGO8F3A9XK2DUMMYBLOCKCHAINHASH001";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h1 className="text-3xl font-extrabold tracking-wide">TechVanta</h1>
          <p className="text-sm opacity-90">Campus Blockchain Voting System</p>
        </div>

        {/* Role Switch */}
        <div className="flex justify-center gap-4 py-3 text-sm">
          <button onClick={() => { setRole("student"); setStep(1); }} className={`px-4 py-1 rounded-full ${role === "student" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}>Student</button>
          <button onClick={() => setRole("admin")} className={`px-4 py-1 rounded-full ${role === "admin" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}>Admin</button>
        </div>

        {/* STUDENT FLOW */}
        {role === "student" && (
          <div className="p-8">

            {/* Progress */}
            <div className="flex justify-between mb-6 text-xs font-medium">
              {["Login", "Wallet", "Vote", "Done"].map((label, i) => (
                <span key={label} className={step >= i + 1 ? "text-indigo-600" : "text-gray-400"}>{label}</span>
              ))}
            </div>

            {/* Login */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold flex items-center gap-2"><LogIn size={20} /> Student Login</h2>
                <input className="w-full p-3 border rounded-xl" placeholder="Student ID" />
                <input type="password" className="w-full p-3 border rounded-xl" placeholder="Password" />
                <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold">Continue</button>
              </div>
            )}

            {/* Wallet */}
            {step === 2 && (
              <div className="space-y-6 text-center">
                <h2 className="text-xl font-semibold flex items-center justify-center gap-2"><Wallet size={20} /> Wallet Authentication</h2>
                <div className="p-4 border-2 border-dashed rounded-xl bg-indigo-50 text-indigo-700">Pera Wallet Connected</div>
                <button onClick={() => setStep(3)} className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold">Proceed to Vote</button>
              </div>
            )}

            {/* Vote */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold flex items-center gap-2"><Vote size={20} /> Cast Your Vote</h2>
                {["Candidate A", "Candidate B", "Candidate C"].map(c => (
                  <label key={c} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer ${selected === c ? "border-indigo-600 bg-indigo-50" : ""}`}>
                    <input type="radio" checked={selected === c} onChange={() => setSelected(c)} /> {c}
                  </label>
                ))}
                <button disabled={!selected} onClick={() => setStep(4)} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50">Submit Vote</button>
              </div>
            )}

            {/* Success */}
            {step === 4 && (
              <div className="text-center space-y-4">
                <CheckCircle className="mx-auto text-green-600" size={48} />
                <h2 className="text-2xl font-bold text-green-600">Vote Recorded</h2>
                <p className="text-sm text-gray-500">Transaction Hash</p>
                <p className="text-xs bg-gray-100 p-2 rounded break-all">{txHash}</p>
                <p className="text-xs text-gray-400">Immutable record on Algorand Blockchain</p>
              </div>
            )}
          </div>
        )}

        {/* ADMIN DASHBOARD */}
        {role === "admin" && (
          <div className="p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 justify-center"><UserCog size={22} /> Admin Dashboard</h2>

            <div className="p-4 border rounded-xl space-y-3">
              <h3 className="font-semibold">Create Election</h3>
              <input className="w-full p-2 border rounded" placeholder="Election Name" />
              <input className="w-full p-2 border rounded" placeholder="Candidates (comma separated)" />
              <button className="w-full py-2 bg-indigo-600 text-white rounded">Create Election</button>
            </div>

            <div className="p-4 border rounded-xl">
              <h3 className="font-semibold flex items-center gap-2 mb-3"><BarChart3 size={18} /> Live Results</h3>
              <div className="space-y-3 text-sm">
                <div>Candidate A <div className="h-2 bg-indigo-600 rounded w-[45%]"></div></div>
                <div>Candidate B <div className="h-2 bg-purple-600 rounded w-[35%]"></div></div>
                <div>Candidate C <div className="h-2 bg-pink-600 rounded w-[20%]"></div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}