const router = require("express").Router();
const editJsonFile = require("edit-json-file");
const { v4: uuidv4 } = require("uuid");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");
let User = require("./models/user.model");
let Session = require("./models/session.model");
let cobeDialogFile = editJsonFile("./cobeDialog.json");

const cobeDialog = cobeDialogFile.get();

const env = process.env.REGISTRATION_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, env, (err, user) => {
      // if (err) return res.status(403).end();
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.route("/register").post((req, res) => {
  if (env !== req.body.secret) return res.status(403).end();
  const username = uuidv4();
  const password = randomstring.generate({
    length: 42,
    charset: "alphanumeric",
  });
  const user = new User({ username, password });
  user
    .save()
    .then(({ username, password, _id }) =>
      res.json({ username, password, id: _id })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/api-token-auth").post((req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username, password }, env, { expiresIn: 1200 });
  User.updateOne({ username: username } && { password: password }, {
    $set: { token },
  })
    .then((data) => {
      res.json({ token });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create-session").post(authenticateJWT, async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  let id = false;
  await User.findOne({ token })
    .then(({ _id }) => (id = _id))
    .catch((err) => res.status(400).json("Error: " + err));
  const session = new Session({ userId: id, progress: 0, messages: [] });
  session
    .save()
    .then(({ userId }) => res.json({ id: userId }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/view-session").get(authenticateJWT, (req, res) => {
  const id = req.query.id;
  Session.findOne({ userId: id })
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/messages").get(authenticateJWT, (req, res) => {
  const id = req.query.id;
  const after = Number(req.query.after);
  Session.findOne({ userId: id })
    .then(({ messages }) => {
      if (messages.length === 0) res.json(false);
      res.json(after ? messages.slice(after) : messages);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/send-message").post(authenticateJWT, async (req, res) => {
  const { id, message } = req.body;
  const progress = await Session.findOne({ userId: id })
    .then(({ progress }) => progress)
    .catch((err) => res.status(400).json("Error: " + err));
  const cobeResponse = cobeDialog[progress];
  const cobeMessage = {
    isCobe: true,
    content: cobeResponse.message,
    timestap: new Date(),
  };
  const conditional = () => {
    if (progress === 0)
      return { $set: { messages: cobeMessage }, $inc: { progress: 1 } };
    else
      return {
        $addToSet: {
          messages: [
            {
              isCobe: false,
              content: message,
              timestap: new Date(),
            },
            cobeMessage,
          ],
        },
        $inc: { progress: 1 },
      };
  };
  await Session.updateOne({ userId: id }, conditional())
    .then(() => {
      res.json(cobeResponse);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
