import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Title, Form, Repositories } from './styles'
import logoImg from '../../assets/logo.svg'

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github explorer logo" />
      <Title>Explore Github repositories</Title>

      <Form>
        <input placeholder="Find a repository" />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        <a href="test">
          <img
            src="https://gitlab.com/uploads/-/system/user/avatar/5380397/avatar.png?width=400"
            alt="foo"
          />
          <div>
            <strong>franciscoescastro/bin-2-dec</strong>
            <p>Binary to decimal converter</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  )
}

export default Dashboard
