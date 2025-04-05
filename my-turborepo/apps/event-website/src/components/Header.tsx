"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { display, routes } from "@/app/resources";
import { challenges, gallery, helpqueue, person, schedule } from "@/app/resources/content";
import styles from "@/components/Header.module.scss";
import { Fade, Flex, Line, ToggleButton } from "@/once-ui/components";

export interface TimeDisplayProps {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-US'
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-US",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        show="s"
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Flex
        fitHeight
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
      >
        <Flex
          paddingLeft="12"
          fillWidth
          vertical="center"
          textVariant="body-default-s"
        >
          {/* {display.location && <Flex hide="s">{person.location}</Flex>} */}
          {""}
        </Flex>
        <Flex fillWidth horizontal="center">
          <Flex
            background="surface"
            border="neutral-medium"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s">
              {routes["/"] && (
                <ToggleButton
                  prefixIcon="home"
                  href="/"
                  selected={pathname === "/"}
                />
              )}
              <Line vert maxHeight="24" />
              {routes["/schedule"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="calendar"
                    href="/schedule"
                    label={schedule.label}
                    selected={pathname.startsWith("/schedule")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="calendar"
                    href="/schedule"
                    selected={pathname.startsWith("/schedule")}
                  />
                </>
              )}


              {routes["/challenges"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href="http://45.56.124.144/"
                    label={challenges.label}
                    selected={pathname.startsWith("/challenges")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href="http://45.56.124.144/"
                    selected={pathname.startsWith("/challenges")}
                  />
                </>
              )}

              {routes["/helpqueue"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="helpCircle"
                    href="https://helpqueue.tamudatathon.com"
                    label={helpqueue.label}
                    selected={pathname.startsWith("/helpqueue")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="helpCircle"
                    href="https://helpqueue.tamudatathon.com"
                    selected={pathname.startsWith("/helpqueue")}
                  />
                </>
              )}


              {routes["/gallery"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="gallery"
                    href="/gallery"
                    label={gallery.label}
                    selected={pathname.startsWith("/gallery")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="gallery"
                    href="/gallery"
                    selected={pathname.startsWith("/gallery")}
                  />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
