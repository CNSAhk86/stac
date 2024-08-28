import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: '',
    nickname: '',
    phone: '',
    keywords: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = firebase.auth();
    const user = auth.currentUser;

    if (user) {
      const profileRef = firebase.database().ref(`profiles/${user.uid}`);

      profileRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.val());
        }
        setLoading(false);
      });

      return () => profileRef.off();
    } else {
      setLoading(false);
    }
  }, []);

  const saveProfile = async (newProfile) => {
    const auth = firebase.auth();
    const user = auth.currentUser;

    if (user) {
      const profileRef = firebase.database().ref(`profiles/${user.uid}`);
      await profileRef.set(newProfile);
      setProfile(newProfile);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile: saveProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};
