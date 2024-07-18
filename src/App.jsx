import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from './client';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import './App.css';

function App() {

  const [creators, setCreators] = useState([]);

  useEffect(() => {
    async function fetchAllCreators() {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*');

        if (error) {
          throw error;
        }

        setCreators(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchAllCreators();
  }, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowCreators creators={creators}/>} />
          <Route path="/ViewCreator/:id" element={<ViewCreator />} />
          <Route path="/AddCreator" element={<AddCreator />} />
          <Route path="/EditCreator/:id" element={<EditCreator />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
