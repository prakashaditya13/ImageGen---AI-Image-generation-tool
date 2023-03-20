import React from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import {Home, CreatePost} from './pages'

const App = () => {
  return (
   <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b-[#e6ebf4]">
      <Link to='/'>
        <h2 className="text-[20px] font-normal">Image<span className="text-cyan-300 font-bold">Gen</span>/<span className="font-normal">AI</span></h2>
      </Link>

      <Link to='/create-post' className="font-inter font-medium bg-[#6469ff] text-white px-3 py-1 rounded-md">Create</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create-post" element={<CreatePost/>} />
      </Routes>
    </main>
   </BrowserRouter>
  );
};

export default App;
