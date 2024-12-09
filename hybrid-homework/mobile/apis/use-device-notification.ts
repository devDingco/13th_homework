import * as Notifications from "expo-notifications";
import { useEffect } from "react";

// 알림 수신 대기(IOS에서 필수)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const useDeviceNotifications = (onResponse) => {
  // 알림 스케줄 생성
  const createDeviceNotificationsForSubmitSet = (variables) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "신규 솔플레이스로그가 등록되었습니다.",
        data: {
          // variables로 동적경로 받아오기
          page: variables.page,
        },
      },
      trigger: null,
    });

    onResponse({
      createDeviceNotificationsForSubmitSet: {
        message: "알림 등록 완료",
      },
    });
  };

  // 알림 권한 상태 확인하기
  const fetchDeviceNotificationsForPermissionSet = async () => {
    const result = await Notifications.getPermissionsAsync();
    onResponse({
      fetchDeviceNotificationsForPermissionSet: {
        status: result.status,
      },
    });
  };

  // 알림 권한 요청
  const requestDeviceNotificationsForPermissionSet = async () => {
    await Notifications.requestPermissionsAsync();

    onResponse({
      requestDeviceNotificationsForPermissionSet: {
        message: "요청 완료",
      },
    });
  };

  // 4. 알림 클릭 대기
  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      const notificationData = response.notification.request.content.data;

      // 앱에 응답 보내기
      onResponse({ redirect: notificationData.page });
    });
  });

  return {
    createDeviceNotificationsForSubmitSet,
    fetchDeviceNotificationsForPermissionSet,
    requestDeviceNotificationsForPermissionSet,
  };
};
