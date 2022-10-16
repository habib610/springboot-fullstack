import { Avatar, Table } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import Container from "./components/Container";
import Loader from "./components/Loader";
import { EMPTY_MSG, ERR_MSG } from "./constants/constants";
import request from "./requests/request";
import { STUDENTS_ENDPOINT } from "./routes/routes";

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
    const columns = [
        {
            title: "",
            dataIndex: "avatar",
            render: (text, data) => (
                <Avatar size="large">
                    {`${data.firstName.slice(0, 1).toUpperCase()}`}
                    {`${data.lastName.slice(0, 1).toUpperCase()}`}
                </Avatar>
            ),
        },
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

    /* @DESC::  decide what to render  */
    let content = null;
    if (loading) {
        content = <Loader />;
    } else if (!loading && error) {
        content = <h1>{error}</h1>;
    } else if (!loading && !error && data.length === 0) {
        content = <h1>{EMPTY_MSG}</h1>;
    } else if (!loading && !error && data.length > 0) {
        content = (
            <Table pagination={false} dataSource={data} columns={columns} />
        );
    }
    return (
        <div>
            <Container>
                <h1>Hello World</h1>
                {content}
            </Container>
        </div>
    );
}

export default App;
