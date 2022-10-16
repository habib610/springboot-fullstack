import { Table } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import { EMPTY_MSG, ERR_MSG } from "./constants/constants";
import request from "./requests/request";
import { STUDENTS_ENDPOINT } from "./routes/routes";

const columns = [
    {
        title: "Student Id",
        dataIndex: "studentId",
        key: "studentId",
    },
    {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
    },
];

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            setError("");
            setLoading(true);
            try {
                const res = await request.get({ endpoint: STUDENTS_ENDPOINT });
                setData(res);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(typeof error === "string" ? error : ERR_MSG);
            }
        };
        fetchStudents();
    }, []);

    /* @DESC::  decide what to render  */
    let content = null;
    if (loading) {
        content = <h1>Loading...</h1>;
    } else if (!loading && error) {
        content = <h1>{error}</h1>;
    } else if (!loading && !error && data.length === 0) {
        content = <h1>{EMPTY_MSG}</h1>;
    } else if (!loading && !error && data.length > 0) {
        content = <Table dataSource={data} columns={columns} />;
    }
    return (
        <div className="App">
            <h1>Hello World</h1>
            {content}
        </div>
    );
}

export default App;
