import { db } from "./db.mjs";
import fs from "fs";

// SQL to create the notes table
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

function init() {
  // Execute the create table SQL
  db.run(createTableSQL, (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Notes table created");
      // Call the function to create initial notes
      createInitialNotes();
    }

    // Close the database connection
  });
}
//
// Function to insert initial legitimate notes into the database
const createInitialNotes = () => {
  const insertNoteSQL = `
    INSERT INTO notes (title, content) 
    VALUES (?, ?)
  `;

  // Array of legitimate notes with markdown content
  const initialNotes = [
    {
      title: "Getting Started with Markdown",
      content: `
Markdown allows you to write using a plain text format that can be converted to HTML. Here are some common elements:

## Headings

- Use \`#\` for H1, \`##\` for H2, and so on.

**Example:**

\`\`\`md
# This is an H1
## This is an H2
\`\`\`

## Lists

- Bullet points: Use \`-\` or \`*\`.
- Numbered lists: Use numbers followed by a period.

**Example:**

\`\`\`md
1. First item
2. Second item
\`\`\`
      `,
    },
    {
      title: "Code Blocks in Markdown",
      content: `
You can include code blocks in markdown by using triple backticks.

\`\`\`
\`\`\`language
// Your code here
\`\`\`
\`\`\`

For example:

\`\`\`js
console.log("Hello, World!");
\`\`\`
      `,
    },
    {
      title: "Advanced Formatting in Markdown",
      content: `
Here are some advanced markdown features:

## Bold and Italics

- **Bold** text: Wrap text in double asterisks or underscores: \`**bold**\` or \`__bold__\`.
- _Italic_ text: Use single asterisks or underscores: \`*italic*\` or \`_italic_\`.

## Links

You can add links like this: 

\`[Link Text](https://example.com)\`

## Blockquotes

Use \`>\` for blockquotes:

> This is a blockquote.
      `,
    },
    {
      title: "Creating Tables in Markdown",
      content: `
To create a table, use this format:

\`\`\`md
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value 1  | Value 2  | Value 3  |
| Value A  | Value B  | Value C  |
\`\`\`

This will render a table like this:

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value 1  | Value 2  | Value 3  |
| Value A  | Value B  | Value C  |
      `,
    },
  ];

  // Insert each note into the database
  initialNotes.forEach((note) => {
    db.run(insertNoteSQL, [note.title, note.content], (err) => {
      if (err) {
        console.error("Error inserting note:", err);
      } else {
        console.log(`Note '${note.title}' added successfully.`);
      }
    });
  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err);
    } else {
      console.log("Database connection closed.");
    }
  });
};

if (!fs.existsSync("./notes.db")) {
  init();
}
