const randomNumberGeneration = (length) => {
    let char = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let position = 0;
    let result = '';

    for(let i = 0; i<length; i++){
        position = Math.floor(Math.random() * char.length);
        result += char[position];
    }

    return result;
}

module.exports = {
    randomNumberGeneration,
}