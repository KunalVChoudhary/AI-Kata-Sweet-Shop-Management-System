import { ToastContainer } from "react-toastify";
import About from "../../components/About/About";
import Filter from "../../components/Filter/Filter";
import Navbar from "../../components/Navbar/Navbar";

function HomePage(){
    return(
        <>
            <div>
                <ToastContainer position="top-right" />
                <div className={`d-block `}>
                    <Navbar />
                    <div className={`row ps-4`}>
                        <div className="col-4">
                            <Filter/>
                        </div>
                        <div className="col-8">
                            <About/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default HomePage;