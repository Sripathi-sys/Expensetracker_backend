const userModel = require("../models/User")


exports.getUser=async(req,res)=>{
    try {
      const user=await userModel.find();
      res.json(user)
    } catch (err) {
        console.error(err);

        res.status(500).json({error:"server error"})
    }
}


exports.postUser=async(req,res)=>{

  const {title,amount}=req.body;

  try {
     const newUser= new userModel({title,amount})
     await  newUser.save()
      res.status(201).json(newUser)


  } catch (error) {
     console.error(err);

        res.status(500).json({error:"server error"})
  }

}

exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  const deleted = await userModel.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(204).json({ message: "Person deleted" });
};


exports.updateUser = async (req,res)=>{
const {title,amount}=req.body;
 const id= req.params.id;


  try {
   const updateUser=await userModel.findByIdAndUpdate(id,{title,amount},{new:true})

  if (!updateUser) {
    return res.status(404).json({ message: "User not found" });
  }

res.json(updateUser)

  } 
   catch (error) {
   console.error(error); 
   res.status(500).json({ error: "server error" });
}

  }
