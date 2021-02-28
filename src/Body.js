import React, { useState } from "react";

const Body = ({ cd1, cd2, votecandidate }) => {
    const candidate1 = { ...cd1 };
    console.log(candidate1);
    const candidate2 = { ...cd2 };
    console.log(candidate2);

    const [candidate, setCandidate] = useState("");

    const onchange = (e) => {
        setCandidate(e.target.value);
    };

    const onsubmit = (e) => {
        e.preventDefault();
        if (candidate.id !== 0) {
            votecandidate(Number(candidate));
        } else {
            window.alert("There is error in submition");
        }
    };

    return (
        <div className="mt-4 text-center">
            <h2>Election </h2>
            <hr
                style={{
                    width: "70%",
                    borderStyle: "solid",
                    borderWidth: "2px",
                }}
            />

            <div className="p-3 ml-auto mr-auto" style={{ width: "40%" }}>
                <div
                    className="row ml-auto mr-auto mb-2"
                    style={{ width: "90%" }}
                >
                    <div className="col">
                        <p>#</p>
                    </div>
                    <div className="col">
                        <p>Name</p>
                    </div>
                    <div className="col">
                        <p>Votes</p>
                    </div>
                </div>
                <hr />
                <div
                    className="row ml-auto mr-auto mb-2"
                    style={{ width: "90%" }}
                >
                    <div className="col">
                        <p>{candidate1.id}</p>
                    </div>
                    <div className="col">
                        <p>{candidate1.name}</p>
                    </div>
                    <div className="col">
                        <p>{candidate1.voteCount}</p>
                    </div>
                </div>
                <div
                    className="row ml-auto mr-auto mb-2"
                    style={{ width: "90%" }}
                >
                    <div className="col">
                        <p>{candidate2.id}</p>
                    </div>
                    <div className="col">
                        <p>{candidate2.name}</p>
                    </div>
                    <div className="col">
                        <p>{candidate2.voteCount}</p>
                    </div>
                </div>
            </div>
            <div
                className="my-5 mr-auto ml-auto text-left"
                style={{ width: "70%" }}
            >
                <h5>Cast your vote: </h5>
                <form onSubmit={onsubmit}>
                    <select
                        id=""
                        className="form-control"
                        name="candidate"
                        onChange={onchange}
                    >
                        <option defaultValue value="">
                            select
                        </option>
                        <option value={candidate1.id}>{candidate1.name}</option>
                        <option value={candidate2.id}>{candidate2.name}</option>
                    </select>
                    <button className="btn btn-primary mt-2 btn-md w-100">
                        Vote Candidate {candidate}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Body;
