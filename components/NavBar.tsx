"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { GithubIcon } from "./Icons";
import { ThemeSwitch } from "./ThemeSwitch";

export default function NavBar() {
  return (
    <Navbar className="w-full">
      <NavbarBrand>
        <Link isExternal aria-label="HeyGen" href="https://app.heygen.com/" />
        <div className="bg-gradient-to-br from-sky-300 to-indigo-500 bg-clip-text ml-4">
          <p className="text-xl font-semibold text-transparent">
            Masterclass.ai
          </p>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="flex flex-row items-center gap-4">
          <Link isExternal color="foreground" href="https://canvas.nus.edu.sg/">
            Canvas
          </Link>
          <Link
            isExternal
            color="foreground"
            href="https://nusmods.com/timetable/sem-2"
          >
            Class Schedule
          </Link>
          <Link isExternal color="foreground" href="https://github.com/">
            <GithubIcon className="text-default-500" />
            Github
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
