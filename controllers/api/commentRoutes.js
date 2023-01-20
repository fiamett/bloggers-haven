const router = require("express").Router();
const { User, Comment, Post } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const comData = await Comment.findAll();
    res.status(200).json(comData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comData = await Comment.findByPk(req.params.id, {
      include: [User, Post],
    });
    if (!comData) {
      res.status(404).json({ message: "no comments" });
      return;
    }
    res.status(200).json(comData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.session.logged_in) {
      Comment.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        creator_id: req.session.user_id,
      });
      res.status(200).json({ message: "comment made" });
      return;
    }
    res.redirect("../signin");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const comData = await Comment.findByPk(req.params.id);
    const parsedData = comData.get({ plain: true }) 
    if (!comData) {
      res.status(404).json({ message: "no comment found!" });
      return;
    }
    if (req.session.logged_in && req.session.user_id == parsedData.creator_id) {
      comData.set(req.body);
      await comData.save()
      res.status(200).json({ message: "comment edited" });
      return;
    }
    res.status(400).json({ message: "hey! that's not your comment!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comData = await Comment.findByPk(req.params.id);
    if (!comData) {
      res.status(404).json({ message: "no comment found!" });
      return;
    }
    if (req.session.logged_in && req.session.user_id == comData.creator_id) {
      Comment.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "sucessfully deleted" });
      return;
    }
    res.status(400).json({ message: "hey! that's not your comment!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
