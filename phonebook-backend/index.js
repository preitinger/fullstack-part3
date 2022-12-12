const generateId = require('./generateId')
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

morgan.token(
  "person",
  (req, res) => {
    return JSON.stringify(req.body)
  }
)
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :person"));
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]
generateId.init(persons);

app.get("/api/persons", (req, res) => {
  res.json(persons);
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p>`)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  console.log("deleting ", person);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
})

const err400 = (res, errorText) => {
  return res.status(400).json({error: errorText});
}

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (!person) {
    return err400(res, "No data provided");
  }

  if (!person.name) {
    return err400(res, "name missing");
  }

  if (!person.number) {
    return err400(res, "number missing");
  }

  const oldPerson = persons.find(p => p.name === person.name);

  if (oldPerson) {
    return err400(res, "name must be unique");
  }

  person.id = generateId.next();
  persons.push(person); // why not here, because no requirement for persons being immutable
  console.log("post: person=", person);
  res.json(person);
})

app.listen(port, () => {
  console.log(`phonebook app listening on port ${port}`)
})
