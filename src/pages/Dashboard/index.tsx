import React, { useState, useEffect, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { Title, Form, Error, Repositories } from './styles'
import logoImg from '../../assets/logo.svg'

interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [newRepository, setNewRepository] = useState('')
  const [inputError, setInputError] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem(
      '@GihubExplore:repositories',
    )

    return storedRepositories ? JSON.parse(storedRepositories) : []
  })

  useEffect(
    () =>
      localStorage.setItem(
        '@GihubExplore:repositories',
        JSON.stringify(repositories),
      ),
    [repositories],
  )

  const handleAddRepository = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()

    if (!newRepository) {
      setInputError('Type owner/repository name')
      return
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepository}`)

      const repository = response.data

      setNewRepository('')
      setInputError('')
      setRepositories([...repositories, repository])
    } catch (error) {
      setInputError('Repository not found')
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github explorer logo" />
      <Title>Explore Github repositories</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepository}
          onChange={(e) => setNewRepository(e.target.value)}
          placeholder="Find a repository"
        />
        <button type="submit">Search</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img src={repository.owner.avatar_url} alt={repository.full_name} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard
