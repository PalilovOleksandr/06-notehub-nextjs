import type { CSSProperties } from "react";
import { ScaleLoader } from "react-spinners";

const override: CSSProperties = {
    display: "flex",
    justifyContent: "center",
};

const Loader = () => {
    return (
        <ScaleLoader color="#dc3545" cssOverride={override} />
    );
};

export default Loader;