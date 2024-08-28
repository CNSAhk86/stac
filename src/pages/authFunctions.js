// authFunctions.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from '@firebase/auth';

export const handleAuthentication = async (auth, user, email, password, isLogin, setIsWaiting) => {
  try {
    if (user) {
      await signOut(auth);
    } else {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        await currentUser.reload();

        if (!currentUser.emailVerified) {
          await sendEmailVerification(currentUser);
          setIsWaiting(true); // Redirect to WaitingScreen
          throw new Error('이메일 인증 후 다시 로그인해주세요.');
        } else {
          // 로그인 성공
        }
      } else {
        if (!email || !password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.');
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        await sendEmailVerification(currentUser);

        await signOut(auth); // 이메일 인증 후 로그아웃
        setIsWaiting(true); // 인증 대기 화면으로 이동
      }
    }
  } catch (error) {
    return error.message;
  }
};
