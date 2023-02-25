import Edit from '@mui/icons-material/Edit';
import { Alert, Button, CircularProgress } from '@mui/material';
import {
  followProfile,
  getPostsByProfileName,
  getProfileByName,
  unfollowProfile,
} from 'api';
import { Count, LightTooltip, Modal, PostPreview } from 'components';
import { EditProfile } from 'components/profiles/Edit';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Post, Profile } from 'types';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [error, setError] = useState('');
  const { authHeader, user } = useContext(AuthContext);
  const router = useRouter();
  const name = router.query.name;
  const isOwner = !!user && !!profile && user.email === profile.email;
  const isFollowed =
    !isOwner && profile?.followers?.some((fol) => fol.name === user?.name);

  useEffect(() => {
    if (!name || typeof name !== 'string') return;
    if (!authHeader) {
      location.assign('/');
      return;
    }
    getProfileByName(name, authHeader)
      .then((profile) => setProfile(profile))
      .catch((err) => setError(err));
    getPostsByProfileName(name, authHeader)
      .then((posts) => setPosts(posts))
      .catch((err) => setError(err));
  }, [name, authHeader]);

  if (error && error.length && error.length > 0) {
    return (
      <div className="h-96 flex flex-col justify-center items-center">
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-96 flex flex-col justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  const editModalHandler = () => {
    setEditOpen((prev) => !prev);
  };

  const followHandler = async () => {
    if (!authHeader) return;
    await followProfile(profile.name, authHeader);
    router.reload();
  };

  const unfollowHandler = async () => {
    if (!authHeader) return;
    await unfollowProfile(profile.name, authHeader);
    router.reload();
  };

  return (
    <>
    <div className='p-4' style={{background:'#1D1A27', borderRadius:'25px '}}>
      <div className="flex flex-row items-center gap-8" style={{marginBottom:'1rem', gap:'1rem', justifyContent:'flex-end'}}>
        {isOwner && (
            <IconButton title="Edit profile media"
                color="primary"
                className="cursor-pointer"
                onClick={editModalHandler}>
              <MoreVertIcon />
            </IconButton>
        )}
      </div>
      {profile.banner && (
        <img src={profile.banner} className="max-h-60 object-cover -mb-4" style={{width:'100%', borderRadius:'10px'}}/>
      )}
      {!profile.banner && (
        <img src="/no_image.jpg" className="max-h-60 object-cover -mb-4" style={{width:'100%', borderRadius:'10px'}}/>
      )}
      <div className="flex flex-row items-center gap-8" style={{marginTop:'2rem', gap:'1rem'}}>
        {profile.avatar && (
          <img
            src={profile.avatar}
            alt="User avatar"
            className="w-20 h-20 bg-indigo-200 object-contain rounded-full"
          />
        )}
        <div className="flex flex-row items-center gap-8 justify-around w-full border-0 py-4 border-b-2">
          <Count label="Posts" count={profile._count.posts} />
          <Count label="Following" count={profile._count.following} />
          <Count label="Followers" count={profile._count.followers} />
        </div>
        <h1 hidden>{profile.name}</h1>
        
      </div>
      <div className="flex flex-row justify-end gap-2 items-center" style={{width:'100%'}}>
          {!isOwner && !isFollowed && (
            <Button variant="contained" color="success" onClick={followHandler} style={{width:'100%', background:'linear-gradient(to right, #BD4D75, #6861DE)', color:'#fff'}}>
              Follow
            </Button>
          )}
          {!isOwner && isFollowed && (
            <Button variant="contained" color="error" onClick={unfollowHandler} style={{width:'100%', background:'linear-gradient(to right, #BD4D75, #6861DE)', color:'#fff'}}>
              Unfollow
            </Button>
          )}
        </div>
      
    </div>
      {posts &&
        posts.map((post) => (
          <PostPreview key={`PostId:${post.id}`} {...post} />
        ))}
      <Modal open={editOpen} onClose={editModalHandler}>
        <EditProfile {...profile} />
      </Modal>
    
    </>
  );
}
