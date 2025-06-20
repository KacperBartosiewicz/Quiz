const pages = document.querySelectorAll('.quiz__page')
const quiz = document.querySelector('.quiz')
const steps = document.querySelectorAll('.step')
const progressBar = document.querySelector('.progress-bar')
const nextBtn = document.querySelector('.btn-next')
const inputName = document.querySelector('.quiz__form-name')
const error = document.querySelector('.quiz-error')
const easyWay = document.querySelector('.easy')
const hardWay = document.querySelector('.hard')
const quizBox = document.querySelector('.quiz__box')
const quizTimes = document.querySelectorAll('.quiz__slider-time')
const sliders = document.querySelectorAll('.slider')
const times = document.querySelectorAll('.quiz__slider-time')
const answers = document.querySelectorAll('.quiz__answers')
const pageHeight = 530
let level
let points
let index = 0
let sec = 10
let countTime

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
			const time = times[index]
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

const checkAnswer = e => {
	if (e.target.matches('.correct') && e.target.tagName.toLowerCase() === 'td') {
		e.target.style.backgroundColor = 'rgb(150, 211, 28)'
		setTimeout(() => {
			resetTime()
			handleNextPage()
		}, 1000)
	} else if (e.target.tagName.toLowerCase() === 'td') {
		e.target.style.backgroundColor = 'rgb(255, 82, 52)'
		setTimeout(() => {
			resetTime()
			handleNextPage()
		}, 1000)
	}
}
nextBtn.addEventListener('click', checkInput)
quizBox.addEventListener('click', checkLevel)
answers.forEach(answer => addEventListener('click', checkAnswer))
