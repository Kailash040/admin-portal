
import './App.css';
import AddRecord from './components/AddRecord';
import MainSection from './components/MainSection';
import SideBar from './components/SideBar';

function App() {
  return (
    <div >
     <h1 className='text-center'>Admin-Portal</h1>
     <div className='container'>

     <div className='row'>
      <div className='col-lg-3 col-sm-12'>
<SideBar/>
      </div>
      <div className='col-lg-9 col-sm-12'>
<MainSection/>
<AddRecord/>
      </div>

     </div>
     </div>
    </div>
  );
}

export default App;
