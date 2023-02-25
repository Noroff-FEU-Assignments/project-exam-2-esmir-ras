import Home from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import Groups from '@mui/icons-material/Groups';
import Settings from '@mui/icons-material/Settings';
import Create from '@mui/icons-material/Create';
import { Profile } from 'types';
import { Count } from './Count';
import { useContext, useState } from 'react';
import { Dialog } from '@mui/material';
import { CreatePost, Modal } from 'components';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';

export function Menu({ _count, avatar, name }: Profile) {
  const [modalOpen, setModalOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const router = useRouter();

  const modalHandler = () => {
    setModalOpen((prev) => !prev);
  };

  const ownProfileHandler = () => {
    if (!user) return;
    router.push(`/profiles/${user.name}`);
  };

  return (
    <>
      <div className="p-4 shadow-neutral-400 bg-indigo-300 rounded-md mobile-height" style={{height:'80vh', background:'#1D1A27', borderRadius:'25px'}}>
        <div className="flex items-center gap-12 h-20" style={{gap:'0.5rem'}}>
          {avatar ? (
            <img
              src={avatar}
              alt="User avatar"
              className="rounded-full w-20 h-20 object-cover"
              style={{/*border:'3px solid #f7d613'*/}}
            />
          ) : (
            <span></span>
          )}
          <h2>{name}</h2>
        </div>
        <div className="flex flex-row items-center gap-8 justify-between w-full border-solid border-0 py-4 border-b-2 border-indigo-900" style={{overflow:'hidden', maxWidth:'100%', borderImage:'linear-gradient(to right, rgb(189, 77, 117), rgb(104, 97, 222)) 1'}}>
          <Count label="Posts" count={_count.posts} />
          <Count label="Following" count={_count.following} />
          <Count label="Followers" count={_count.followers} />
        </div>
        <ul className="list-none p-0 flex flex-col gap-2">
          <li
            onClick={modalHandler}
            className="flex gap-2 items-center p-2 rounded-md hover:shadow-sm cursor-pointer hover:shadow-neutral-500 hover:bg-emerald-400 transition-all duration-200 ease-out"
            style={{background:'#13111A', borderRadius:'15px', paddingLeft:'1rem', paddingTop:'0.7rem', paddingBottom:'0.7rem'}}
          >
            <Create />
            <span>New post</span>
          </li>
          <li
            onClick={ownProfileHandler}
            className="flex gap-2 items-center p-2 rounded-md hover:shadow-sm cursor-pointer hover:shadow-neutral-500 hover:bg-indigo-200 transition-all duration-200 ease-out"
            style={{background:'#13111A', borderRadius:'15px', paddingLeft:'1rem', paddingTop:'0.7rem', paddingBottom:'0.7rem'}}
          >
            <Person />
            <span>My profile</span>
          </li>
          <li
            className="flex gap-2 items-center p-2 rounded-md hover:shadow-sm cursor-pointer hover:shadow-neutral-500 hover:bg-rose-600 transition-all duration-200 ease-out mobile-logout"
            onClick={logout}
            style={{background:'#13111A', borderRadius:'15px', paddingLeft:'1rem', paddingTop:'0.7rem', paddingBottom:'0.7rem', position:'absolute', bottom:'0', width:'85%', marginBottom:'0.7rem'}}
          >
            <Logout />
            <span>Log out</span>
          </li>
        </ul>
      </div>
      <Modal open={modalOpen} onClose={modalHandler}>
        <CreatePost />
      </Modal>
    </>
  );
}
