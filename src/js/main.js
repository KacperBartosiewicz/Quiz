const pages = document.querySelectorAll('.quiz__page')
const quiz = document.querySelector('.quiz')
const steps = document.querySelectorAll('.step')
const progressBar = document.querySelector('.progress-bar')
const nextBtn = document.querySelector('.btn-next')
const inputName = document.querySelector('.quiz__form-name')
const error = document.querySelector('.quiz-error')
const easyWay = document.querySelector('.easy')
const hardWay = document.querySelector('.hard')
const quizImages = document.querySelectorAll('.quiz__img-question')
const quizTimes = document.querySelectorAll('.quiz__slider-time')
const sliders = document.querySelectorAll('.slider')
const times = document.querySelectorAll('.quiz__slider-time')
const answers = document.querySelectorAll('.quiz__answers')
const restartBtn = document.querySelector('.btn-restart')
const user = document.querySelector('.quiz__summary-user')
const result = document.querySelector('.result')
const summaryInfo = document.querySelector('.quiz__summary-info')

const pageHeight = 530
let level
let points = 0
let index = 0
let sec = 10
let countTime
let time

let currentStep = 1

const handleNextPage = () => {
	currentStep++
	if (currentStep > steps.length) {
		currentStep = steps.length
	}
	handleProgressBar()
	startCounter()
}

const checkInput = () => {
	if (inputName.value.length >= 3) {
		handleNextPage()
		error.style.visibility = 'hidden'
	} else {
		error.style.visibility = 'visible'
	}
}

const handleProgressBar = () => {
	steps.forEach((step, index) => {
		if (index < currentStep) {
			step.classList.add('active-step')
		}
	})
	const activeSteps = document.querySelectorAll('.active-step')
	progressBar.style.width = ((activeSteps.length - 1) / (steps.length - 1)) * 100 + '%'
	changePage()
	handleCurrentPage()
}

const changePage = () => {
	pages.forEach(page => {
		page.style.transform = `translateY(${-(currentStep - 1) * pageHeight}px)`
	})
}
const handleCurrentPage = () => {
	pages.forEach(page => {
		if (currentStep == page.dataset.number) {
			page.classList.add('quiz-active')
		} else {
			page.classList.remove('quiz-active')
		}
	})
}

const checkLevel = e => {
	if (e.target.parentElement.matches('.easy')) {
		level = 'easy'
	} else {
		level = 'hard'
	}
	handleNextPage()
}
const startCounter = () => {
	clearInterval(countTime)
	countTime = setInterval(() => {
		if (sec > 0 && sliders[index].closest('.quiz__page').classList.contains('quiz-active')) {
			time = times[index]
			sec--
			time.textContent = `${sec}s`
			sliders[index].value = sec
		} else if (sec === 0) {
			handleNextPage()
			resetTime()
		} else {
			return
		}
	}, 1000)
}
const resetTime = () => {
	sec = 10
	index++
}
const handleNextQuestion = () => {
	setTimeout(() => {
		resetTime()
		handleNextPage()
	}, 1000)
}

const checkAnswer = e => {
	if (e.target.matches('.correct') && e.target.tagName.toLowerCase() === 'td') {
		e.target.style.backgroundColor = 'rgb(150, 211, 28)'
		points++
		answers[index].style.pointerEvents = 'none'
		handleNextQuestion()
	} else if (e.target.tagName.toLowerCase() === 'td') {
		e.target.style.backgroundColor = 'rgb(255, 82, 52)'
		answers[index].style.pointerEvents = 'none'
		handleNextQuestion()
	}
}

const showResult = () => {
	result.textContent = `${points}`
	if ((points === 10)) {
		summaryInfo.textContent = 'Gratulację odpowiedziałeś na wszystkie pytania poprawnie 😀'
		summaryInfo.style.color = 'greenyellow'
	} else if (points >= 6) {
		summaryInfo.textContent = 'Odpowiedziałeś na więcej niż 50% pytań poprawnie '
		summaryInfo.style.color = 'orange'
	} else {
		summaryInfo.textContent = 'Musisz się bardziej podszkolić ☹️'
		summaryInfo.style.color = 'tomato'
	}
}
showResult()
nextBtn.addEventListener('click', checkInput)
quizImages.forEach(image => image.addEventListener('click', checkLevel))
answers.forEach(answer => answer.addEventListener('click', checkAnswer))
