import { useState } from 'react'

import Layout from './components/Layout.tsx';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

    return (
  
    <div>

         <Layout/>

    </div>
    
  );
}

export default App

