import { useState, useEffect } from 'react';
import { app } from '../Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged( auth ,(user) => {
        if (user && user.emailVerified) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);


  return { isAuthenticated, loading };
}

 