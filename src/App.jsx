
import Body from './component/Body'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './component/Login'
import Store from './utils/Store'
import Feed from './component/Feed'
import { Provider } from 'react-redux'
import Profile from './component/Profile'
import Connection from './component/Connection'
import RequestView from './component/RequestView'

const App = () => {
  return (
    <>
    <Provider store={Store}>
    <BrowserRouter basename='/'>
     <Routes>
      <Route path='/' element={<Body/>}>
      <Route path='/' element={<Feed/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='requestView' element={<RequestView/>}/>
      <Route path='connection' element={<Connection/>}/>
      </Route>
     </Routes>
    </BrowserRouter>
    </Provider>
    </>  )
}

export default App