const express = require('express');
const db = require("./database");
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const app = express();
const PORT = 3000;

/* --- MIDDLEWARE --- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Accept", "application/json");
    next();
});
/* ===== */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier de destination
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filtrage des fichiers pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Seules les images sont autorisées !'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM form');        
        res.json(rows); 
    } catch (error) {
        res.status(500).json({ error: error.message });        
    }
});

app.post('/api/user', upload.single('image'), async (req, res) => {
    const { name, email } = req?.body;

    console.log('Fichier reçu :', req.file);
    console.log('Body reçu :', req.body);

    if (!name || !email) {      
        console.log('Le nom et l\'email sont requis');
        return res.status(400).json({ error: 'Le nom et l\'email sont requis' });
    }

    const fileName = req?.file?.filename;
    const filePath = req?.file?.path;

    const sql = 'INSERT INTO form (username, userEmail, userFileName, userFileData) VALUES (?, ?, ?, ?)';
    const sqlValues = [name, email, fileName, filePath];

    try {
        db.query(sql, sqlValues, (err, results) => {
            if (err) {
                console.error("Erreur lors de l'insertion: ", err);
                return res.status(500).json({ error: "Erreur lors de l'insertion" });
            }
            res.status(201).json({ message: 'Utilisateur ajouté', data: results, file: req.file });
        });
    } catch (error) {
        console.error("Erreur serveur:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }

    console.log('send');  
})

app.listen(PORT, () => {
    console.log('✅ API Listen port ' + PORT);
});

// query = mysql method