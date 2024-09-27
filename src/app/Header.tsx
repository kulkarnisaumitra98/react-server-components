import { Link } from "./shared/Link.js";

export const Header = () => {
  return (
    <div className="header">
      <Link className="header__title" href="/">
        NoteIt
      </Link>
      <div className="header__nav_cont">
        <Link className="header__nav_item" href="/add-note">
          Add Note
        </Link>
        <Link className="header__nav_item" href="/my-notes">
          My Notes
        </Link>
      </div>
    </div>
  );
};
