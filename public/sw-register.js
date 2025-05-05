
// Register the service worker only in production mode
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
        
        // Request notification permission
        if ('Notification' in window) {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              console.log('Notification permission granted.');
              
              // Subscribe to push notifications if supported
              if ('PushManager' in window) {
                subscribeToPushNotifications(registration);
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error('ServiceWorker registration failed:', error);
      });
  });

  // Enable background sync for orders
  async function syncOrders() {
    if ('SyncManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('sync-orders');
        console.log('Background sync registered for orders');
      } catch (error) {
        console.error('Background sync registration failed:', error);
      }
    }
  }

  // Function to subscribe to push notifications
  async function subscribeToPushNotifications(registration) {
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
        )
      });
      
      console.log('User is subscribed to push notifications');
      // Send subscription to your server
      updateSubscriptionOnServer(subscription);
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    }
  }

  // Helper function to convert base64 to Uint8Array for VAPID key
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Send subscription to server
  function updateSubscriptionOnServer(subscription) {
    // This would typically send the subscription to your server
    console.log('Subscription sent to server:', JSON.stringify(subscription));
  }
}

// Add to home screen functionality
let deferredPrompt;
const addToHomeBtn = document.getElementById('add-to-home');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show the add to home screen button
  if (addToHomeBtn) {
    addToHomeBtn.style.display = 'block';
  }
});

// Add event listener for add to home button if it exists
if (addToHomeBtn) {
  addToHomeBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        // Clear the saved prompt
        deferredPrompt = null;
        // Hide the button
        addToHomeBtn.style.display = 'none';
      });
    }
  });
}
