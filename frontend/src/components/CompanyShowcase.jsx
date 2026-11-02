import { useState } from 'react'
import { ArrowUpRight, Code2, Layers, MousePointer2, Pause, Play } from 'lucide-react'
import useProjects from '../hooks/useProjects'

export default function CompanyShowcase() {
  const { projects } = useProjects()
  const websites = projects.filter(project => project.liveUrl && !project.category?.toLowerCase().includes('mobile'))
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)
  const project = websites[selected] || websites[0]
  return <div className={`studio-showcase${paused ? ' is-paused' : ''}`}>
    <div className="studio-grid" aria-hidden="true" />
    <div className="studio-orbit studio-orbit-one" aria-hidden="true" />
    <div className="studio-orbit studio-orbit-two" aria-hidden="true" />
    <div className="studio-browser-float">
      <div className="studio-browser">
        <div className="studio-browser-bar"><span className="studio-dots" aria-hidden="true"><i /><i /><i /></span><span>RizMern / Selected work</span><Code2 size={14} /></div>
        <div className="studio-preview">{project ? <img key={project.imageUrl} src={project.imageUrl} alt={`${project.title} website screenshot`} fetchPriority="high" decoding="async" /> : <div className="studio-placeholder">Your next digital experience.<Code2 size={70} /></div>}</div>
        <div className="studio-browser-bottom"><div><small>DESIGNED & DEVELOPED</small><strong>{project?.title || 'Built by RizMern'}</strong></div>{project?.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`}><ArrowUpRight size={22} /></a>}</div>
      </div>
    </div>
    <span className="studio-chip studio-chip-code" aria-hidden="true"><Code2 size={23} /><span>Built for the web<strong>React + Node.js</strong></span></span>
    <span className="studio-chip studio-chip-design" aria-hidden="true"><Layers size={22} /><span>Design meets function<strong>Made for your business</strong></span></span>
    <span className="studio-cursor" aria-hidden="true"><MousePointer2 size={24} fill="#67e8f9" /> Your next big idea</span>
    <div className="studio-controls"><div className="studio-selectors" aria-label="Choose a project preview">{websites.slice(0, 4).map((item, index) => <button key={item._id || item.title} type="button" aria-label={`Preview ${item.title}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><span /></button>)}</div><button className="studio-pause" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play decorative animation' : 'Pause decorative animation'}>{paused ? <Play size={13} /> : <Pause size={13} />} Animation</button></div>
  </div>
}
