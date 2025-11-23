import React from 'react'


export default function Settings(){
return (
<section className="max-w-2xl mx-auto p-6 rounded-3xl" style={{background:'var(--glass)'}}>
<h2 className="text-2xl font-semibold mb-4">Settings</h2>
<div className="p-4 rounded-xl border border-white/6 bg-black/20">
<div className="text-sm opacity-70 mb-2">Theme</div>
<div className="flex gap-2">
<button className="px-3 py-2 rounded-lg border border-white/6">Futuristic Minimal</button>
<button className="px-3 py-2 rounded-lg border border-white/6">Cyberpunk Neon</button>
</div>
</div>
</section>
)
}