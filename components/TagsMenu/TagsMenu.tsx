"use client";

import css from "./TagsMenu.module.css";

import Link from "next/link";
import { useState, useEffect } from "react";

const tags: string[] = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {}, [isOpen]);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={handleClick}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => {
            return (
              <li className={css.menuItem} key={tag}>
                <Link
                  href={`/notes/filter/${tag}`}
                  className={css.menuLink}
                  onClick={handleClick}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
