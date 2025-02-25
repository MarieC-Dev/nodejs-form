USE node_form;

CREATE TABLE form (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    userFileName VARCHAR(255),
    userFileData LONGBLOB
);

INSERT INTO form (username, userEmail, userFileName, userFileData) VALUES ('Marie', 'marie@mail.com', '', '');