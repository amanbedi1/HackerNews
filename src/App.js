import Navbar from "./components/Navbar/Navbar";
import Feed from "./components/Feed/Feed";
import { SearchProvider } from "./searchContext";

const App = ()=>{
    return(
        <SearchProvider>
            <Navbar/>        
            <Feed/>
        </SearchProvider>
    )
}

export default App;