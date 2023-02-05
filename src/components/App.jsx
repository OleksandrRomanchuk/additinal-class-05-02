import { useState, useEffect } from 'react';

import { Button } from './Button/Button';
// import { Component } from 'react';
import { getMovies } from 'services/moviesApi';
import { MoviesList } from './MoviesList/MoviesList';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [isMoviesShown, setIsMoviesShown] = useState(false);
  const [page, setPage] = useState(1);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [posterUrl, setPosterUrl] = useState('');

  useEffect(() => {
    if (isMoviesShown) {
      getMovies(page).then(resp => {
        const moviesInfo = resp.map(
          ({ id, title, release_date, poster_path, vote_count }) => {
            return {
              id,
              title,
              date: release_date,
              poster: `https://image.tmdb.org/t/p/original/${poster_path}`,
              votes: vote_count,
            };
          }
        );
        setMovies(movies => [...movies, ...moviesInfo]);
      });
    } else {
      setMovies([]);
      setPage(1);
    }
  }, [page, isMoviesShown]);

  const onShowBtnClick = () => {
    setIsMoviesShown(!isMoviesShown);
  };

  const onLoadMoreBtnClick = () => {
    setPage(page => page + 1);
  };

  const onDeleteBtnClick = id => {
    setMovieToDelete(id);
  };

  const onDeleteConfirm = () => {
    setMovies(movies => movies.filter(movie => movieToDelete !== movie.id));
    setMovieToDelete(null);
  };

  const onDeleteCancel = () => {
    setMovieToDelete(null);
  };

  const getPoster = url => {
    setPosterUrl(url);
  };

  return (
    <div>
      <Button
        clickHandler={onShowBtnClick}
        text={isMoviesShown ? 'Hide movies' : 'Show movies'}
      />
      {movies.length !== 0 && (
        <>
          <MoviesList
            moviesInfo={movies}
            deleteMovie={onDeleteBtnClick}
            showPoster={getPoster}
          />
          <Button clickHandler={onLoadMoreBtnClick} text="Load more" />
        </>
      )}

      {(movieToDelete || posterUrl) && (
        <Modal>
          {posterUrl && <img src={posterUrl} alt="poster" />}
          {movieToDelete && (
            <>
              <p>Are you shure?</p>
              <Button text="Yes" clickHandler={onDeleteConfirm} />
              <Button text="No" clickHandler={onDeleteCancel} />
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

// class App extends Component {
//   state = {
//     isMoviesShown: false,
//     page: 1,
//     movies: [],
//     movieToDelete: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { isMoviesShown, page } = this.state;

//     if (
//       (prevState.isMoviesShown !== isMoviesShown && isMoviesShown) ||
//       (prevState.page !== page && isMoviesShown)
//     ) {
// getMovies(page).then(resp => {
//   const moviesInfo = resp.map(
//     ({ id, title, release_date, poster_path, vote_count }) => {
//       return {
//         id,
//         title,
//         date: release_date,
//         poster: `https://image.tmdb.org/t/p/original/${poster_path}`,
//         votes: vote_count,
//       };
//     }
//   );

//     this.setState(({ movies }) => ({ movies: [...movies, ...moviesInfo] }));
//   });
// }

//     if (prevState.isMoviesShown !== isMoviesShown && !isMoviesShown) {
//       this.setState({ page: 1, movies: [] });
//     }
//   }

//   onShowBtnClick = () => {
//     this.setState(s => ({ isMoviesShown: !s.isMoviesShown }));
//   };

//   onLoadMoreBtnClick = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   onDeleteBtnClick = id => {
//     this.setState({ movieToDelete: id });
//   };

//   onDeleteConfirm = () => {
//     const id = this.state.movieToDelete;

//     this.setState(prevState => ({
//       movies: prevState.movies.filter(movie => id !== movie.id),
//       movieToDelete: null,
//     }));
//   };

//   onDeleteCancel = () => {
//     this.setState({ movieToDelete: null });
//   };

//   render() {
//     const { isMoviesShown, movies, movieToDelete } = this.state;

// return (
//   <div>
//     <Button
//       clickHandler={this.onShowBtnClick}
//       text={isMoviesShown ? 'Hide movies' : 'Show movies'}
//     />
//     {movies.length !== 0 && (
//       <>
//         <MoviesList
//           moviesInfo={movies}
//           deleteMovie={this.onDeleteBtnClick}
//         />
//         <Button clickHandler={this.onLoadMoreBtnClick} text="Load more" />
//       </>
//     )}

//     {movieToDelete && (
//       <Modal>
//         <p>Are you shure?</p>
//         <Button text="Yes" clickHandler={this.onDeleteConfirm} />
//         <Button text="No" clickHandler={this.onDeleteCancel} />
//       </Modal>
//     )}
//   </div>
// );
//   }
// }

// export { App };
