import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Technology from './pages/Technology';
import HowItWorks from './pages/HowItWorks';
import Demo from './pages/Demo';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import ChatBotPage from './pages/ChatBotPage';
import Docs from './pages/Docs';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/chatbot" element={<ChatBotPage />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}