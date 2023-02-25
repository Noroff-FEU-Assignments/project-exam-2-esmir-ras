import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { Profile } from 'types';
import { Count } from './Count';

export function ProfileCard({ _count, avatar, banner, name }: Profile) {
  const router = useRouter();

  const clickHandler = () => {
    router.push(`/profiles/${name}`);
  };

  return (
    <div
      onClick={clickHandler}
      className="shadow-md rounded-md hover:scale-105 cursor-pointer transition-all duration-200 ease-out shadow-neutral-400 p-2 lg:p-4 flex items-start justify-between gap-4" style={{background:'#1D1A27', paddingTop:'0', justifyContent:'flex-start'}}
    >
      <div style={{paddingTop:'1rem'}}>
        {avatar ? (
          <img
            src={avatar}
            alt="User avatar"
            className="rounded-full w-20 h-20"
          />
        ) : (
          <img src="/user.png" className="rounded-full w-20 h-20"></img>
        )}
      </div>
      <div>
        <h2>{name}</h2>
        <div className="flex flex-row items-center gap-8">
          <Count label="Posts" count={_count.posts} />
          <Count label="Followers" count={_count.followers} />
        </div>
      </div>
      
    </div>
  );
}
