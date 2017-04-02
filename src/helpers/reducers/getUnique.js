export default function getUnique(array, number) {

    // Make a copy of the array
    const temp = array.slice(array);
    let count;

    if (!number) {
        // Get a random number based on the length of the array
        count = Math.floor(Math.random() * array.length + 1);
    }
    else {
        count = number;
    }

    let ret = [];

    for (let i = 0; i < count; i++) {
        let index = Math.floor(Math.random() * temp.length);
        let removed = temp.splice(index, 1);
        ret.push(removed[0]);
    }
    return ret;
}
