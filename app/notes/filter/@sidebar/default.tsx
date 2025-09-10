import Link from 'next/link';

import css from './Sidebar.module.css';

const tags: string[] = [
  'All',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Todo',
];

export default function NotesSidebar() {
  return (
    <ul className={css.menuList}>
      {tags.map(tag => {
        return (
          <li className={css.menuItem} key={tag}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
