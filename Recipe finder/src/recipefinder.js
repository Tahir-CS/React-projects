import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
 const [recipes,setRecipes]= useState([]);
 const [loading, setLoading] = useState(false);

const searchRecipes =()=>{
  setLoading(true);
  try{
    const response=await fetch('https://api.spoonacular.com/recipes/complexSearch?query=${query}&apikey=Your_API_Key');
    const data = await response.json();
    setRecipes(data.result)

  }catch(err){
    console.log(err);

  }finally{
    setLoading(false);
  }
};

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
  // Search form here
  return <div>Home: <input value={query} onChange={(e) => setQuery(e.target.value)} /></div>;
  <button onClick={searchRecipes}>Search</button>
  {loading&&<p>Loading.......</p>
  {recipes.map(r=> <div key={r.id}><Link to={'./recipe/${r.id}'}>{r.title} </Link> </div>)}
}

function RecipeList() {
  return <div>Recipe List</div>;
}

function RecipeDetails() {
  return <div>Recipe Details</div>;
}

export default RecipeFinder;