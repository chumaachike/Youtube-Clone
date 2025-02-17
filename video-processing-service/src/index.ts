import express, { Application, Request, Response } from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app: Application = express(); // Explicitly type `app`
app.use(express.json()); // Enable JSON body parsing

app.post('/process-video', (req: Request, res: Response):any => {
    const { inputFilePath, outputFilePath } = req.body;

    if (!inputFilePath || !outputFilePath) {
        return res.status(400).send('Bad Request: Missing file path');
    }

    ffmpeg(inputFilePath)
        .outputOptions('-vf', 'scale=-1:360') // Convert to 360p
        .on('end', function() {
            console.log('Processing finished successfully');
            res.status(200).send('Processing finished successfully');
        })
        .on('error', function(err: Error) {
            console.error('An error occurred:', err.message);
            res.status(500).send('An error occurred: ' + err.message);
        })
        .save(outputFilePath);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
