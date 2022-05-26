const splitToChunks = (arr, ...args) => {
    const chunked = [];
    args.forEach(value => {
        const chunk = [];
        for (let i = 1; i <= value; i++) {
            chunk.push(arr.shift());
        }
        chunked.push(chunk);
    });
    if (arr.length > 0) chunked.push(arr);
    return chunked;
}
const chunksToNumber = chunks => chunks.map(num => parseInt(num.join("")));

const filterAnswers = (sign, num, answers) => {
    if (sign === "+") {
        return answers.filter(ans => ans >= num && ans <= num + 30);
    } else {
        return answers.filter(ans => ans <= 30 - num);
    }
}

const getAnswer = (text, answers) => {
    let answer;
    const isRegular = /^\d+[+-]\d+$/.test(text);
    const isNumbersOnly = /^\d+$/.test(text);
    
    if (isRegular) {
        const [, a, sign, b] = text.match(/^(\d+)([+-])(\d+)$/);
        const [n1, n2] = [a, b].map(x => parseInt(x));
        const hasAllElements = [n1, n2].every(x => x <= 30) && sign;
        console.log(n1, n2);
        if (hasAllElements) {
            answer = sign === "+" ? n1 + n2 : n1 - n2;
        } else {
            if (n1 <= 30 && n2 > 30) {
                answers = filterAnswers(sign, n1, answers);
            } else if (n1 > 30 && n2 <= 30) {
                answers = filterAnswers(sign, n2, answers);
            }
        }
    } else if (isNumbersOnly) {
        const numbers = text.split("").map(x => parseInt(x));
        if ([2, 4].includes(text.length)) {
            const [n1, n2] = chunksToNumber(splitToChunks(numbers, text.length/2));
            const maxValue = text.length === 4 ? 30 : 9;
            const possibleAnswers = new Set();
            if ([n1, n2].every(num => num <= maxValue)) {
                if (answers.includes(n1 + n2)) possibleAnswers.add(n1+n2);
                if (answers.includes(n1 - n2)) possibleAnswers.add(n1-n2);
                if (possibleAnswers.size === 1) { 
                    answer = Array.from(possibleAnswers)[0];
                } else if (possibleAnswers.size > 1) {
                    answers = answers.filter(ans => possibleAnswers.has(ans));
                }
            } else {
                answers = answers.filter(ans => ans <= maxValue + Math.min(n1, n2));
            }
        } else if (text.length === 3) {
            const first = chunksToNumber(splitToChunks(numbers, 2, 1));
            const second = chunksToNumber(splitToChunks(numbers, 1, 2));
            const [n1, n2, m1, m2] = [...first, ...second];
            const possibleAnswers = new Set();
            if (n1 > 30 && m2 > 30) {
                answers = answers.filter(ans => ans <= 39);
            }
            if (n1 <= 30) {
                if (answers.includes(n1 + n2)) possibleAnswers.add(n1+n2);
                if (answers.includes(n1 - n2)) possibleAnswers.add(n1-n2);
            }
            if (m2 <= 30) {
                if (answers.includes(m1 + m2)) possibleAnswers.add(n1+n2);
            }
            if (possibleAnswers.size === 1) { 
                answer = Array.from(possibleAnswers)[0];
            } else if (possibleAnswers.size > 1) {
                answers = answers.filter(ans => possibleAnswers.has(ans));
            }
        }
    }
    
    if (answer && answers.includes(answer)) {
        return answer;
    } else {
        return answers[Math.floor(Math.random() * answers.length)];
    }
}

console.log(getAnswer("2010", [10, 25, 30, 5]));