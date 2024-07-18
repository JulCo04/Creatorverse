import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowCreators />} />
          <Route path="/ViewCreator" element={<ViewCreator />} />
          <Route path="/AddCreator" element={<AddCreator />} />
          <Route path="/EditCreator" element={<EditCreator />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
