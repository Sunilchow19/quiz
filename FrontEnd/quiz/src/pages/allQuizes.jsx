import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AllQuiz() {

    const location = useLocation();
    const username = location.state?.username || "User";


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row w-100 text-center">

            <h2 className="mb-4 fw-bold">Welcome, {username}!</h2>

                <h2 className="mb-4 fw-bold">Choose a Quiz Topic</h2>

                <div className="col-12 col-sm-6 col-md-4 mb-3">
                    <Link to={"/quiz"} state={{ value: "html" ,user:username}}>
                        <button className="btn btn-primary btn-lg w-100">HTML</button>
                    </Link>
                </div>

                <div className="col-12 col-sm-6 col-md-4 mb-3">
                    <Link to={"/quiz"} state={{ value: "css",user:username }}>
                        <button className="btn btn-success btn-lg w-100">CSS</button>
                    </Link>
                </div>

                <div className="col-12 col-sm-6 col-md-4 mb-3">
                    <Link to={"/quiz"} state={{ value: "javascript",user:username }}>
                        <button className="btn btn-warning btn-lg w-100 text-white">JAVASCRIPT</button>
                    </Link>
                </div>

                <div className="col-12 col-sm-6 col-md-4 mb-3">
                    <Link to={"/quiz"} state={{ value: "reactjs" ,user:username}}>
                        <button className="btn btn-info btn-lg w-100 text-white">REACTJS</button>
                    </Link>
                </div>

                <div className="col-12 col-sm-6 col-md-4 mb-3">
                    <Link to={"/quiz"} state={{ value: "nodejs",user:username }}>
                        <button className="btn btn-dark btn-lg w-100">NODEJS</button>
                    </Link>
                </div>

                <div className="col-12 col-sm-6 col-md-4 mb-3">
                    <Link to={"/quiz"} state={{ value: "python" ,user:username}}>
                        <button className="btn btn-secondary btn-lg w-100">PYTHON</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AllQuiz;
