import BasicLayout from '../components/BasicLayout';

import useSWR from 'swr';
import useUser from '../lib/useUser';

import fetch from 'isomorphic-unfetch';

import Router from 'next/router';

const fetcher = url => fetch(url).then(r => r.json());

export default function Login({ props }) {
  const { user } = useUser({ redirectTo: '/dashboard' }); /* Redirection si l'utilisateur est connecté */

  const loginUser = async event => {
    event.preventDefault();

    try {
      const res = await fetch(location.protocol + '//' + location.host + '/api/me/login', {
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      });

      const result = await res.json();
      console.dir(result);

      if (result.success) Router.push('/dashboard');
    }
    catch(error) {
      console.error(error);
    }
  }

  return (
    <BasicLayout title="Connexion">
      <h1 className={'title'}>Connectez-vous</h1>
      <h2 className={'title'}>...pour accéder au tableau de bord</h2>
      <form onSubmit={loginUser}>
        <input id="email" type="email" placeholder="Adresse mail" />
        <input id="password" type="password" placeholder="Mot de passe" />
        <button type="submit">Se connecter</button>
      </form>
    </BasicLayout>
  );
};
