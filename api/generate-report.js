// Load environment variables from the .env file
require('dotenv').config();

// Serverless function to generate a postmortem report using the ChatGPT API
module.exports = async (req, res) => {
    // Allow only POST requests
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    // Extract data from the request body
    const { 
        projectName, 
        reportDate, 
        projectDuration, 
        teamMembers, 
        overview, 
        goals, 
        goalAchievement, 
        successes, 
        achievements, 
        challenges, 
        solutions, 
        takeaways, 
        futureApplications, 
        recommendations, 
        improvements, 
        finalThoughts, 
        acknowledgments 
    } = req.body;

    // Construct the prompt for ChatGPT
    const prompt = `
        Generate a postmortem report based on the following details:
        
        Project Name: ${projectName}
        Date of Report: ${reportDate}
        Project Duration: ${projectDuration}
        Team Members: ${teamMembers}
        Overview: ${overview}
        
        Goals and Objectives:
        - Initial Goals: ${goals}
        - Goal Achievement: ${goalAchievement}
        
        Successes:
        - What went well: ${successes}
        - Key Achievements: ${achievements}
        
        Challenges:
        - Issues faced: ${challenges}
        - Solutions: ${solutions}
        
        Lessons Learned:
        - Key Takeaways: ${takeaways}
        - Future Applications: ${futureApplications}
        
        Recommendations:
        - Suggestions for similar projects: ${recommendations}
        - Potential Improvements: ${improvements}
        
        Conclusion:
        - Final Thoughts: ${finalThoughts}
        - Acknowledgments: ${acknowledgments}
    `;

    try {
        // Call the ChatGPT API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { "role": "system", "content": "You are a helpful assistant." },
                    { "role": "user", "content": prompt }
                ],
                max_tokens: 1000,
                temperature: 0.7,
            }),
        });

        // Parse the response from the ChatGPT API
        const data = await response.json();

        // Check for API errors
        if (!response.ok) {
            return res.status(response.status).json({ error: data.error.message });
        }

        // Extract the generated report content
        const generatedReport = data.choices[0].message.content;
        res.status(200).json({ report: generatedReport });
    } catch (error) {
        // Handle server or network errors
        console.error('Error calling ChatGPT API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
