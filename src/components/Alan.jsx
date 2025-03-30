import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';

import { searchMovie, selectGenreOrCategory } from '../features/currentGenreOrCategory';
import { fetchToken } from '../utils';
import { ColorModeContext } from '../utils/ToggleColorMode';

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    const alanKey = process.env.REACT_APP_ALAN_AI_KEY;
    if (!alanKey) {
      console.error('Alan AI SDK Key is not provided or is invalid.');
      return;
    }

    alanBtn({
      key: alanKey,
      onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
        switch (command) {
          case 'changeMode':
            setMode(mode === 'light' ? 'light' : 'dark');
            break;

          case 'login':
            fetchToken();
            break;

          case 'logout':
            localStorage.clear();
            window.location.href = '/';
            break;

          case 'search':
            dispatch(searchMovie(query));
            break;

          case 'goback':
            history(-1);
            break;

          case 'chooseGenreOrCategory': {
            const foundGenre = genres.find(
              (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase(),
            );

            if (foundGenre) {
              history('/');
              dispatch(selectGenreOrCategory(foundGenre.id));
            } else if (genreOrCategory) {
              // Popular, Top Rated, Upcoming
              const category = genreOrCategory.startsWith('top')
                ? 'top_rated'
                : genreOrCategory;
              history('/');
              dispatch(selectGenreOrCategory(category));
            }
            break;
          }

          default:
            console.warn(`Unhandled command: ${command}`);
        }
      },
    });
  }, []);
};

export default useAlan;
