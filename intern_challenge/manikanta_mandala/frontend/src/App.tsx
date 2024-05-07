import './App.css'
import { Navbar } from './components/NavBar/Navbar'
import { SideBar } from './components/SideBar/SideBar'
import { MainBody } from './components/MainBody/MainBody'

function App() {

  return (
    <div
		className="
			font-inter
			text-grey-400
			grid
			grid-cols-6
		  "
		>
			<SideBar/>
			<main className=" 
					col-start-2 
					col-end-7 
				"
				>
				<Navbar/>
				<MainBody/>
			</main>
    </div>
  )
}

export default App
