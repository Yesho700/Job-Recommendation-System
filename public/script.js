document.getElementById('userForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    const experience_level = document.getElementById('experience_level').value;
    const desired_roles = document.getElementById('desired_roles').value.split(',').map(role => role.trim());
    const locations = document.getElementById('locations').value.split(',').map(location => location.trim());
    const job_type = document.getElementById('job_type').value;

    const userProfile = {
        name,
        skills,
        experience_level,
        preferences: {
            desired_roles,
            locations,
            job_type,
        },
    };

    try {
        
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userProfile),
        });

        const result = await response.json();

        if (response.ok) {
            
            const recommendationsResponse = await fetch('/api/recommand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userProfile),
            });

            const recommendations = await recommendationsResponse.json();
            displayRecommendations(recommendations);
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayRecommendations(recommendations) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';

    if (recommendations.length === 0) {
        recommendationsDiv.innerHTML = '<h1>No job recommendations found.</h1>';
        return;
    }

    const list = document.createElement('ul');
    recommendations.forEach(job => {
        const item = document.createElement('li');
        item.textContent = `${job.job_title} at ${job.company} (${job.location}) - ${job.job_type}`;
        list.appendChild(item);
    });

    recommendationsDiv.appendChild(list);
}
