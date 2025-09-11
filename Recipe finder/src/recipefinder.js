import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function RecipeFinder() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=YOUR_API_KEY`);
      const data = await response.json();
      setRecipes(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search recipes" />
      <button onClick={searchRecipes}>Search</button>
      {loading && <p>Loading...</p>}
      {recipes.map(r => <div key={r.id}><Link to={`/recipe/${r.id}`}>{r.title}</Link></div>)}
    </div>
  );
}

function RecipeList() {
  return <div>Recipe List (extend with filters)</div>;
}

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=YOUR_API_KEY`);
      const data = await response.json();
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;
  return <div><h1>{recipe.title}</h1><p>{recipe.instructions}</p></div>;
}

export default RecipeFinder;