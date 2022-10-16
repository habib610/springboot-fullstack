import React from "react";

const Container = ({ children }) => {
    return (
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>{children}</div>
    );
};

export default Container;
