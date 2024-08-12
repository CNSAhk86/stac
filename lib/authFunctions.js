import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from '@firebase/auth';

export const handleAuthentication = async (auth, user, email, password, isLogin, setIsWaiting) => {
  try {
    if (user) {
      console.log('사용자가 성공적으로 로그아웃되었습니다!');
      await signOut(auth);
    } else {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        if (!currentUser.emailVerified) {
          console.log('이메일 인증이 필요합니다. 이메일을 확인해주세요.');
          await sendEmailVerification(currentUser); // 이메일 인증 메일 발송
          throw new Error('이메일 인증 후 다시 로그인해주세요.');
        } else {
          console.log('사용자가 성공적으로 로그인되었습니다!');
        }
      } else {
        // 이메일과 비밀번호가 유효한지 확인
        if (!email || !password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.');
        }

        // 회원가입 진행
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        await sendEmailVerification(currentUser); // 이메일 인증 메일 발송
        console.log('사용자가 성공적으로 생성되었습니다! 이메일 인증을 진행해주세요.');
        setIsWaiting(true); // 대기 페이지로 이동
      }
    }
  } catch (error) {
    console.error('인증 오류:', error.message);
    return error.message;
  }
};

export const checkEmailVerification = async (auth, setUser, setIsWaiting) => {
  const user = auth.currentUser;
  if (user) {
    await user.reload(); // 사용자 정보를 새로고침
    if (user.emailVerified) {
      setUser(user);
      setIsWaiting(false);
    }
  }
};