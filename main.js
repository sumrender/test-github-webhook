const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
    const payload = req.body;
    console.log(payload);

    if (payload && payload.ref) {
        const branch = payload.ref.split('/').pop();
        console.log(`Received push event for branch: ${branch}`);

        // Check if it's the branch you want to trigger the script for
        const targetBranch = 'main'; // Change to your branch name
        if (branch === targetBranch) {
            console.log(`Executing custom script for ${branch} branch...`);

            // Execute your custom script
            exec('sh /path/to/your/script.sh', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing script: ${error.message}`);
                    return res.status(500).send('Failed to execute script');
                }
                console.log(`Script stdout: ${stdout}`);
                console.error(`Script stderr: ${stderr}`);
                res.status(200).send('Successfully executed script');
            });
        } else {
            console.log(`No action taken for branch: ${branch}`);
            res.status(200).send(`Webhook received for branch ${branch}, but no action taken`);
        }
    } else {
        console.error('Invalid webhook payload');
        res.status(400).send('Invalid webhook payload');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});