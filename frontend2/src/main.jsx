import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Login,Home,AuthLayout,Account} from './index.js'



const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:(
          <AuthLayout >
            <Home/>
          </AuthLayout>
        )
      },
      {
        path:"/login",
        element: (
          // authentication ={false} tokhon e pathabo jokhon amar check kora dorkar je user logged in naki na
          <AuthLayout >
            <Login/>

          </AuthLayout>
        )
      },
      {
        path:"/account",
        element: (
          
          <AuthLayout >
            <Account/>

          </AuthLayout>
        )
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
