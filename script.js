document.addEventListener('DOMContentLoaded', () => {
    const battleIdInput = document.getElementById('battleId');
    const battleDateInput = document.getElementById('battleDate');
    const battleTimeInput = document.getElementById('battleTime');
    const generateBtn = document.getElementById('generateBtn');
    const outputSection = document.getElementById('outputSection');
    const fullComplaintP = document.getElementById('fullComplaint');
    const shortComplaintP = document.getElementById('shortComplaint');

    const dearSupport = "Dear MLBB Support Team,";
    const sincerely = "Sincerely,\nJnix Rina";

    generateBtn.addEventListener('click', () => {
        const battleId = battleIdInput.value.trim();
        const battleDate = battleDateInput.value;
        const battleTime = battleTimeInput.value;

        if (!battleId || !battleDate || !battleTime) {
            alert("Please fill in all fields: Battle ID, Date, and Time.");
            return;
        }

        // Format date and time for better readability if needed
        const formattedDate = new Date(battleDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        const formattedTime = convertTo12HourFormat(battleTime);


        // Full Complaint
        const fullMessage = `${dearSupport}\n\nUnfair Matchmaking - Battle ID ${battleId}\n\nMLBB matchmaking is unfair. My teams are much weaker than enemies. Teammates pick poorly, lack skill & respect, disrupt, and can't fill roles. This creates huge score gaps. See Battle ID: ${battleId}, Date: ${formattedDate}, Time: ${formattedTime} for a clear example of severe imbalance. Please investigate and improve the system.\n\n${sincerely}`;
        fullComplaintP.textContent = fullMessage;

        // Short Complaint (under 200 characters)
        const shortMessageCore = `Unfair MLBB matchmaking. Weak teams, poor picks/skills. Huge score gaps. Ex: Battle ID ${battleId}, ${formattedDate}, ${formattedTime}. Investigate.`;
        let shortMessage = `${dearSupport}\n\n${shortMessageCore}\n\n${sincerely}`;

        if (shortMessage.length > 200) {
            // Further trim if necessary, focusing on the core message
            const availableChars = 200 - (dearSupport.length + sincerely.length + 8); // 8 for newlines and spaces
            let trimmedCore = shortMessageCore;
            if (shortMessageCore.length > availableChars) {
                trimmedCore = shortMessageCore.substring(0, availableChars - 3) + "...";
            }
            shortMessage = `${dearSupport}\n\n${trimmedCore}\n\n${sincerely}`;
        }
        // Final check if the above trimming still makes it too long (unlikely with this template but good practice)
        if (shortMessage.length > 200) {
             shortMessage = `Unfair MLBB match. Battle ID: ${battleId}, ${formattedDate}. Weak team vs strong. Investigate. -Jnix Rina`;
             if(shortMessage.length > 200) { // Absolute fallback
                shortMessage = `Unfair match. ID ${battleId}. Investigate. -Jnix Rina`.substring(0,199);
             }
        }


        shortComplaintP.textContent = shortMessage;
        outputSection.style.display = 'block';
    });

    // Copy to Clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-clipboard-target');
            const textToCopy = document.querySelector(targetId).textContent;
            const feedbackSpan = button.nextElementSibling; // Get the span next to the button

            navigator.clipboard.writeText(textToCopy).then(() => {
                feedbackSpan.textContent = 'Copied!';
                setTimeout(() => {
                    feedbackSpan.textContent = '';
                }, 2000); // Clear feedback after 2 seconds
            }).catch(err => {
                console.error('Failed to copy: ', err);
                feedbackSpan.textContent = 'Failed to copy!';
                setTimeout(() => {
                    feedbackSpan.textContent = '';
                }, 2000);
            });
        });
    });

    // Helper function to convert time to 12-hour format (optional, but nice)
    function convertTo12HourFormat(timeString) {
        if (!timeString) return "N/A";
        const [hour, minute] = timeString.split(':');
        const h = parseInt(hour, 10);
        const suffix = h >= 12 ? 'PM' : 'AM';
        const H12 = ((h + 11) % 12 + 1); // Convert 24hr to 12hr format
        return `${H12}:${minute} ${suffix}`;
    }
});
