// first task

function reverseString(str) {
    return str.split('').reverse().join('');
}

function updateOutput() {
    const input = document.getElementById('inputText').value;
    const output= document.getElementById('output');
    output.style.color = 'black';
    output.textContent = reverseString(input);
}

document.getElementById('inputText').addEventListener('input', () => {
    clearTimeout(window.inputTimeout);
    window.inputTimeout = setTimeout(updateOutput, 1000);
});