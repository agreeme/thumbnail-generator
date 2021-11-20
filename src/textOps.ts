const sentenceToLines = (sentence: string, lineLength = 4 ) => {
  let sentenceToWords = sentence.split(' ');
  const output = [];
  while (sentenceToWords.length > 0){
    output.push(sentenceToWords.splice(0, lineLength));
  }
  return output.map(x => x.join(' '))
  ;
}

export { sentenceToLines };