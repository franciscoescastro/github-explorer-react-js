import React, { useState, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'
import { Title, Form, Repositories } from './styles'
import logoImg from '../../assets/logo.svg'

interface Repository {
  full_name: string
  owner: {
    login: string
    avatar_url: string
  }
  html_url: string
  description: string
}

const Dashboard: React.FC = () => {
  const [newRepository, setNewRepository] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])

  const handleAddRepository = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()

    const response = await api.get<Repository>(`repos/${newRepository}`)

    const repository = response.data

    setNewRepository('')
    setRepositories([...repositories, repository])
  }

  return (
    <>
      <img src={logoImg} alt="Github explorer logo" />
      <Title>Explore Github repositories</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepository}
          onChange={(e) => setNewRepository(e.target.value)}
          placeholder="Find a repository"
        />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href={repository.html_url}>
            <img src={repository.owner.avatar_url} alt={repository.html_url} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard
