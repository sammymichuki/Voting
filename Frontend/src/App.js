import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Header } from "./components/Header";
import {DashboardHeader} from "./components/dashboard/DashboardHeader";
import { ProtectedRoute } from './components/ProtectedRoute';
import './index.css';
export function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <main className="w-full min-h-screen bg-white">
              <Header />
              <Hero />
              <Features />
              <HowItWorks />
              <Contact />
              <Footer />
            </main>
          }
        />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
             path="/dashboard" 
                element={
                     <ProtectedRoute>
                          <DashboardHeader />
                     </ProtectedRoute>
               } 
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;