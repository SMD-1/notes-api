import { Router } from "express";
import fileUpload from "express-fileupload";
import imagekit from "../config/imageConfig.js";
import Notes from "../Model/Notes.js";

const router = Router();

router.post("/", fileUpload(), async (req, res) => {
  console.log("naiceee");
  if (!req.files) return res.status(400).json({ message: "file not uploaded" });
  console.log(req.files); //{...}
  //   { noteFile: {...}, thumbnailImage: {...}}
  try {
    const uploadResult = await imagekit.upload({
      file: req.files.noteFile.data,
      fileName: req.files.noteFile.name,
      folder: "Notes",
    });

    let thumbnailResult;
    if (req.files.thumbnailImage)
      thumbnailResult = await imagekit.upload({
        file: req.files.thumbnailImage.data,
        fileName: `thumbnail-${req.files.noteFile.name.split(".")[0]}.${
          req.files.thumbnailImage.mimetype.split("/")[1]
        }`,
        folder: "Notes/thumb",
      });
    const fileToSave = {
      title: req.body.title,
      subject: req.body.subject,
      description: req.body.description,
      author: req.body.userId,
      size: req.files.noteFile.size,
      url: uploadResult.url,
      thumbnail: thumbnailResult?.url || "not provided",
    };
    const file = new Notes(fileToSave);
    const savedFile = await file.save();
    console.log(savedFile);
    res.status(200).json({
      status: "success",
      data: {
        data: savedFile,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
  //    imagekit.upload({
  //       file: req.files.noteFile,
  //       fileName: req.files.noteFile,
  //       folder: "Notes",
  //     }).then(result=>{
  //         console.log(result)
  //         res.send('ok')
  //     }).catch(err=>{

  //     })
});
export default router;
