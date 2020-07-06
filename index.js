const btn = document.querySelector('.talk')
const content = document.querySelector('.content')
const container = document.querySelector('.container')

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

const greet = [
    'Приветствую Вас, У меня есть несколько функций. К примеру вы можете сказать мне "Поменяй фон" и я его поменяю.  Или скажите "Кнопка"  и я изменю её цвет', 
    'Hi дружище. У меня есть несколько функций. К примеру вы можете сказать мне "Поменяй фон" и я его поменяю.  Или скажите "Кнопка"  и я изменю её цвет'
]
const bg = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']


function color(){

    var color = '#'
    for(let i = 0; i < 6; i++){
        mathRanInt = parseInt(Math.random() * bg.length)
        color += bg[mathRanInt]
    }
    return color
}


recognition.onstart = function(){
    console.log('voice is activated');
}
recognition.onresult = function(event) {

    const current = event.resultIndex
    const transcript = event.results[current][0].transcript
    content.textContent = transcript
    readOutLoud(transcript)
}

btn.addEventListener('click', () => {
    recognition.start()
})
function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance()

    

    if(message.includes('Привет')){
        const hello = greet[Math.floor(Math.random() * greet.length)]
        speech.text = hello
    }else if(message.includes('поменяй фон')) {
        container.style.background = `linear-gradient(25deg, ${color()}, ${color()}, ${color()})`;
    }else if(message.includes('кнопка')) {
        btn.style.background = `${color()}`;
    }else{
        speech.text = 'Я не совсем вас понимаю'
    }

    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1
    window.speechSynthesis.speak(speech)
}