const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * Upload file API
 * @param req
 * @param res
 * @returns void
 */
const uploadFile = async (req, res) => {
    const parseFormDataResponse = await parseFormData(req).catch(parseFormDataError => {
        console.log(`Could not process the given data. Error: ${parseFormDataError}`)
    });
    if (parseFormDataResponse) {
        const fileDetails = parseFormDataResponse.fileDetails;
        const fields = parseFormDataResponse.fields;
        fileDetails.forEach(fileDetail => {
            const newpath = path.join(__dirname, "./uploads/", fileDetail.originalFilename);
            const oldpath = fileDetail.path;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                const resolutions = fields.resolution.split('x');
                const options = {
                    width: parseInt(resolutions[0], 10),
                    height: parseInt(resolutions[1], 10),
                }
                resizeImage(path.join(__dirname, "./uploads"), fileDetail.originalFilename, options);
            });
        });
        console.log('File uploaded, uploadFile');
        return res.status(200).send({ data: `http://localhost:8000/api/download/thumbnail_${fileDetails[0].originalFilename}` });
    } else {
        console.log('Invalid request, uploadFile');
        return res.status(422).send({ data: `Invalid request, uploadFile` });
    }
}

const parseFormData = (req) => {
    return new Promise((resolve, reject) => {
        var form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            if (err) {
              return reject('Error while parsing form data');
            }
            Object.keys(fields).forEach(element => {
              fields[element] = fields[element][0];
            });
            fileDetails = []
            Object.keys(files).forEach(element => {
              fileDetails = fileDetails.concat(files[element])
            });
            const data = {
              fields,
              fileDetails,
            }
            resolve(data);
        });
    });
}

const resizeImage = (imagePath, imageName, options) => {
    // original image
    let originalImage = `${imagePath}/${imageName}`;
    // file name for cropped image
    let outputImage = `${imagePath}/thumbnail_${imageName}`;
    sharp(originalImage).resize(options.width, options.height).toFile(outputImage)
        .then(function (new_file_info) {
            console.log("Image cropped and saved");
        })
        .catch(function (err) {
            console.log("An error occured", err);
        });
}

/**
 * Download file API
 * @param req
 * @param res
 * @returns void
 */
const downloadFile = (req, res) => {
    const { fileName } = req.params;
    return res.sendFile(path.join(__dirname, "./uploads/", fileName));
}


module.exports = {
    uploadFile,
    downloadFile,
}
