const express = require("express");
const app = express();
const port = 3000;

// Base de données simulée
let tasks = [{ id: 1, name: "Exemple de tâche", completed: false }];

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes API
app.get("/tasks", (req, res) => res.json(tasks));

app.post("/tasks", (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json({ error: "Le text de la tache est obligatoire." });
  }
  const task = { id: Date.now(), name: name.trim(), completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if(!task){
    return res.status(404).json({error: "Tache ne trouve pas."})
  }
  if(req.body.completed !== undefined){
    task.completed = req.body.completed;
  }else{
    task.completed = !task.completed;
  }
  res.json(task);
});

app.delete("/tasks/:id", (req, res)=>{
  const taskId = parseInt(req.params.id);

  const task = tasks.find((t)=> t.id === taskId);
  if(!task){
    return res.status(404).json({error: "Tache ne trouve pas."});
  }
  tasks = tasks.filter(task => task.id !== taskId);
    res.json({message: "Tache supprime avec succes."});
});

// Démarrage du serveur
app.listen(port, () =>
  console.log(`Serveur démarré sur http://localhost:${port}`),
);
