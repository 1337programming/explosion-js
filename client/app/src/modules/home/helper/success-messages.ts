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

export function randomSuccessMessage(): string {
  return successMessages[getRandomInt(0, successMessages.length)];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

