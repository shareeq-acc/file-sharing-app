import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthRoutes } from './features/auth/routes';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar/Navbar';


const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        {children}
      </Box>
    </Box>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route
            path="/auth/*"
            element={
              <AuthRoutes />
            }
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;