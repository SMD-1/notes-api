import { Router } from "express";
import fileUpload from "express-fileupload";
import imagekit from "../config/imageConfig.js";
import Notes from "../Model/Notes.js";

const router = Router();

router.post("/", fileUpload(), async (req, res) => {
  console.log("naiceee");
  if (!req.files) return res.status(400).json({ message: "file not uploaded" });
  console.log(req.files); //{...}
  // { noteFile: {...}, thumbnailImage: {...}}
  try {
    // upload to imgkit
    const uploadResult = await imagekit.upload({
      file: req.files.noteFile.data,
      fileName: req.files.noteFile.name,
      folder: "Notes",
    });

    // upload thumbnail if sent
    let thumbnailResult;
    if (req.files.thumbnailImage) {
      thumbnailResult = await imagekit.upload({
        file: req.files.thumbnailImage.data,
        fileName: `thumbnail-${req.files.noteFile.name.split(".")[0]}.${
          req.files.thumbnailImage.mimetype.split("/")[1]
        }`,
        folder: "Notes/thumb",
      });
    }
    // save to db
    console.log(req.body);
    const fileToSave = {
      user: req.body.user,
      title: req.body.title,
      subject: req.body.subject,
      description: req.body.description,
      size: req.files.noteFile.size,
      url: uploadResult.url,
      thumbnail: thumbnailResult?.url || "not provided",
    };
    const file = new Notes(fileToSave);
    const savedFile = await file.save();
    console.log(savedFile);
    // send saved doc back as res
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

router.get("/", async (req, res) => {
  try {
    const result = await Notes.find().populate(
      "user",
      "fullName username -_id"
    );
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});
router.get("/:fileId", async (req, res) => {
  const { fileId } = req.params;
  try {
    const file = await Notes.findById(fileId);
    res.status(200).json({
      status: "success",
      data: file,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
    console.log(err);
  }
});

export default router;
