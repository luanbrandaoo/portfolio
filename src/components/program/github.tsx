import React, { useEffect, useState } from 'react';
import githubLogo from '../../assets/github.png'; 
import Window from '../window/window'; 
import { stateE } from '../programStore';

const languageColors = {
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  "JavaScript": "#f1e05a",
  "Python": "#3572A5",
  "Java": "#b07219",
  "C#": "#178600",
  "PHP": "#4F5D95",
  "C++": "#f34b7d",
  "TypeScript": "#2b7489",
  "Ruby": "#701516",
  "Swift": "#ffac45",
  "Go": "#00ADD8",
  "Kotlin": "#A97BFF",
  "Rust": "#dea584",
  "Shell": "#89e051",
  "Objective-C": "#438eff",
  "Dart": "#00B4AB",
  "Elixir": "#6e4a7e",
  "Lua": "#000080",
  "MATLAB": "#e16737",
  "Vim script": "#199f4b",
  "R": "#198CE7",
  "PowerShell": "#012456",
  "Erlang": "#B83998",
  "Visual Basic .NET": "#945db7"
};

const RepositoryCard = ({ title, description, language, stars, url }) => {
  const languageColor = languageColors[language] || '#000000';

  const openRepo = () => {
    window.open(url);
  };

  return (
    <div className='h-20 w-full button flex flex-col align-center justify-center px-2 cursor-pointer' onClick={openRepo}>
      <div className='flex'>
        <span className="w-full text-black font-ms font-normal text-start">{title}</span>
        <svg className="w-4 h-4 text-black mt-0.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3z"/>
          <path d="M5 5h4V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5z"/>
        </svg>
      </div>
      <span className="text-black font-ms text-clock overflow-hidden whitespace-nowrap text-ellipsis">{description}</span>
      <div className="flex items-center">
        {language && (
          <div>
            <span className="inline-block w-3 h-3" style={{ backgroundColor: languageColor }}></span>
            <span className="text-black font-ms text-clock ml-1 mr-2">{language}</span>
          </div>
        )}
        <span className="text-black font-ms text-clock">★ {stars}</span>
      </div>
    </div>
  );
};

const UserInfo = ({ user }) => {
  const formattedBio = user.bio ? user.bio.replace(/\|/g, '\n') : '';

  const handleProfileClick = () => {
    window.open(user.html_url);
  };

  return (
    <div className=''>
      <img src={user.avatar_url} alt={`${user.login} avatar`} className='w-24 h-24 rounded-full' />
      <h2 className="text-black font-ms font-bold text-xl">{user.name}</h2>
      <div className="w-full">
        <div className="inline-block">
          <p className="text-black font-ms whitespace-pre-line">{formattedBio}</p>
          <hr className="my-2 border-windowsilver" />
        </div>
      </div>
      <p className="text-black font-ms">Followers: {user.followers}</p>
      <p className="text-black font-ms">Following: {user.following}</p>
      <svg className="w-4 h-4 text-black -ml-0.5 cursor-pointer" fill="black" viewBox="0 0 24 24" onClick={handleProfileClick}>
        <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3z"/>
        <path d="M5 5h4V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5z"/>
      </svg>
    </div>
  );
};

const Github = () => {
  const [repositories, setRepositories] = useState([]);
  const [user, setUser] = useState(null);

  const username = 'luanbrandaoo';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
          throw new Error(`Error: ${userResponse.status}`);
        }
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchRepositories = async () => {
      try {
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!repoResponse.ok) {
          throw new Error(`Error: ${repoResponse.status}`);
        }
        const repoData = await repoResponse.json();
        setRepositories(repoData);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchUserData();
    fetchRepositories();
  }, [username]);

  return (
    <Window programName={'Github'} icon={githubLogo} 
      initialPosition={{x: 50, y: 50}} initialSize={{width: 500, height: 500}} 
      minimumSize={{width: 280, height: 150}}
      initialState={stateE.FOCUSED}>
        <div className="bg-silver h-full py-2 px-4">
          <div className="flex h-full">
            <div className="w-2/5">
              {user && <UserInfo user={user} />}
            </div>
            <div className="w-3/5 flex flex-col gap-3">
              {repositories.map(repo => (
                <RepositoryCard
                  key={repo.id}
                  title={repo.name}
                  description={repo.description}
                  language={repo.language}
                  stars={repo.stargazers_count}
                  url={repo.html_url}
                />
              ))}
            </div>
          </div>
        </div>
    </Window>
  );
}

export default Github;