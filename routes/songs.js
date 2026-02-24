const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/random", async (req, res) => {
  try {
    const genreId = req.query.genre;

    let countQuery = `
      SELECT COUNT(*) as total
      FROM songs
      WHERE is_active = TRUE
    `;

    let countParams = [];

    if (genreId) {
      countQuery += " AND genre_id = ?";
      countParams.push(genreId);
    }

    const [countResult] = await db.query(countQuery, countParams);
    const total = countResult[0].total;

    if (total === 0) {
      return res.status(404).json({message: "No songs found"});
    }

    const randomIndex = Math.floor(Math.random() * total);

    let songQuery = `
    SELECT 
      songs.id,
  songs.title,
  songs.cover_image,
  artists.name AS artist,
  genres.name AS genre,
  lyrics.content
FROM songs
JOIN artists ON songs.artist_id = artists.id
JOIN genres ON songs.genre_id = genres.id
JOIN lyrics ON songs.id = lyrics.song_id
WHERE songs.is_active = TRUE
    `;

    let songParams = [];

    if (genreId) {
      songQuery += " AND songs.genre_id = ?";
      songParams.push(genreId);
    }

    songQuery += " LIMIT 1 OFFSET ?";
    songParams.push(randomIndex);

    const [song] = await db.query(songQuery, songParams);

    res.json(song[0]);
  } catch (error) {
    console.error("SQL ERROR:", error);
    res.status(500).json({message: "Server error"});
  }
});

router.get("/genres", async (req, res) => {
  try {
    const [genres] = await db.query("SELECT * FROM genres");
    res.json(genres);
  } catch (error) {
    console.error("SQL ERROR:", error);
    res.status(500).json({message: "Server error"});
  }
});

module.exports = router;
