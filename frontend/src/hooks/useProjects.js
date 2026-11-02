import { useCallback, useEffect, useState } from 'react'
import { getPublicProjects } from '../services/projectService'
import { initialProjects } from '../data/projectsData'

export default function useProjects() {
  const [projects, setProjects] = useState(initialProjects)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true

    getPublicProjects()
      .then((items) => {
        if (active && Array.isArray(items) && items.length > 0) {
          setProjects(items)
        }
      })
      .catch((requestError) => {
        // Keep initialProjects fallback without throwing error banner
        if (active && (!projects || projects.length === 0)) {
          setProjects(initialProjects)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [attempt])

  const retry = useCallback(() => {
    setLoading(true)
    setError('')
    setAttempt((value) => value + 1)
  }, [])

  return { projects, loading, error, retry }
}
