import { useEffect, useRef } from "react";
import "./App.css";
import { cn } from "./lib/utils";
import Navbar from "./presentation/components/Navbar";
import Main from "./presentation/Main";
import Section from "./presentation/Section";
import Skill from "./presentation/Skill";
import Contact from "./presentation/Contact";
import Experience from "./presentation/Experience";
import Cert from "./presentation/Cert";
import Project from "./presentation/Project";

function App() {

  useEffect(() =>{

  },[location])

  return (
    <div className={cn('w-full h-full flex flex-col gap-16')}>
      <Navbar />
      <Main/>
      <Section/>
      <Experience/>
      <Skill/>
      <Cert/>
      <Project/>
      <Contact/>
    </div>
  );
}

export default App;
