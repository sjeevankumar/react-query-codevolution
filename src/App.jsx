import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import { HomePage } from "./components/Home.page.jsx"
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page.jsx"
import { RQ2SuperHeroesPage } from "./components/RQ2SuperHeroes.page..jsx"
import { SuperHeroesPage } from "./components/SuperHeroes.page.jsx"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { RQSuperHeroPage } from "./components/RQSuperHero.jsx"
import { ParallelQueries } from "./components/ParallelQueries.jsx"
import { DynamicParallel } from "./components/DynamicParallel.jsx"
import { DependentQueries } from "./components/DependentQueries.jsx"
import { PaginatedQueries } from "./components/PaginatedQueries.jsx"
import { InfiniteQueries } from "./components/InfiniteQueries.jsx"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              {/* <li>
                <Link to="/rq-super-heroes2">RQ Super Heroes2</Link>
              </li> */}
            </ul>
          </nav>
          <Routes>
            <Route path="rq-infinite" element={<InfiniteQueries />} />
            <Route path="rq-paginated" element={<PaginatedQueries />} />
            <Route
              path="/rq-dependant"
              element={<DependentQueries email="vishwas@example.com" />}
            />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallel heroIds={[1, 2, 3]} />}
            />
            <Route path="/rq-parallel" element={<ParallelQueries />} />
            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQSuperHeroPage />}
            />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            {/* <Route path="/rq-super-heroes2" element={<RQ2SuperHeroesPage />} /> */}
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
