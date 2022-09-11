import './App.css';
import AppContent from './Components/AppContent';
import AppHeader from './Components/AppHeader';
import PageTitle from './Components/PageTitle';
import { Toaster } from 'react-hot-toast'; 



function App() {

  

  return (
    <>
    <div className="App">
      <PageTitle >TODO LIST</PageTitle>
      <div className="container">
        <AppHeader />
        <AppContent />
      </div>

    </div>
    <Toaster  toastOptions={
      {style: {
        fontSize: '1.4rem',
      }} 
    } />
    </>
  );
}

export default App;
