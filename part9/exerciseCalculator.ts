interface result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (
    trainingList: Array<number>,
    goal: number
): result => {
    const periodLength = trainingList.length;
    const trainingDays = trainingList.filter((n) => n !== 0).length;
    const average =
        trainingList.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        ) / trainingList.length;
    const success = average >= goal;
    const target = goal;

    const calRating = (average: number, target: number): number => {
        if (average >= target * 1.1) {
            return 1;
        } else if (average >= target) {
            return 2;
        } else {
            return 3;
        }
    };

    const rating = calRating(average, target);

    const calRatingDescription = (rating: number): string => {
        if (rating === 1) {
            return 'good';
        } else if (rating === 2) {
            return 'not bad';
        } else {
            return 'bad';
        }
    };

    const ratingDescription = calRatingDescription(rating);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
