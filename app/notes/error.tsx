"use client";

interface ErrorProps {
    error: Error;
    reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
    return (
        <>
            <p>Could not fetch the list of notes. {error.message}</p>
            <button onClick={reset}>Спробувати знову</button>
        </>
    );
};

export default Error;