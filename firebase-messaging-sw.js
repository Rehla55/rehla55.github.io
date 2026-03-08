importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// املأ البيانات دي من الفايربيز عندك (Config)
firebase.initializeApp({
  apiKey: "AIzaSyDsFEgVfoEVaf6AME5OV6nwTjMaHM63A5U",
  projectId: "rehla55day-e8bf2",
  storageBucket: "rehla55day-e8bf2.firebasestorage.app",
  messagingSenderId: "39933750061", // هتلاقي الرقم ده في إعدادات الفايربيز
  appId: "1:39933750061:web:99a96c649dfcf58adfc1a4" // حط الـ App ID بتاعك هنا
});

const messaging = firebase.messaging();

// عشان الإشعار يظهر والموقع مقفول
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'img/log-circle.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

