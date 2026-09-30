import { useCallback, useEffect, useState } from 'react'
import { getPublicProjects } from '../services/projectService'

export default function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true

    getPublicProjects()
      .then((items) => {
        if (active) setProjects(items)
      })
      .catch((requestError) => {
        if (active) setError(requestError.message)
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
