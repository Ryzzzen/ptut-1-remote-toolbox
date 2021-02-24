import { useEffect } from "react";
import { useToasts } from 'react-toast-notifications';

export default function useServiceWorker() {
  const { addToast } = useToasts();

  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", async function () {
        try {
          const permission = await window.Notification.requestPermission();
          if(permission !== 'granted') throw Error('Permission not granted for Notifications');

          let registration = await navigator.serviceWorker.register('/sw.js');
          console.dir(registration);
          if (registration.ready) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
            addToast('Connexion aux notifications réussie', { appearance: 'success' });
          }
          else throw Error('Not Ready');
        } catch(error) {
          console.log("Service Worker registration failed: ", error);
          addToast('Impossible de se connecter aux notifications', { appearance: 'error' });
        }
      });
    }
  }, []);
}
