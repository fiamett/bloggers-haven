const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//change so that it gets your specific posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: User,
    });

    const post = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      post,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where:{creator_id:req.session.user_id },
      include: [User],
    });

    const post = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      post,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newpost", withAuth, async (req, res) => {
  try {
    res.render("newpost", {
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, Comment],
    });
    const poster = (postData.creator_id == req.session.user_id);

    const comData = await Comment.findAll({
      include: User,
      where: { post_id: req.params.id },
    });

    const post = postData.get({ plain: true });
    const comments = comData.map((com) => {
      cat = com.get({ plain: true })
      cat.isComm = (cat.creator_id == req.session.user_id)
      return cat
    });

    res.render("post", {post,comments,logged_in: req.session.logged_in,poster});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signin", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signin");
});
module.exports = router;
