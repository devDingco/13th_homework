"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Footer } from "@/commons/layout/footer";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { webviewlog } from "@/commons/libraries/webview-log";
import ToggleItem from "./toggle-item";

export default function Mypages() {
  const { fetchApp } = useDeviceSetting();

  const [isLoactionChecked, setIsLoactionChecked] = useState(false);
  const [isNotificationsChecked, setIsNotificatioChecked] = useState(false);

  // 권한 조회
  const checkedPermissions = async () => {
    // 위치권한
    const locationPermission = await fetchApp({
      query: "fetchDeviceLocationForPermissionSet",
    });
    // 알림권한
    const notificationsPermission = await fetchApp({
      query: "fetchDeviceNotificationsForPermissionSet",
    });

    const isLocationPermissionGranted =
      locationPermission.data.fetchDeviceLocationForPermissionSet.status;
    const isNotificationsPermissionGranted =
      notificationsPermission.data.fetchDeviceNotificationsForPermissionSet
        .status;
    if (isLocationPermissionGranted === "granted") setIsLoactionChecked(true);
    else setIsLoactionChecked(false);

    if (isNotificationsPermissionGranted === "granted")
      setIsNotificatioChecked(true);
    else setIsNotificatioChecked(false);
  };

  useEffect(() => {
    // 설정화면 진입 시 권한 검사
    checkedPermissions();
  }, []);

  const permissionsToggle = async () => {
    // 세팅화면 보여주기
    await fetchApp({ query: "openDeviceSystemForSettingSet" });

    const interval = setInterval(async () => {
      const result = await fetchApp({
        query: "fetchDeviceSystemForAppStateSet",
      });
      const isForeground =
        result.data.fetchDeviceSystemForAppStateSet.isForeground;
      webviewlog(isForeground);
      if (!isForeground) return;

      checkedPermissions();
      clearInterval(interval);
    }, 1000);
  };

  return (
    <>
      <main className={styles.container}>
        <ToggleItem
          title="위치권한"
          checked={isLoactionChecked}
          onChange={permissionsToggle}
        />
        <div className={styles.divider}></div>
        <ToggleItem
          title="알림권한"
          checked={isNotificationsChecked}
          onChange={permissionsToggle}
        />
      </main>
      <Footer />
    </>
  );
}
