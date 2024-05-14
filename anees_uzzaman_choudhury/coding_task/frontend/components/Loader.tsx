import { ScaleLoader } from "react-spinners"


const Loader = () =>{
return (
    <div className="flex justify-center items-start h-screen mt-12">
        <ScaleLoader color="#36d7b7" height={50} width={4} />
    </div>
    );
}

export default Loader;
