import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreatePage from './pages/CreatePage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from './components/Navbar.jsx'

const App = () => {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.200", "gray.800")}>
      <Navbar />
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes>

    </Box>
  )
}

export default App
