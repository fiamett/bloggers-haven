const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, Comment],
    });
    if (!postData) {
      res.status(404).json({ message: "no post found" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.session.logged_in) {
      Post.create({
        title: req.body.title,
        content: req.body.content,
        creator_id: req.session.user_id,
      });
      res.status(200).json({ message: "post made" });
      return;
    }
    res.redirect("../login");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const parsedData = postData.get({ plain: true })
    if (!postData) {
      res.status(404).json({ message: "no post found!" });
      return;
    }
    if (req.session.logged_in && req.session.user_id == parsedData.creator_id) {
      postData.set(req.body);
      await postData.save()
      res.status(200).json({ message: "post edited" });
      return;
    }
    res.status(400).json({ message: "hey! that's not your post!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: "no post found!" });
      return;
    }
    if (req.session.logged_in && req.session.user_id == postData.creator_id) {
      Post.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "sucessfully deleted" });
      return;
    }
    res.status(400).json({ message: "hey! that's not your post!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
