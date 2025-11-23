import React from 'react'
import { MdUploadFile, MdChatBubble, MdNote, MdSettings } from 'react-icons/md'
import { motion } from 'framer-motion'


export default function Navbar({route, setRoute}){
const items = [
{id:'pdf', label:'PDF', icon:<MdUploadFile/>},
{id:'chat', label:'Chat', icon:<MdChatBubble/>},
{id:'notes', label:'Notes', icon:<MdNote/>},
{id:'settings', label:'Settings', icon:<MdSettings/>},
]


return (
<nav className="w-full border-b border-white/6 bg-gradient-to-b from-neutral-900/70 to-transparent backdrop-blur-xs">
<div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
<div className="flex items-center gap-3 cursor-pointer" onClick={()=>setRoute('pdf')}>
<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-700 via-purple-700 to-cyan-600 flex items-center justify-center text-white font-extrabold">IS</div>
<div>
<div className="text-sm opacity-80">IntelliSync</div>
<div className="text-xs opacity-50">Futuristic Minimal</div>
</div>
</div>


<div className="ml-6 flex gap-2 items-center">
{items.map(it=> (
<motion.button key={it.id} onClick={()=>setRoute(it.id)} whileTap={{scale:0.97}} className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${route===it.id? 'bg-white/5 ring-1 ring-white/8' : 'hover:bg-white/2'}`}>
<span className="text-lg opacity-85">{it.icon}</span>
<span className="text-sm opacity-80">{it.label}</span>
</motion.button>
))}
</div>


<div className="ml-auto flex items-center gap-3">
<div className="text-sm opacity-60">v1.0</div>
<button className="px-3 py-2 rounded-lg bg-gradient-to-r from-white/6 to-white/3 text-sm">Open</button>
</div>
</div>
</nav>
)
}