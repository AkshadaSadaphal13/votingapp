const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let votes = {
    "Candidate A": 0,
    "Candidate B": 0
};

let votedWallets = [];

// Generate fake blockchain transaction ID
function generateTxnID() {
    return "ALG-" + Math.random().toString(36).substring(2, 15).toUpperCase();
}

app.post("/vote", (req, res) => {
    const { wallet, candidate } = req.body;

    if (votedWallets.includes(wallet)) {
        return res.json({ 
            success: false,
            message: "Wallet already voted!" 
        });
    }

    votes[candidate]++;
    votedWallets.push(wallet);

    res.json({ 
        success: true,
        message: "Vote recorded successfully!",
        txnId: generateTxnID(),
        time: new Date().toLocaleString()
    });
});

app.get("/results", (req, res) => {
    const total = votes["Candidate A"] + votes["Candidate B"];

    res.json({
        ...votes,
        total
    });
});

app.post("/reset", (req, res) => {
    votes = {
        "Candidate A": 0,
        "Candidate B": 0
    };
    votedWallets = [];
    res.json({ message: "Election Reset Successful" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
