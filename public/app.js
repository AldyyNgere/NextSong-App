let lastSongId = null;
async function getRandomSong() {
  const titleEl = document.getElementById("title");
  const artistEl = document.getElementById("artist");
  const lyricsEl = document.getElementById("lyrics");
  const coverEl = document.getElementById("cover");
  const genreBadge = document.getElementById("genreBadge");
  const card = document.getElementById("card");

  const genreId = getSelectedGenre();

  try {
    let url = "/api/songs/random";
    if (genreId) {
      url += `?genre=${genreId}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("API error");

    const data = await response.json();

    // 🔥 Prevent same song twice in a row
    if (data.id === lastSongId) {
      return getRandomSong();
    }

    lastSongId = data.id;

    // 🔥 Fade out
    card.classList.add("opacity-0");

    setTimeout(() => {
      titleEl.innerText = data.title;
      artistEl.innerText = data.artist;
      genreBadge.innerText = data.genre;
      lyricsEl.innerText = data.content;

      coverEl.src =
        data.cover_image || "https://via.placeholder.com/300x300?text=No+Cover";

      // Fade in
      card.classList.remove("opacity-0");
    }, 250);
  } catch (error) {
    console.error(error);
  }
}

function getSelectedGenre() {
  const desktop = document.getElementById("genreSelect");
  const mobile = document.getElementById("genreSelectMobile");

  if (window.innerWidth >= 1024) {
    return desktop ? desktop.value : "";
  } else {
    return mobile ? mobile.value : "";
  }
}

async function loadGenres() {
  const response = await fetch("/api/songs/genres");
  const genres = await response.json();

  const desktop = document.getElementById("genreSelect");
  const mobile = document.getElementById("genreSelectMobile");

  genres.forEach((genre) => {
    const option1 = document.createElement("option");
    option1.value = genre.id;
    option1.textContent = genre.name;
    desktop?.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = genre.id;
    option2.textContent = genre.name;
    mobile?.appendChild(option2);
  });
}

document.addEventListener("DOMContentLoaded", loadGenres);
