const API_URL = "http://51.38.232.174:3002/v1";
const FEEDBACK_ID = 2;

const formElement = document.querySelector("#post-form");
const formTextArea = document.querySelector("#post-text");
const formCharacterCounter = document.querySelector("#post-text-length");
const formSubmitBtn = document.querySelector("#post-submit");

const spanCommentsLength = document.querySelector("#comments-length");
const sectionComments = document.querySelector(".feedback-comments");

const h3FeedbackTitle = document.querySelector("#feedback-title");
const pFeedbackDescription = document.querySelector("#feedback-description");
const divFeedbackCategory = document.querySelector("#feedback-category");
const spanFeedbackChat = document.querySelector("#feedback-chat");
const spanFeedbackVotes = document.querySelector("#feedback-votes");

let feedbackCommentsWrapper = document.querySelector(".feedback-comments-wrapper");

function createComment(text) {
	const pComment = document.createElement("p");

	pComment.classList.add("feedback-comment-item");
	pComment.textContent = text;
	return pComment
	
}

function displayComments(comments) {
	feedbackCommentsWrapper.remove();

	feedbackCommentsWrapper = document.createElement("div");
	feedbackCommentsWrapper.classList.add("feedback-comments-wrapper");

	for (let i = 0; i < comments.length; i++) {
		const comment = comments[i];

		const commentElem = createComment(comment.text);
		feedbackCommentsWrapper.appendChild(commentElem);
		console.log(feedbackCommentsWrapper);
		

	}
}

formTextArea.addEventListener("input", () => {
	formCharacterCounter.textContent = 250 - formTextArea.value.length;
});

formElement.addEventListener("submit", async (e) => {
	e.preventDefault();

	const textAreaValue = formTextArea.value;

	const requestA = await fetch(`${API_URL}/feedbacks/${FEEDBACK_ID}/comments`, {
		method: "POST",
		body: JSON.stringify({
			text: textAreaValue
		})
	});

	const comment = await requestA.json();
	
	const commentElement = createComment(comment.text);

	feedbackCommentsWrapper.appendChild(commentElement);
});

window.addEventListener("DOMContentLoaded", async () => {
    const request = await  fetch(`${API_URL}/feedbacks/${FEEDBACK_ID}`, { method: "GET" });

	const response = await request.json();
	console.log(response);
	
	console.log(response.title);
    h3FeedbackTitle.textContent = response.title;
    pFeedbackDescription.textContent = response.description;
    spanFeedbackVotes.textContent = response.votes;
    spanCommentsLength.textContent = response.comments.length;
    spanFeedbackChat.textContent = response.comments.length;

    displayComments(response.comments);
	
});
