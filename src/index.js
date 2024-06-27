import domReady from '@wordpress/dom-ready';
import { createElement, createRoot } from '@wordpress/element';
import { GraphQLClient } from 'graphql-request';
import Infos from './components/Infos';



async function fetchToken() {
  const response = await fetch('/wp-json/ac-formations/v1/token');
  const data = await response.json();
  return data.token;
}

async function fetchData(programId) {
  console.log('programId', programId)
  const token = await fetchToken();
  const client = new GraphQLClient('https://app.digiforma.com/api/v1/graphiql', {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });

  const query = `
      query {
          program(id: ${programId}) {
              version
              createdAt
              updatedAt
          }
      }
  `;

  const data = await client.request(query);
  return data.program;
}

domReady(async () => {
  const container = document.querySelector('#formation-infos');
  if (container) {
      const programId = container.getAttribute('data-id');
      const program = await fetchData(programId);
      const root = createRoot(container);
      console.log(programId, program, root)
      root.render(createElement(Infos, { program }));
  };
});