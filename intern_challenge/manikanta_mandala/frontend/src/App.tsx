import './App.css'
import { useState } from 'react'
import { Navbar } from './components/NavBar/Navbar'
import { SideBar } from './components/SideBar/SideBar'
import { MainBody } from './components/MainBody/MainBody'

function App() {
	const [channel, setChannel] = useState('');

	return (
		<div
			className=" font-inter text-grey-400 grid grid-cols-6 " >
			<SideBar setChannel={setChannel}/>
		<main className=" col-start-2 col-end-7 " >
		<Navbar/>
		<MainBody/>
		</main>
		</div>
	)
}

export default App
