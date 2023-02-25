import { getProfiles } from 'api';
import { ProfileCard } from 'components/profiles/Card';
import { AuthContext } from 'context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Profile } from 'types';

export default function Profiles() {
  const { authHeader } = useContext(AuthContext);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    if (!authHeader) {
      location.assign('/');
      return;
    }
    getProfiles(authHeader).then((data) => {
      setProfiles(data);
    });
  }, [authHeader]);

  return (
    <>
      {profiles.map((profile) => (
        <ProfileCard key={`Profile-${profile.name}`} {...profile} />
      ))}
    </>
  );
}
