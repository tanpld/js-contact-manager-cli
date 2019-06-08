function removeDiacriticMarks(text) {
  const bases =
    'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ';
  const alias =
    'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';
  const regex = new RegExp(bases.split('').join('|'), 'g');

  return text
    .toString()
    .replace(regex, c => alias.charAt(bases.indexOf(c))) // Replace diacritic marks
    .trim(); // remove leading/trailing space
}

module.exports = removeDiacriticMarks;
