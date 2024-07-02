import './App.css';

import Containers from './components/Containers';
import Container from './components/Container';
import Images from './components/Images';
import Image from './components/Image';
import Volumes from './components/Volumes';
import Volume from './components/Volume';
import Root from './components/Root';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/containers",
        element: <Containers />,
      },
      {
        path: "/containers/:containerName",
        element: <Container />
      }, 
      {
        path: "/images",
        element: <Images />,
      }, 
      {
        path: "/images/:imageId",
        element: <Image />,
      },
      {
        path: "/volumes",
        element: <Volumes />
      }, 
      {
        path: "/volumes/:volumeName",
        element: <Volume />
      }
    ],
  },
]);

const App = () => {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
