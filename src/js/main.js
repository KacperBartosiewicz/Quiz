const pages = document.querySelectorAll('.quiz__page')
const quiz = document.querySelector('.quiz')
const Easysteps = document.querySelectorAll('.progress-box--easy .step')
const progressBar = document.querySelector('.progress-bar')
const easyProgressBox = document.querySelector('.progress-box--easy')
const nextBtn = document.querySelector('.btn-next')
const inputName = document.querySelector('.quiz__form-name')
const error = document.querySelector('.quiz-error')
const easyWay = document.querySelector('.easy')
const hardWay = document.querySelector('.hard')
const quizBtns = document.querySelectorAll('.quiz__buttons-btn')
const quizTimes = document.querySelectorAll('.quiz__slider-time')
const sliders = document.querySelectorAll('.slider')
const times = document.querySelectorAll('.quiz__slider-time')
const answers = document.querySelectorAll('.quiz__answers')
const restartBtn = document.querySelector('.btn-restart')
const user = document.querySelector('.quiz__summary-user')
const result = document.querySelector('.result')
const summaryInfo = document.querySelector('.quiz__summary-info')
const easyBtnTop = document.querySelector('.quiz__buttons-top--easy')
const easyBtnBottom = document.querySelector('.quiz__buttons-bottom--easy')
const hardBtnTop = document.querySelector('.quiz__buttons-top--hard')
const hardBtnBottom = document.querySelector('.quiz__buttons-bottom--hard')

const pageHeight = 530
let level
let points = 0
let index = 0
let sec = 10
let countTime
let time
let username
let currentStep = 1
let currentQuestion = 0

const handleNextPage = () => {
	currentStep++
	handleCurrentPage()
	startCounter()
}

const checkInput = () => {
	if (inputName.value.length >= 3) {
		handleNextPage()
		error.style.visibility = 'hidden'
	} else {
		error.style.visibility = 'visible'
	}
	username = inputName.value
}

const handleProgressBar = () => {
	Easysteps.forEach((step, index) => {
		if (index < currentQuestion) {
			step.classList.add('active-step')
		} else {
			step.classList.remove('active-step')
		}
	})
	const activeSteps = document.querySelectorAll('.active-step')
	progressBar.style.width = ((activeSteps.length - 2) / (Easysteps.length - 1)) * 100 + '%'
}

const handleCurrentPage = () => {
	pages.forEach(page => {
		page.style.transform = `translateY(${-(currentStep - 1) * pageHeight}px)`
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
		setTimeout(() => {
			easyProgressBox.classList.add('active-box')
		}, 1000)
		easyBtnTop.classList.add('choosen')
		easyBtnTop.nextElementSibling.style.opacity = 0
		currentQuestion++
	} else {
		level = 'hard'
		easyProgressBox.classList.remove('active-box')
	}
	setTimeout(handleNextPage, 1000)
}
const startCounter = () => {
	clearInterval(countTime)
	if (currentStep !== 13) {
		countTime = setInterval(() => {
			if (sec > 0 && sliders[index].closest('.quiz__page').classList.contains('quiz-active')) {
				time = times[index]
				sec--
				time.textContent = `${sec}s`
				sliders[index].value = sec
			} else if (sec === 0) {
				handleNextQuestion()
			} else {
				return
			}
		}, 1000)
	} else {
		showResult()
		return
	}
	handleProgressBar()
}
const resetTime = () => {
	sec = 10
	index++
}
const handleNextQuestion = () => {
	setTimeout(() => {
		currentQuestion++
		resetTime()
		handleNextPage()
	}, 500)
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
	const summaryPoints = document.querySelector('.quiz__summary-user')
	summaryPoints.textContent = username
	if (points === 10) {
		summaryInfo.textContent = 'Gratulację odpowiedziałeś na wszystkie pytania poprawnie 😀'
		summaryInfo.style.color = 'greenyellow'
	} else if (points >= 6) {
		summaryInfo.textContent = `Odpowiedziałeś na ${points} pytań poprawnie 😉`
		summaryInfo.style.color = 'orange'
	} else {
		summaryInfo.textContent = 'Musisz się bardziej podszkolić ☹️'
		summaryInfo.style.color = 'tomato'
	}
}

const enterKeyCheck = e => {
	if (e.key === 'Enter' && currentStep === 1) {
		checkInput()
	}
}

nextBtn.addEventListener('click', checkInput)
inputName.addEventListener('keyup', enterKeyCheck)
quizBtns.forEach(btn => btn.addEventListener('click', checkLevel))
answers.forEach(answer => answer.addEventListener('click', checkAnswer))
restartBtn.addEventListener('click', () => {
	location.reload()
})
