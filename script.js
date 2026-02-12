async function vote(candidate) {
    const wallet = document.getElementById("wallet").value.trim();

    if (!wallet) {
        showMessage("⚠ Please enter Wallet ID", "error");
        return;
    }

    showMessage("⏳ Recording vote on Algorand blockchain...", "loading");

    const response = await fetch("http://localhost:3000/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, candidate })
    });

    const data = await response.json();

    if (!data.success) {
        showMessage("❌ " + data.message, "error");
    } else {
        showMessage(
            `✅ Vote Recorded! <br>
             🧾 TXN ID: ${data.txnId} <br>
             🕒 ${data.time}`, 
             "success"
        );

        document.querySelectorAll(".vote-btn").forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = "0.6";
        });

        showResults();
    }
}

async function showResults() {
    const resultBox = document.getElementById("results");

    const response = await fetch("http://localhost:3000/results");
    const data = await response.json();

    const total = data.total || 1;

    const percentA = ((data["Candidate A"] / total) * 100).toFixed(1);
    const percentB = ((data["Candidate B"] / total) * 100).toFixed(1);

    resultBox.innerHTML = `
        <div>
            🟢 Candidate A: ${data["Candidate A"]} votes (${percentA}%)
            <div class="progress">
                <div class="progress-bar" style="width:${percentA}%"></div>
            </div>
        </div>
        <br>
        <div>
            🔵 Candidate B: ${data["Candidate B"]} votes (${percentB}%)
            <div class="progress">
                <div class="progress-bar blue" style="width:${percentB}%"></div>
            </div>
        </div>
        <br>
        <b>Total Votes: ${data.total}</b>
    `;
}

async function resetElection() {
    await fetch("http://localhost:3000/reset", {
        method: "POST"
    });

    showMessage("🔄 Election Reset Successfully!", "success");
    showResults();

    document.querySelectorAll(".vote-btn").forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = "1";
    });
}

function showMessage(text, type) {
    const messageBox = document.getElementById("message");

    if (type === "success") messageBox.style.color = "#00ffcc";
    else if (type === "error") messageBox.style.color = "#ff4e50";
    else if (type === "loading") messageBox.style.color = "#ffd369";

    messageBox.innerHTML = text;
}
