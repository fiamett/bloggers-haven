const router = require("express").Router();
const { User, Post, Comment } = require("../../models");


router.get("/", async (req, res) => {
    try {
      const userData = await User.findAll();
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get("/:id", async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [Post,Comment],
      });
      if (!userData) {
        res.status(404).json({ message: "no user with this id!" });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.post("/signup", async (req,res) => {
    try {
      const userData = await User.findOne({where: {name:req.body.name}})
      if (userData) {
        res.status(402).json({message:"name was taken try another"})
        return;
      }
      newUser = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
  
        res.status(200).json({message:"signup success"});
      });
    }catch(err){
      res.status(400).json(err)
    }
  });

router.post("/signin",async (req,res)=>{
    try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/signout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req,res) => {
  try{
    const userData = await User.findByPk(req.params.id)
    if (!userData) {
      res.status(404).json({ message: "no user with this id!" });
      return;
    }
    if (req.session.logged_in && req.session.user_id == req.params.id){
      userData.set(req.body)
      res.status(200).json({message:"password changed"})
      return;
    }
    res.status(400).json({message:"hey! that's not your account!"})
  }catch(err){
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req,res) => {
  try{
    const userData = await User.findByPk(req.params.id)
    if (!userData) {
      res.status(404).json({ message: "no user with this id!" });
      return;
    }
    if (req.session.logged_in && req.session.user_id == req.params.id){
      User.destroy({where:{id: req.params.id}})
      res.status(200).json({message:"sucessfully deleted"})
      return;
    }
    res.status(400).json({message:"hey! that's not your account!"})
  }catch(err){
    res.status(400).json(err)
  }
})

module.exports = router;