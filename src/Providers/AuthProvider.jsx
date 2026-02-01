import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "@/firebase/firebase.config";
import useAxiosPublic from "@/hooks/usePublicAxios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  // Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   Reset Password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  //   Update User Profile
  const updateUserProfile = (name, photoURL) => {
    setLoading(true);
    const updateData = { displayName: name };
    if (photoURL) {
      updateData.photoURL = photoURL;
    }
    return updateProfile(auth.currentUser, updateData);
  };

  // Sign In User
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Delete User
  const userDelete = () => {
    setLoading(true);
    return deleteUser(auth.currentUser);
  };

  // Listen for user auth state changes

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        try {
          const res = await axiosPublic.post("/jwt", userInfo);
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        } catch (err) {
          console.error("JWT Error:", err);
          localStorage.removeItem("access-token");
        } finally {
          // This ensures the loading spinner stops even if the server returns 404
          setLoading(false);
        }
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    loading,
    setLoading,
    user,
    createUser,
    signInUser,
    updateUserProfile,
    logOut,
    resetPassword,
    userDelete,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;