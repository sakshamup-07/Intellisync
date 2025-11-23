import React, { useState } from 'react'
import Navbar from './components/Navbar'
import PdfUpload from './pages/PdfUpload'
import Chat from './pages/Chat'
import NotesPage from './pages/NotesPage'
import Settings from './pages/Settings'
import { AnimatePresence, motion } from 'framer-motion'
import { useAtomValue } from "jotai";


export default function App() {
const [route, setRoute] = useState('pdf')


return (
<div className="min-h-screen flex flex-col bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-slate-100">
<Navbar route={route} setRoute={setRoute} />


<main className="flex-1 p-8 max-w-6xl mx-auto w-full">
<AnimatePresence mode="wait">
{route === 'pdf' && (
<motion.div key="pdf" initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} exit={{opacity:0, y:-8}} transition={{duration:0.25}}>
<PdfUpload />
</motion.div>
)}


{route === 'chat' && (
<motion.div key="chat" initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} exit={{opacity:0, y:-8}} transition={{duration:0.25}}>
<Chat />
</motion.div>
)}


{route === 'notes' && (
<motion.div key="notes" initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} exit={{opacity:0, y:-8}} transition={{duration:0.25}}>
<NotesPage />
</motion.div>
)}


{route === 'settings' && (
<motion.div key="settings" initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} exit={{opacity:0, y:-8}} transition={{duration:0.25}}>
<Settings />
</motion.div>
)}
</AnimatePresence>
</main>


<footer className="text-center py-4 text-sm opacity-60">IntelliSync • Futuristic Minimal</footer>
</div>
)
}
