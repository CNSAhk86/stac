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
    credit: 300,  // 기본 크레딧 값을 300으로 설정
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
      
      // 새로운 프로필 저장 시 credit 필드가 없으면 기본값 300을 추가
      const updatedProfile = { ...newProfile, credit: newProfile.credit || 300 };
      
      await profileRef.set(updatedProfile);
      setProfile(updatedProfile);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile: saveProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};
