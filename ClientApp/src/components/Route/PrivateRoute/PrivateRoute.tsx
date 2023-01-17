import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import Auth, {AuthType} from "../../Auth/Auth";

// export interface Props extends RouteProps{
//   children: React.ReactNode;
// }

const PrivateRoute = () => {
  const [jwt, setJwt] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(0);

  useEffect(() => {

    if (!jwt){
      (
        async () => {
          const response = await fetch('api/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          })
          if (response.ok) {
            const content = await response.json();
            console.log('### Responce is OK', content);
            setJwt(content);
            // setUserName(content.name);
            // setUserId(content.id);
          }
          else {
            // navigate('/login');
            console.log('### Responce is WRONG');
          }

        }
      )();
    }

  });

  // const useAuth = async () => {
  //   const response = await fetch('api/user', {
  //     headers: {'Content-Type': 'application/json'},
  //     credentials: 'include',
  //   })
  //   if (response.ok) {
  //     const content = await response.json();
  //     console.log('### Responce is OK', content);
  //     setJwt(content);
  //     setUserName(content.name);
  //     setUserId(content.id);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  //
  // const isAuth = await useAuth();
  return jwt ? <Outlet/> : <Auth type={AuthType.login}/>;
};

export default PrivateRoute;
