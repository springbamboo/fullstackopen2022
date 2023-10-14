const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / ((height / 100) * (height / 100));
    let result: string;
    switch (true) {
        case bmi <= 18.5:
            result = 'underweight';
            break;
        case bmi <= 24.9:
            result = 'normal weight';
            break;
        case bmi <= 29.9:
            result = 'overweight';
            break;
        default:
            result = 'obese';
            break;
    }
    return result;
};
console.log(calculateBmi(180, 74));
