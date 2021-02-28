import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Body from "./Body";
import logo from "./logo.svg";
import Web3 from "web3";
import "./App.css";
import Electionabi from "./contracts/Election.json";

function App() {
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, []);

    const [currentAccount, setCurrentAccount] = useState("");
    const [Election, setElection] = useState();
    const [c1, setCandidate1] = useState();

    const [c2, setCandidate2] = useState();

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "No Ethereum Browser Detected . You should consider trying MetaMask!"
            );
        }
    };

    const loadBlockchaindata = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentAccount(account);
        const networkId = await web3.eth.net.getId();

        const networkData = Electionabi.networks[networkId];

        if (networkData) {
            const election = new web3.eth.Contract(
                Electionabi.abi,
                networkData.address
            );
            const candidate1 = await election.methods.candidates(1).call();
            const candidate2 = await election.methods.candidates(2).call();
            const candidate1id = candidate1.id;
            const candidate2id = candidate2.id;
            setElection(election);
            setCandidate1(candidate1);
            setCandidate2(candidate2);
        } else {
            window.alert(
                "The smart contract is not deployed to current network."
            );
        }
    };

    const votecandidate = async (candidateid) => {
        await Election.methods.Vote(candidateid).send({from: currentAccount}).on('transactionhash', () => {
            alert("Succesful!")
        });
    };

    return (
        <div className="App">
            <Navbar account={currentAccount} />
            <Body cd1={c1} cd2={c2} votecandidate={votecandidate}/>
        </div>
    );
}

export default App;
