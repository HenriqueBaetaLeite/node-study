const fortunes = [
  "Conquer you fears or they conquer you",
  "Rivers need springs",
  "Do not fear what you don't know",
  "Whenever possible, keep it simple",
];

exports.getFortune = () => {
  const index = Math.floor(Math.random() * fortunes.length);
  return fortunes[index];
};
