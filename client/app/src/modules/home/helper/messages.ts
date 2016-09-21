const successMessages: Array<string> = [
  'Okay',
  'Success',
  'Submitted',
  'Ok',
  '200',
  'Got response',
  'Input received',
  'Approved'
];

const emptyWarningMessages: Array<string> = [
  'Empty field',
  'Nothing to submit',
  'Check input',
  'Check fields',
  'Empty input',
  'Input not found'
];

const loadingWarningMessages: Array<string> = [
  'Whoa slow down!',
  'Unable to get a response',
  'Still processing last request',
  'Awaiting server response',
  'Awaiting connection from host',
  'Process not sent, still loading',
  'Thread limit exceeded',
  'Thread still processing',
  'Awaiting connection...'
];

export function randomSuccessMessage(): string {
  return successMessages[getRandomInt(0, successMessages.length)];
}

export function randomWarningEmptyMessage():string {
  return emptyWarningMessages[getRandomInt(0, emptyWarningMessages.length)];
}

export function randomWarningLoadingMessage():string {
  return loadingWarningMessages[getRandomInt(0, loadingWarningMessages.length)];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

