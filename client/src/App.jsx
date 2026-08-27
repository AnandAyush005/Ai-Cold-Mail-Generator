import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
 
import  Home from "./pages/Home.jsx"
import { Signin } from "./pages/Signin.jsx"
import { Signup } from "./pages/Signup.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { VerifyOtp } from "./pages/VerifyOtp.jsx"



const queryClient = new QueryClient();


function App() {
 

  return (

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>

            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/verify-otp" element={<VerifyOtp />} />

          </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
