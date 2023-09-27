const router = require("express").Router();
const controller = require("./user.controller");
const secureAPI = require("../../utils/secure");

router.get("/", secureAPI(["admin"]), async (req, res, next) => {
  try {
    result = await controller.list();
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});
router.get("/profile", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    
    result = await controller.getById(req.currentUser);
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});



router.put("/profile", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    if(req.cuurentRoles.includes('admin')){
      const {id,...rest}= req.body;
      rest.created_by= req.currentUser;
      rest.updated_by= req.currentUser;
     
  
     const result = await controller.updateById(id,rest);
      res.json({ data: result, msg: "Succes" });
    }
    else{
   const result = await controller.updateById(req.currentUser,req.body);
    res.json({ data: result, msg: "Succes" });}
  } catch (e) {
    next(e);
  }
});

router.put("/change-password", secureAPI([ "user"]), async (req, res, next) => {
  try {
    const {oldPassword,newPassword}= req.body;
    if(!oldPassword || !newPassword) throw new Error ('Passwords are missing')
   const result = await controller.changePassword(req.currentUser,oldPassword,newPassword);
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});

router.put("/reset-password", secureAPI([ "admin"]), async (req, res, next) => {
  try {
    const {id,...rest}= req.body;
    rest.created_by= req.currentUser;
    rest.updated_by= req.currentUser;
   const result = await controller.resetPassword(id,rest);
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});

router.patch("/status/:id", secureAPI([ "admin"]), async (req, res, next) => {
  try {
    req.body.created_by= req.currentUser;
    req.body.updated_by= req.currentUser;
   const result = await controller.block(req.params.id,req.body);
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {

    result = await controller.getById(req.params.id);
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});
router.delete("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.created_by= req.currentUser;
    req.body.updated_by= req.currentUser;
    result = await controller.archive(req.params.id,req.body);
    res.json({ data: result, msg: "Succes" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
