// src/utils/uiMessages.js

const loadingMessage = document.getElementById("loadingMessage");
const noCoursesMessage = document.getElementById("noCoursesMessage");
const coursesErrorMessage = document.getElementById("coursesErrorMessage");
const userNameDisplay = document.getElementById("userNameDisplay");

export function showLoading() {
  if (loadingMessage) loadingMessage.style.display = "block";
  if (noCoursesMessage) noCoursesMessage.style.display = "none";
  if (coursesErrorMessage) coursesErrorMessage.style.display = "none";
}

export function hideLoading() {
  if (loadingMessage) loadingMessage.style.display = "none";
}

export function showNoCourses() {
  if (noCoursesMessage) noCoursesMessage.style.display = "block";
  if (coursesErrorMessage) coursesErrorMessage.style.display = "none";
}

export function showErrorMessage(message) {
  if (coursesErrorMessage) {
    coursesErrorMessage.textContent = message;
    coursesErrorMessage.style.display = "block";
  }
  if (noCoursesMessage) noCoursesMessage.style.display = "none";
}

export function setUserName(username) {
  if (userNameDisplay) {
    userNameDisplay.textContent = `Hola ${username || "Usuario"}`;
  }
}
