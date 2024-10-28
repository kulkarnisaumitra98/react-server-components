"use client";

export const NoteTitle = ({ title }: any) => (
  <div style={{ display: "flex" }}>
    <div>
      <h2>
        {/* @ts-ignore */}
        <marquee>{title}</marquee>
      </h2>
    </div>
    <div>
      <b style={{ color: "orange" }}>
        (Client Component composed with server component)
      </b>
    </div>
  </div>
);
