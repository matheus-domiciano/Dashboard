import styles from './styles/Main'
import Header from "./Header"
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import About from '../pages/About'
import Inspections from '../pages/Inspections'

const Main = () => {

    return (
        <main >
         <Header/>  
        
            <section>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/inspecoes" element={<Inspections />} />
                    <Route path="/about" element={<About />} />
                </Routes>

            </section>

        </main>
    );

}


export default Main;