import { useEffect, useState } from 'react'

export default function BackToTop(){
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <button className="back-to-top" aria-label="Voltar ao topo" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
      ↑
    </button>
  )
}
