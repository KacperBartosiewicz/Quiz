const pages = document.querySelectorAll('.quiz__page')
const quiz = document.querySelector('.quiz')
const steps = document.querySelectorAll('.step')
const progressBar = document.querySelector('.progress-bar')
const nextBtn = document.querySelector('.btn-next')
const inputName = document.querySelector('.quiz__form-name')
const error = document.querySelector('.quiz-error')
const pageHeight = 450

let currentStep = 1

const handleNextPage = () => {
	currentStep++
	if (currentStep > steps.length) {
		currentStep = steps.length
	}
	handleProgressBar()
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
	
}


const changePage = () => {
	pages.forEach(page => {
		page.style.transform = `translateY(${-(currentStep - 1) * pageHeight}px)`
	})
}

nextBtn.addEventListener('click', checkInput)
