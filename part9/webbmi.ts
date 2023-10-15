import express from 'express';
import calculateBmi from './calculateBmi';

const app = express();

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(weight) || isNaN(height)) {
        res.send({ error: 'malformatted parameters' }).status(400);
    }
    res.send({
        height: height,
        weight: weight,
        bmi: calculateBmi(height, weight),
    }).status(200);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
