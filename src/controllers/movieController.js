import { prisma } from "../config/db.js";

const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, director, releaseYear } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const movie = await prisma.movie.create({
      data: { title, director, releaseYear },
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { title, director, releaseYear } = req.body;
    const movie = await prisma.movie.update({
      where: { id: Number(req.params.id) },
      data: { title, director, releaseYear },
    });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await prisma.movie.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
