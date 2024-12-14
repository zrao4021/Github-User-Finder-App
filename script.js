document.getElementById('search-btn').addEventListener('click', searchUser);

async function searchUser() {
    const username = document.getElementById('username').value.trim();
    if (username === '') {
        alert('Please enter a GitHub username');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const user = await response.json();

        if (response.status === 404) {
            alert('User not found');
            return;
        }

        displayUserInfo(user);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Something went wrong!');
    }
}

function displayUserInfo(user) {
    const userInfoSection = document.getElementById('user-info');
    userInfoSection.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="150" />
        <h2>${user.name || 'No name available'}</h2>
        <p><strong>Username:</strong> ${user.login}</p>
        <p><strong>Bio:</strong> ${user.bio || 'No bio available'}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
        <p><strong>Public Repos:</strong> ${user.public_repos}</p>
        <p><strong>Location:</strong> ${user.location || 'Not provided'}</p>
        <p><a href="${user.html_url}" target="_blank">View Profile on GitHub</a></p>
    `;
}
