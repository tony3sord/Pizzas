import minioClient from "./minioClient.js";

const removePhoto = (objectsToRemove) => {
  minioClient.removeObjects("propaganda", objectsToRemove, function (err) {
    if (err) {
      return console.log("Unable to remove object: ", err);
    }
    console.log("Removed the object.");
  });
};

export default removePhoto;
