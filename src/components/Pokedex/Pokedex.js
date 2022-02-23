import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const PER_PAGE = 10;

const imgPrefix = 'https://img.pokemondb.net/sprites/home/normal/';

function Pokedex() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * PER_PAGE;
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${PER_PAGE}&offset=${offset}`
    )
      .then((resp) => resp.json())
      .then((result) => {
        setData(result.results);
        setLoading(false);
      });
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    setLoading(true);
    if (input) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
        .then((resp) => resp.json())
        .then((result) => {
          setData([result]);
        })
        .catch(() => {
          setErr(`${input} is not a pokemon`);
        });
      setLoading(false);
    } else {
      const offset = (page - 1) * PER_PAGE;
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${PER_PAGE}&offset=${offset}`
      )
        .then((resp) => resp.json())
        .then((result) => {
          setData(result.results);
          setLoading(false);
          setErr(null);
        });
    }
    setInput('');
  };
  return (
    <div className='p-4'>
      {/* <Router>
        <Switch>
          <Route exact path='/'> */}
      <div className='relative w-full'>
        <input
          type='text'
          name=''
          id=''
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyDown={(e) => (e.keyCode === 13 ? handleSearch() : null)}
          className='w-full p-4 rounded-lg bg-slate-300'
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className='absolute px-8 py-2 text-xl text-white bg-orange-700 disabled:bg-slate-300 disabled:cursor-not-allowed  rounded-lg top-1.5 right-1.5'
        >
          Search/Clear (Enter)
        </button>
      </div>
      <div className='py-4'>
        <div className='grid grid-cols-2 gap-4'>
          {data && !err
            ? data.map((v, i) => (
                <div
                  key={i}
                  className='p-4 rounded-lg hover:cursor-pointer hover:bg-slate-500 hover:text-white bg-slate-100'
                >
                  <h1 className='text-xl text-center capitalize'>{v.name}</h1>
                  <img
                    src={`${imgPrefix}${v.name}.png`}
                    alt='Pokemon'
                    className='h-20'
                  />
                </div>
              ))
            : // <p>Nothing here</p>
              null}
        </div>
        {err && (
          <p className='text-3xl font-bold text-center text-orange-700'>
            {err}
          </p>
        )}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <button
          disabled={loading || page === 1}
          onClick={() => setPage(page - 1)}
          className='p-4 text-3xl text-white bg-orange-700 rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed '
        >
          Prev
        </button>
        <button
          disabled={loading}
          onClick={() => setPage(page + 1)}
          className='p-4 text-3xl text-white bg-orange-700 rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed '
        >
          Next
        </button>
      </div>
      <p className='pt-4 text-lg font-semibold text-center text-orange-700'>
        Page {page}
      </p>
      {/* </Route>
          <Route path='/pokemon/:name'>
            <h1>about</h1>
          </Route>
          <Route path='/about'>
            <h1>about</h1>
          </Route>
        </Switch>
      </Router> */}
    </div>
  );
}

export default Pokedex;
