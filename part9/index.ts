import express from 'express';
import calculateBmi from './calculateBmi';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

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

app.post('/exercises', (req, res) => {
    interface reqBody {
        daily_exercises: number[];
        target: number;
    }

    const { daily_exercises, target } = req.body as reqBody;

    try {
        const result = calculateExercises(daily_exercises, target);
        res.send({ result }).status(200);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        }

        res.status(400).send({ error: 'something went wrong' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`);
});
