const router = require("express").Router();
const editJsonFile = require("edit-json-file");
const { v4: uuidv4 } = require("uuid");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");
let usersFile = editJsonFile("./users.json");
let sessionsFile = editJsonFile("./sessions.json");
let cobeDialogFile = editJsonFile("./cobeDialog.json");

const users = usersFile.get();
const sessions = sessionsFile.get();
const cobeDialog = cobeDialogFile.get();

function checkToken(req, res) {
  if (req.headers.authorization.length !== 276) return res.status(403).end();
}

router.route("/").get((req, res) => {
  // res.json("dupa");
  res.send(users);
});

router.route("/register").post((req, res) => {
  const env = process.env.REGISTRATION_SECRET;
  if (env !== req.body.secret) return res.status(403).end();
  const username = uuidv4();
  const password = randomstring.generate({
    length: 42,
    charset: "alphanumeric",
  });
  const user = { username, password, id: users.length };
  usersFile.append(null, user).save();
  res.json(user);
});

router.route("/api-token-auth").post((req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign(
    { username, password },
    process.env.REGISTRATION_SECRET,
    { expiresIn: 1200 }
  );
  const index = users.findIndex(
    (item) => item.username === username && item.password === password
  );
  users[index].token = token;
  usersFile.set(null, users).save();
  res.json({ token });
});

router.route("/create-session").post((req, res) => {
  checkToken(req, res);
  const token = req.headers.authorization.replace("Bearer ", "");
  const index = users.findIndex((item) => item.token === token);
  const id = users[index].id;
  sessionsFile.append(null, { id, progress: 0, messages: [] }).save();
  res.json({ id });
});

router.route("/view-session").get((req, res) => {
  checkToken(req, res);
  const id = Number(req.query.id);
  const index = sessions.findIndex((item) => item.id === id);
  const item = sessions[index];
  res.json(item);
});

router.route("/messages").get((req, res) => {
  checkToken(req, res);
  const id = Number(req.query.id);
  const after = Number(req.query.after);
  const index = sessions.findIndex((item) => item.id === id);
  const messages = sessions[index].messages;
  if (messages.length === 0) res.json(false);
  res.json(after ? messages.slice(after) : messages);
});

router.route("/send-message").post((req, res) => {
  checkToken(req, res);
  const { id, message } = req.body;
  const index = sessions.findIndex((item) => item.id === id);
  const cobeResponse = cobeDialog[sessions[index].progress];
  const cobeMessage = {
    isCobe: true,
    content: cobeResponse.message,
    timestap: new Date(),
  };
  res.json(cobeResponse);
  if (sessions[index].progress === 0) {
    sessionsFile.set(null, sessions[index].messages.push(cobeMessage)).save();
  } else {
    sessionsFile
      .set(
        null,
        sessions[index].messages.push(
          {
            isCobe: false,
            content: message,
            timestap: new Date(),
          },
          cobeMessage
        )
      )
      .save();
  }
  sessionsFile.set(null, (sessions[index].progress += 1)).save();
});

module.exports = router;
