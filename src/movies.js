// const movies = require("./data.js");

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  //   console.log(moviesArray);
  //   return moviesArray.map((movie) => movie.director);
  return [...new Set(moviesArray.map((movie) => movie.director))];
}
// console.log(getAllDirectors(movies));
// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(
    (movie) =>
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  ).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  return Number(
    (moviesArray.length === 0
      ? 0
      : moviesArray
          .filter((el) => el.score)
          .reduce((acc, val) => acc + val.score, 0) / moviesArray.length
    ).toFixed(2)
  );
}
// const movies = require("./data.js");
// console.log(scoresAverage(movies));

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  if (!moviesArray.filter((el) => el.genre.includes("Drama")).length) {
    return 0;
  } else {
    // console.log();
    return Number(
      (
        moviesArray
          .filter((el) => el.score && el.genre.includes("Drama"))
          .reduce((acc, val) => acc + val.score, 0) /
        moviesArray.filter((el) => el.genre.includes("Drama")).length
      ).toFixed(2)
    ); //
  }
}
// const movies = require("./data.js");
// console.log(dramaMoviesScore(movies));

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  function compare(a, b) {
    if (a < b) return -1; // a is less than b
    if (a > b) return 1; // a is greater than b
    if (a === b) return 0; // a equals b
  }
  const sortedArr = [...moviesArray];
  sortedArr.sort((a, b) => compare(a.title, b.title));
  //   console.log(sortedArr);
  sortedArr.sort((a, b) => a.year - b.year);
  return sortedArr;
}

// const mov = [
//   { title: "abc", year: 2002 },
//   { title: "bac", year: 1982 },
//   { title: "aab", year: 1982 },
// ];
// const movies = require("./data.js");
// orderByYear(movies);

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  function compare(a, b) {
    if (a < b) return -1; // a is less than b
    if (a > b) return 1; // a is greater than b
    if (a === b) return 0; // a equals b
  }
  const sortedArr = moviesArray
    .map((movie) => movie.title)
    .sort((a, b) => compare(a, b));

  return sortedArr.slice(0, 20);
}
// const moviesdata = require("./data.js");
// console.log(orderAlphabetically(moviesdata));

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const copyMoviesArray = JSON.parse(JSON.stringify(moviesArray));
  let minSplit = [];
  let hourSplit = [];

  return copyMoviesArray.map((movie) => {
    hourSplit = movie.duration.split("h");
    if (!hourSplit[1]) {
      minSplit = [0];
    } else {
      minSplit = hourSplit[1].split("min");
    }

    // console.log(movie);
    movie.duration = 60 * +hourSplit[0] + parseFloat(minSplit[0]); //Number() the cleanest way to do it
    // console.log(movie.duration);
    return movie;
  });
  //   console.log(copyMoviesArray[0]);
  //   return copyMoviesArray;
}

// const moviesdata = require("./data.js");
// console.log(turnHoursToMinutes(moviesdata));

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  let indexBestAvg = 0;
  const scoresList = [];
  const moviesArrayByYear = orderByYear(moviesArray);

  if (!moviesArray.length) {
    return null;
  }

  //répartition par année
  const yearsList = [
    ...new Set(moviesArrayByYear.map((element) => element.year)),
  ];
  //   console.log(yearsList);

  yearsList.forEach((movieYear) => {
    scoresList.push(
      scoresAverage(moviesArray.filter((movie) => movie.year === movieYear))
    );
  });
  indexBestAvg = scoresList.indexOf(Math.max(...scoresList));

  return (
    "The best year was " +
    yearsList[indexBestAvg] +
    " with an average score of " +
    scoresList[indexBestAvg]
  );
}

const newMoviesArr = [
  { year: 2000, score: 5 },
  { year: 2000, score: 8 },
  { year: 1978, score: 10 },
  { year: 1978, score: 7 },
];
console.log(bestYearAvg([]));
