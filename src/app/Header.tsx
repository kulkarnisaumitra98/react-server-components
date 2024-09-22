export const Header = () => {
  return (
    <div className="header">
      <a className="header__title" href="/">
        NoteIt
      </a>
      <div className="header__nav_cont">
        <a className="header__nav_item" href="/add-note">
          Add Note
        </a>
        <a className="header__nav_item" href="/my-notes">
          My Notes
        </a>
      </div>
    </div>
  );
};
